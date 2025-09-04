import { useState, useEffect } from 'react';
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

export const useWeatherData = (location?: string, lat?: number, lon?: number) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: functionError } = await supabase.functions.invoke('weather-forecast', {
        body: {
          location: location || 'Default Location',
          lat: lat || 40.7128,
          lon: lon || -74.0060
        }
      });

      if (functionError) {
        throw new Error(functionError.message);
      }

      setWeatherData(data);
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