import { useState, useEffect, useCallback } from 'react';

export interface NASAEvent {
  id: string;
  title: string;
  description: string;
  categories: { id: string; title: string }[];
  sources: { id: string; url: string }[];
  geometry: { date: string; type: string; coordinates: [number, number] }[];
  closed: string | null;
}

export const useNASAEvents = () => {
  const [events, setEvents] = useState<NASAEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=50'
      );
      if (!response.ok) throw new Error('Failed to fetch NASA events');

      const data = await response.json();

      const parsed: NASAEvent[] = data.events.map((event: any) => ({
        id: event.id,
        title: event.title,
        description: event.description || '',
        categories: event.categories,
        sources: event.sources,
        geometry: event.geometry,
        closed: event.closed,
      }));

      setEvents(parsed);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Fallback data
      setEvents([
        {
          id: 'EONET_1',
          title: 'Wildfire in Northern California',
          description: '',
          categories: [{ id: 'wildfires', title: 'Wildfires' }],
          sources: [{ id: 'InciWeb', url: '#' }],
          geometry: [{ date: new Date().toISOString(), type: 'Point', coordinates: [-121.5, 39.7] }],
          closed: null,
        },
        {
          id: 'EONET_2',
          title: 'Tropical Storm in Western Pacific',
          description: '',
          categories: [{ id: 'severeStorms', title: 'Severe Storms' }],
          sources: [{ id: 'JTWC', url: '#' }],
          geometry: [{ date: new Date().toISOString(), type: 'Point', coordinates: [135.2, 18.4] }],
          closed: null,
        },
        {
          id: 'EONET_3',
          title: 'Volcanic Activity - Mount Etna',
          description: '',
          categories: [{ id: 'volcanoes', title: 'Volcanoes' }],
          sources: [{ id: 'SI/USGS', url: '#' }],
          geometry: [{ date: new Date().toISOString(), type: 'Point', coordinates: [15.0, 37.75] }],
          closed: null,
        },
        {
          id: 'EONET_4',
          title: 'Iceberg Drift in South Atlantic',
          description: '',
          categories: [{ id: 'seaLakeIce', title: 'Sea and Lake Ice' }],
          sources: [{ id: 'NATICE', url: '#' }],
          geometry: [{ date: new Date().toISOString(), type: 'Point', coordinates: [-40.0, -60.5] }],
          closed: null,
        },
        {
          id: 'EONET_5',
          title: 'Flooding in Bangladesh',
          description: '',
          categories: [{ id: 'floods', title: 'Floods' }],
          sources: [{ id: 'GDACS', url: '#' }],
          geometry: [{ date: new Date().toISOString(), type: 'Point', coordinates: [90.4, 23.8] }],
          closed: null,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
};
