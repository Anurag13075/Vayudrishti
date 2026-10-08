import { NextResponse } from 'next/server';
import { simulateAqi, getAqiLevel, getAqiColor, generateForecast } from '@/lib/utils';
import { INDIAN_CITIES } from '@/lib/constants';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ error: 'City parameter is required' }, { status: 400 });
  }

  const WAQI_TOKEN = process.env.WAQI_TOKEN || 'demo';

  try {
    // Attempt to fetch from WAQI API
    const response = await fetch(`https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=${WAQI_TOKEN}`);
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.status === 'ok') {
        const aqi = data.data.aqi;
        const level = getAqiLevel(aqi);
        const color = getAqiColor(aqi);
        
        return NextResponse.json({
          city,
          aqi,
          level: level.label,
          color,
          timestamp: data.data.time.iso || new Date().toISOString(),
          forecast: generateForecast(aqi),
          source: 'waqi'
        });
      }
    }
  } catch (error) {
    console.error('WAQI API error:', error);
    // Fall back to simulation below
  }

  // Fallback to simulation
  const cityData = INDIAN_CITIES.find(c => c.name.toLowerCase() === city.toLowerCase());
  const aqi = simulateAqi(cityData ? cityData.key : 'delhi');
  const level = getAqiLevel(aqi);
  const color = getAqiColor(aqi);

  return NextResponse.json({
    city,
    aqi,
    level: level.label,
    color,
    timestamp: new Date().toISOString(),
    forecast: generateForecast(aqi),
    source: 'simulated'
  });
}
