import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { lat = 40.7128, lon = -74.0060, location = "New York" } = await req.json().catch(() => ({}));
    
    // Check cache first
    const { data: cachedData } = await supabase
      .from('weather_cache')
      .select('*')
      .eq('location', location)
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();

    if (cachedData) {
      console.log('Returning cached weather data');
      return new Response(JSON.stringify(cachedData.weather_data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const OPENWEATHER_API_KEY = Deno.env.get('OPENWEATHER_API_KEY');
    if (!OPENWEATHER_API_KEY) {
      throw new Error('OpenWeather API key not configured');
    }

    // Fetch current weather
    const currentWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    const currentWeather = await currentWeatherResponse.json();

    // Fetch hourly forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    const forecast = await forecastResponse.json();

    // Process current weather data
    const current = {
      temperature: Math.round(currentWeather.main.temp),
      humidity: currentWeather.main.humidity,
      windSpeed: Math.round(currentWeather.wind.speed),
      visibility: Math.round((currentWeather.visibility || 10000) / 1609.34), // Convert to miles
      condition: currentWeather.weather[0].description,
      feelsLike: Math.round(currentWeather.main.feels_like),
      icon: mapWeatherIcon(currentWeather.weather[0].icon)
    };

    // Process hourly forecast (next 5 readings)
    const hourly = forecast.list.slice(0, 5).map((item: any, index: number) => {
      const time = index === 0 ? 'Now' : new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        hour12: true 
      });
      
      return {
        time,
        temp: Math.round(item.main.temp),
        condition: item.weather[0].description,
        humidity: item.main.humidity,
        windSpeed: Math.round(item.wind.speed),
        icon: mapWeatherIcon(item.weather[0].icon)
      };
    });

    // Generate AI recommendation
    const aiRecommendation = generateBeekeepingRecommendation(current, hourly);

    const weatherData: WeatherData = {
      current,
      hourly,
      aiRecommendation
    };

    // Cache the data
    await supabase
      .from('weather_cache')
      .upsert({
        location,
        weather_data: weatherData,
        forecast_data: forecast,
        cached_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour
      });

    console.log('Weather data fetched and cached successfully');
    return new Response(JSON.stringify(weatherData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in weather-forecast function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch weather data',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function mapWeatherIcon(openWeatherIcon: string): string {
  // Map OpenWeatherMap icons to our simple icon system
  if (openWeatherIcon.includes('01')) return 'sun'; // clear sky
  if (openWeatherIcon.includes('02') || openWeatherIcon.includes('03') || openWeatherIcon.includes('04')) return 'cloud'; // clouds
  if (openWeatherIcon.includes('09') || openWeatherIcon.includes('10') || openWeatherIcon.includes('11')) return 'rain'; // rain/thunderstorm
  if (openWeatherIcon.includes('13')) return 'cloud'; // snow
  if (openWeatherIcon.includes('50')) return 'cloud'; // mist/fog
  return 'sun'; // default
}

function generateBeekeepingRecommendation(current: any, hourly: any[]): any {
  const temp = current.temperature;
  const wind = current.windSpeed;
  const humidity = current.humidity;
  const condition = current.condition.toLowerCase();
  
  let message = "";
  let badges: Array<{text: string, type: string}> = [];
  let priority: 'low' | 'medium' | 'high' = 'medium';

  // Temperature analysis
  if (temp >= 60 && temp <= 80) {
    message = "Perfect conditions for hive inspection today! ";
    badges.push({ text: "Optimal Temperature", type: "success" });
  } else if (temp > 80) {
    message = "Warm weather - perfect for hive activity but inspect early morning or evening. ";
    badges.push({ text: "High Temperature", type: "warning" });
  } else if (temp < 60) {
    message = "Cool weather - bees may be less active. Consider postponing non-essential inspections. ";
    badges.push({ text: "Cool Temperature", type: "info" });
    priority = 'low';
  }

  // Wind analysis
  if (wind <= 10) {
    message += "Light winds make it ideal for checking on your colonies.";
    badges.push({ text: "Low Wind Speed", type: "success" });
  } else if (wind <= 20) {
    message += "Moderate winds - still suitable for inspection with care.";
    badges.push({ text: "Moderate Wind", type: "warning" });
  } else {
    message += "High winds - avoid hive inspections for safety.";
    badges.push({ text: "High Wind Speed", type: "danger" });
    priority = 'high';
  }

  // Weather condition analysis
  if (condition.includes('rain') || condition.includes('storm')) {
    message = "Rainy conditions - avoid hive inspections. Bees will be defensive and clustered inside.";
    badges = [{ text: "Rain Expected", type: "danger" }];
    priority = 'high';
  } else if (condition.includes('sun') || condition.includes('clear')) {
    badges.push({ text: "Clear Skies", type: "success" });
  }

  // Humidity analysis
  if (humidity > 70) {
    badges.push({ text: "High Humidity", type: "info" });
  } else if (humidity < 40) {
    badges.push({ text: "Low Humidity", type: "info" });
  }

  // Check for upcoming weather changes
  const hasRainLater = hourly.some(h => h.condition.toLowerCase().includes('rain'));
  if (hasRainLater && !condition.includes('rain')) {
    message += " Complete inspections early - rain expected later.";
    badges.push({ text: "Rain Later", type: "warning" });
    priority = 'medium';
  }

  return {
    message: message.trim(),
    badges: badges.slice(0, 3), // Limit to 3 badges for UI
    priority
  };
}