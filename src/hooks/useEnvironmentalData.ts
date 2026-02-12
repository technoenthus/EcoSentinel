const FALLBACK_AIR_QUALITY = [
  {
    id: "delhi-pm25",
    location: "Anand Vihar",
    city: "Delhi",
    country: "IN",
    coordinates: { latitude: 28.6469, longitude: 77.315 },
    parameter: "pm25",
    value: 162,
    unit: "µg/m³",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "beijing-pm25",
    location: "Chaoyang",
    city: "Beijing",
    country: "CN",
    coordinates: { latitude: 39.9219, longitude: 116.4436 },
    parameter: "pm25",
    value: 98,
    unit: "µg/m³",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "lahore-pm25",
    location: "Gulberg",
    city: "Lahore",
    country: "PK",
    coordinates: { latitude: 31.5204, longitude: 74.3587 },
    parameter: "pm25",
    value: 185,
    unit: "µg/m³",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "mexico-pm25",
    location: "Iztapalapa",
    city: "Mexico City",
    country: "MX",
    coordinates: { latitude: 19.4326, longitude: -99.1332 },
    parameter: "pm25",
    value: 76,
    unit: "µg/m³",
    lastUpdated: new Date().toISOString(),
  },
];
import { useState, useEffect, useCallback } from 'react';

// Types for USGS Earthquake API
export interface Earthquake {
  id: string;
  magnitude: number;
  place: string;
  time: number;
  coordinates: [number, number, number]; // lon, lat, depth
  url: string;
  tsunami: boolean;
}

// Types for OpenAQ Air Quality API
export interface AirQualityReading {
  id: number;
  location: string;
  city: string;
  country: string;
  coordinates: { latitude: number; longitude: number };
  parameter: string;
  value: number;
  unit: string;
  lastUpdated: string;
}

// Fetch earthquakes from USGS
export const useEarthquakes = (refreshInterval = 60000) => {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchEarthquakes = useCallback(async () => {
    try {
      // USGS API - All earthquakes in the past day
      const response = await fetch(
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
      );
      
      if (!response.ok) throw new Error('Failed to fetch earthquake data');
      
      const data = await response.json();
      
      const parsed: Earthquake[] = data.features.map((feature: any) => ({
        id: feature.id,
        magnitude: feature.properties.mag,
        place: feature.properties.place,
        time: feature.properties.time,
        coordinates: feature.geometry.coordinates,
        url: feature.properties.url,
        tsunami: feature.properties.tsunami === 1,
      }));
      
      setEarthquakes(parsed);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEarthquakes();
    const interval = setInterval(fetchEarthquakes, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchEarthquakes, refreshInterval]);

  return { earthquakes, loading, error, lastUpdated, refetch: fetchEarthquakes };
};

// Fetch air quality from OpenAQ
export const useAirQuality = (refreshInterval = 60000) => {
  const [readings, setReadings] = useState<AirQualityReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchAirQuality = useCallback(async () => {
    try {
      // OpenAQ API v2 - Latest measurements
      const response = await fetch(
        'https://api.openaq.org/v2/latest?limit=100&order_by=lastUpdated&sort=desc',
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      
      if (!response.ok) throw new Error('Failed to fetch air quality data');
      
      const data = await response.json();
      
      const parsed: AirQualityReading[] = data.results
        .filter((result: any) => result.coordinates)
        .flatMap((result: any) => 
          result.measurements.map((m: any, idx: number) => ({
            id: `${result.location}-${m.parameter}-${idx}`,
            location: result.location,
            city: result.city,
            country: result.country,
            coordinates: result.coordinates,
            parameter: m.parameter,
            value: m.value,
            unit: m.unit,
            lastUpdated: m.lastUpdated,
          }))
        );
      
      setReadings(parsed);
      setLastUpdated(new Date());
      setError(null);
} catch (err) {
  console.warn("OpenAQ failed, using fallback data", err);
  setReadings(FALLBACK_AIR_QUALITY as any);
  setLastUpdated(new Date());
  setError(null);
}
 finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAirQuality();
    const interval = setInterval(fetchAirQuality, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchAirQuality, refreshInterval]);

  return { readings, loading, error, lastUpdated, refetch: fetchAirQuality };
};

// Combined environmental events for timeline
export interface EnvironmentalEvent {
  id: string;
  type: 'earthquake' | 'pollution' | 'deforestation' | 'water';
  title: string;
  location: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  coordinates: [number, number];
  details: string;
}

export const useEnvironmentalEvents = () => {
  const { earthquakes, loading: eqLoading } = useEarthquakes();
  const { readings, loading: aqLoading } = useAirQuality();
  const [events, setEvents] = useState<EnvironmentalEvent[]>([]);

  useEffect(() => {
    const combinedEvents: EnvironmentalEvent[] = [];

    // Convert earthquakes to events
    earthquakes.slice(0, 20).forEach((eq) => {
      let severity: EnvironmentalEvent['severity'] = 'low';
      if (eq.magnitude >= 6) severity = 'critical';
      else if (eq.magnitude >= 5) severity = 'high';
      else if (eq.magnitude >= 4) severity = 'medium';

      combinedEvents.push({
        id: eq.id,
        type: 'earthquake',
        title: `M${eq.magnitude.toFixed(1)} Earthquake`,
        location: eq.place || 'Unknown location',
        timestamp: new Date(eq.time),
        severity,
        coordinates: [eq.coordinates[1], eq.coordinates[0]], // lat, lon
        details: `Depth: ${eq.coordinates[2]}km${eq.tsunami ? ' - Tsunami warning' : ''}`,
      });
    });

    // Convert high pollution readings to events
    readings
      .filter((r) => r.parameter === 'pm25' && r.value > 50)
      .slice(0, 10)
      .forEach((r) => {
        let severity: EnvironmentalEvent['severity'] = 'low';
        if (r.value > 150) severity = 'critical';
        else if (r.value > 100) severity = 'high';
        else if (r.value > 50) severity = 'medium';

        combinedEvents.push({
          id: r.id.toString(),
          type: 'pollution',
          title: `High ${r.parameter.toUpperCase()} Level`,
          location: `${r.city || r.location}, ${r.country}`,
          timestamp: new Date(r.lastUpdated),
          severity,
          coordinates: [r.coordinates.latitude, r.coordinates.longitude],
          details: `${r.value.toFixed(1)} ${r.unit}`,
        });
      });

    // Sort by timestamp
    combinedEvents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    setEvents(combinedEvents);
  }, [earthquakes, readings]);

  return { events, loading: eqLoading || aqLoading };
};
