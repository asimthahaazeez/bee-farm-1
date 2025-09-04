import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface WeatherData {
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    visibility: number;
    condition: string;
    feelsLike: number;
    icon: string;
  };
  hourly: Array<{
    time: string;
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    icon: string;
  }>;
  aiRecommendation: {
    message: string;
    badges: Array<{
      text: string;
      type: string;
    }>;
    priority: 'low' | 'medium' | 'high';
  };
}

// Cache key generator for localStorage
const getCacheKey = (location?: string, lat?: number, lon?: number) => {
  return `weather_cache_${location || 'default'}_${lat || 40.7128}_${lon || -74.0060}`;
};

// Check localStorage cache
const getLocalStorageCache = (cacheKey: string): WeatherData | null => {
  try {
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();
    const tenMinutes = 10 * 60 * 1000; // 10 minutes

    if (now - timestamp > tenMinutes) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    return data;
  } catch {
    return null;
  }
};

// Set localStorage cache
const setLocalStorageCache = (cacheKey: string, data: WeatherData) => {
  try {
    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch {
    // Ignore localStorage errors (quota exceeded, etc.)
  }
};

export const useWeatherData = (location?: string, lat?: number, lon?: number) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Request deduplication - track ongoing requests
  const ongoingRequestRef = useRef<Promise<any> | null>(null);
  const lastRequestKeyRef = useRef<string>('');

  const fetchWeatherData = async () => {
    const requestKey = getCacheKey(location, lat, lon);
    
    // Request deduplication: if same request is already ongoing, wait for it
    if (ongoingRequestRef.current && lastRequestKeyRef.current === requestKey) {
      return ongoingRequestRef.current;
    }

    // Check localStorage cache first
    const cachedData = getLocalStorageCache(requestKey);
    if (cachedData) {
      setWeatherData(cachedData);
      setLoading(false);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      lastRequestKeyRef.current = requestKey;

      // Create the API request promise
      const requestPromise = supabase.functions.invoke('weather-forecast', {
        body: {
          location: location || 'Default Location',
          lat: lat || 40.7128,
          lon: lon || -74.0060
        }
      });

      // Store the ongoing request
      ongoingRequestRef.current = requestPromise;

      const { data, error: functionError } = await requestPromise;

      if (functionError) {
        throw new Error(functionError.message);
      }

      setWeatherData(data);
      
      // Cache in localStorage
      setLocalStorageCache(requestKey, data);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      toast({
        title: "Weather Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      ongoingRequestRef.current = null;
      lastRequestKeyRef.current = '';
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [location, lat, lon]);

  return {
    weatherData,
    loading,
    error,
    refetch: fetchWeatherData
  };
};