import { useState, useEffect } from 'react';
import { Activity, TreeDeciduous, Factory, Droplets, AlertTriangle, RefreshCw, Clock, MapPin, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EarthMap from '@/components/maps/EarthMap';
import { MapLayer } from '@/components/maps/EarthMap';
import { useEarthquakes, useAirQuality, useEnvironmentalEvents } from '@/hooks/useEnvironmentalData';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const DashboardPage = () => {
  const [activeLayers, setActiveLayers] = useState<MapLayer[]>(['earthquakes', 'pollution']);
  const { earthquakes, loading: eqLoading, lastUpdated: eqUpdated, refetch: refetchEq } = useEarthquakes();
  const { readings, loading: aqLoading, lastUpdated: aqUpdated, refetch: refetchAq } = useAirQuality();
  const { events, loading: eventsLoading } = useEnvironmentalEvents();

  const toggleLayer = (layer: MapLayer) => {
    setActiveLayers((prev) =>
      prev.includes(layer) ? prev.filter((l) => l !== layer) : [...prev, layer]
    );
  };

  const layers = [
    { id: 'earthquakes' as const, icon: Zap, label: 'Earthquakes', color: 'text-warning', bgColor: 'bg-warning' },
    { id: 'pollution' as const, icon: Factory, label: 'Air Quality', color: 'text-destructive', bgColor: 'bg-destructive' },
    { id: 'deforestation' as const, icon: TreeDeciduous, label: 'Deforestation', color: 'text-success', bgColor: 'bg-success' },
    { id: 'water' as const, icon: Droplets, label: 'Water Levels', color: 'text-primary', bgColor: 'bg-primary' },
  ];

  // Calculate stats
  const significantEq = earthquakes.filter((eq) => eq.magnitude >= 4).length;
  const highPollution = readings.filter((r) => r.parameter === 'pm25' && r.value > 50).length;

  // Generate chart data from real earthquakes
  const chartData = earthquakes
    .slice(0, 24)
    .reverse()
    .map((eq, idx) => ({
      time: new Date(eq.time).toLocaleTimeString('en-US', { hour: '2-digit' }),
      magnitude: eq.magnitude,
    }));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-4">
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Live Environmental Dashboard</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Real-Time Monitoring
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              refetchEq();
              refetchAq();
            }}
            disabled={eqLoading || aqLoading}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${eqLoading || aqLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
          {eqUpdated && (
            <span className="text-xs text-muted-foreground">
              Updated: {eqUpdated.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-warning" />
            <span className="text-sm text-muted-foreground">Earthquakes (24h)</span>
          </div>
          <div className="text-3xl font-display font-bold text-foreground">{earthquakes.length}</div>
          <div className="text-xs text-muted-foreground mt-1">{significantEq} magnitude 4.0+</div>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <Factory className="w-5 h-5 text-destructive" />
            <span className="text-sm text-muted-foreground">Pollution Alerts</span>
          </div>
          <div className="text-3xl font-display font-bold text-foreground">{highPollution}</div>
          <div className="text-xs text-muted-foreground mt-1">High PM2.5 readings</div>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <TreeDeciduous className="w-5 h-5 text-success" />
            <span className="text-sm text-muted-foreground">Forest Hotspots</span>
          </div>
          <div className="text-3xl font-display font-bold text-foreground">4</div>
          <div className="text-xs text-muted-foreground mt-1">Active monitoring zones</div>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Data Sources</span>
          </div>
          <div className="text-3xl font-display font-bold text-foreground">2</div>
          <div className="text-xs text-muted-foreground mt-1">USGS, OpenAQ</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          {/* Layer Toggles */}
          <div className="flex flex-wrap gap-3 mb-6">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeLayers.includes(layer.id)
                    ? `${layer.bgColor}/20 ${layer.color} border border-current`
                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                }`}
              >
                <layer.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{layer.label}</span>
              </button>
            ))}
          </div>

          {/* Live Map */}
          <div className="relative aspect-video rounded-xl overflow-hidden border border-border/50">
            <EarthMap
              earthquakes={earthquakes}
              airQuality={readings}
              activeLayers={activeLayers}
            />
            
            {/* Live indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 glass-card rounded-full">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground">Live Data</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Data sources: USGS Earthquake Hazards Program, OpenAQ Air Quality. Updates every 60 seconds.
          </p>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Chart */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-warning" />
              Recent Earthquake Activity
            </h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="gradient-eq" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                  <YAxis hide domain={[0, 'auto']} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`M${value.toFixed(1)}`, 'Magnitude']}
                  />
                  <Area
                    type="monotone"
                    dataKey="magnitude"
                    stroke="hsl(var(--warning))"
                    fill="url(#gradient-eq)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Events */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Live Events
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-hide">
              {eventsLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading events...</div>
              ) : events.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No recent events</div>
              ) : (
                events.slice(0, 10).map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      event.severity === 'critical' ? 'bg-destructive' :
                      event.severity === 'high' ? 'bg-warning' :
                      event.severity === 'medium' ? 'bg-primary' : 'bg-success'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground text-sm">{event.title}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {event.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-8 glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Recent Activity Timeline
        </h3>
        <div className="space-y-4">
          {events.slice(0, 5).map((event, index) => (
            <div
              key={event.id}
              className="relative flex gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all"
            >
              {index < 4 && (
                <div className="absolute left-7 top-14 w-px h-6 bg-border/50" />
              )}
              
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
                event.type === 'earthquake' ? 'bg-warning/20' :
                event.type === 'pollution' ? 'bg-destructive/20' :
                event.type === 'deforestation' ? 'bg-success/20' : 'bg-primary/20'
              }`}>
                {event.type === 'earthquake' && <Zap className="w-4 h-4 text-warning" />}
                {event.type === 'pollution' && <Factory className="w-4 h-4 text-destructive" />}
                {event.type === 'deforestation' && <TreeDeciduous className="w-4 h-4 text-success" />}
                {event.type === 'water' && <Droplets className="w-4 h-4 text-primary" />}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="font-medium text-foreground">{event.title}</span>
                  <span className="text-sm text-primary">• {event.location}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                  <span className="text-xs text-muted-foreground">{event.timestamp.toLocaleString()}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{event.details}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
