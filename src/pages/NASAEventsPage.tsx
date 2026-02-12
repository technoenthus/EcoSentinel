import { useState, useEffect, useRef } from 'react';
import { Flame, CloudLightning, Mountain, Waves, Snowflake, RefreshCw, ExternalLink, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNASAEvents, NASAEvent } from '@/hooks/useNASAEvents';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const categoryConfig: Record<string, { icon: any; color: string; mapColor: string }> = {
  wildfires: { icon: Flame, color: 'text-orange-500', mapColor: '#f97316' },
  severeStorms: { icon: CloudLightning, color: 'text-yellow-400', mapColor: '#facc15' },
  volcanoes: { icon: Mountain, color: 'text-red-500', mapColor: '#ef4444' },
  floods: { icon: Waves, color: 'text-blue-400', mapColor: '#60a5fa' },
  seaLakeIce: { icon: Snowflake, color: 'text-cyan-300', mapColor: '#67e8f9' },
};

const categoryFilters = [
  { id: 'all', label: 'All Events' },
  { id: 'wildfires', label: 'Wildfires' },
  { id: 'severeStorms', label: 'Storms' },
  { id: 'volcanoes', label: 'Volcanoes' },
  { id: 'floods', label: 'Floods' },
  { id: 'seaLakeIce', label: 'Ice' },
];

const NASAEventsPage = () => {
  const { events, loading, error, refetch } = useNASAEvents();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<NASAEvent | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter((e) => e.categories.some((c) => c.id === activeFilter));

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 18,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!markersRef.current) return;
    markersRef.current.clearLayers();

    filteredEvents.forEach((event) => {
      const geo = event.geometry[event.geometry.length - 1];
      if (!geo) return;

      const [lon, lat] = geo.coordinates;
      const catId = event.categories[0]?.id || 'wildfires';
      const config = categoryConfig[catId] || categoryConfig.wildfires;

      const circle = L.circleMarker([lat, lon], {
        radius: 8,
        fillColor: config.mapColor,
        fillOpacity: 0.8,
        color: config.mapColor,
        weight: 2,
        opacity: 1,
      });

      circle.bindPopup(`
        <div style="min-width: 200px">
          <h3 style="font-weight: bold; margin-bottom: 4px">${event.title}</h3>
          <p style="font-size: 12px; color: #999">${event.categories.map((c) => c.title).join(', ')}</p>
          <p style="font-size: 12px; color: #999">${new Date(geo.date).toLocaleDateString()}</p>
        </div>
      `);

      circle.on('click', () => setSelectedEvent(event));
      markersRef.current!.addLayer(circle);
    });
  }, [filteredEvents]);

  const getCategoryIcon = (catId: string) => {
    const config = categoryConfig[catId];
    return config ? config.icon : Flame;
  };

  const getCategoryColor = (catId: string) => {
    const config = categoryConfig[catId];
    return config ? config.color : 'text-muted-foreground';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-4">
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">NASA Earth Observatory</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Natural Event Tracker
          </h1>
          <p className="text-muted-foreground mt-2">
            Live natural events from NASA EONET — wildfires, storms, volcanoes, and more.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refetch}
          disabled={loading}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categoryFilters.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeFilter === cat.id
                ? 'bg-primary/20 text-primary border border-primary/40'
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {Object.entries(categoryConfig).map(([id, config]) => {
          const count = events.filter((e) => e.categories.some((c) => c.id === id)).length;
          const Icon = config.icon;
          return (
            <div key={id} className="glass-card p-4 rounded-xl text-center">
              <Icon className={`w-6 h-6 mx-auto mb-2 ${config.color}`} />
              <div className="text-2xl font-display font-bold text-foreground">{count}</div>
              <div className="text-xs text-muted-foreground capitalize">{id.replace(/([A-Z])/g, ' $1').trim()}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <div className="relative rounded-xl overflow-hidden border border-border/50" style={{ height: '500px' }}>
            <div ref={mapRef} className="w-full h-full" />
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 glass-card rounded-full">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground">
                {filteredEvents.length} Active Events
              </span>
            </div>
          </div>
        </div>

        {/* Event List */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-display font-semibold text-foreground mb-4">
            Active Events
          </h3>
          <div className="space-y-3 max-h-[450px] overflow-y-auto scrollbar-hide">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading NASA events...</div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No events found</div>
            ) : (
              filteredEvents.map((event) => {
                const catId = event.categories[0]?.id || 'wildfires';
                const Icon = getCategoryIcon(catId);
                const color = getCategoryColor(catId);
                const geo = event.geometry[event.geometry.length - 1];

                return (
                  <div
                    key={event.id}
                    onClick={() => {
                      setSelectedEvent(event);
                      if (geo && mapInstanceRef.current) {
                        mapInstanceRef.current.setView(
                          [geo.coordinates[1], geo.coordinates[0]],
                          6,
                          { animate: true }
                        );
                      }
                    }}
                    className={`p-3 rounded-xl cursor-pointer transition-all ${
                      selectedEvent?.id === event.id
                        ? 'bg-primary/10 border border-primary/30'
                        : 'bg-secondary/30 hover:bg-secondary/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`w-5 h-5 mt-0.5 ${color}`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground text-sm truncate">{event.title}</div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {geo ? new Date(geo.date).toLocaleDateString() : 'N/A'}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {geo ? `${geo.coordinates[1].toFixed(2)}, ${geo.coordinates[0].toFixed(2)}` : 'N/A'}
                        </div>
                        {event.sources[0]?.url && event.sources[0].url !== '#' && (
                          <a
                            href={event.sources[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 mt-1 text-xs text-primary hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Source
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground mt-6 text-center">
        Data sourced from NASA Earth Observatory Natural Event Tracker (EONET v3). Events update in near real-time.
      </p>
    </div>
  );
};

export default NASAEventsPage;
