import { useState } from 'react';
import { Wind, RefreshCw, MapPin, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EarthMap from '@/components/maps/EarthMap';
import { useAirQuality } from '@/hooks/useEnvironmentalData';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const PollutionPage = () => {
  const { readings, loading, error, lastUpdated, refetch } = useAirQuality();
  const [selectedParameter, setSelectedParameter] = useState<string>('pm25');

  const parameters = [
    { id: 'pm25', label: 'PM2.5', description: 'Fine particulate matter' },
    { id: 'pm10', label: 'PM10', description: 'Coarse particulate matter' },
    { id: 'o3', label: 'O₃', description: 'Ozone' },
    { id: 'no2', label: 'NO₂', description: 'Nitrogen dioxide' },
    { id: 'so2', label: 'SO₂', description: 'Sulfur dioxide' },
    { id: 'co', label: 'CO', description: 'Carbon monoxide' },
  ];

  // Filter readings by parameter
  const filteredReadings = readings.filter((r) => r.parameter === selectedParameter);

  // Get top polluted locations
  const topPolluted = [...filteredReadings]
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  // Chart data
  const chartData = topPolluted.map((r) => ({
    location: r.city || r.location.slice(0, 15),
    value: r.value,
    unit: r.unit,
  }));

  // Get color based on AQI level
  const getAQIColor = (value: number) => {
    if (value <= 12) return '#22c55e'; // Good
    if (value <= 35) return '#84cc16'; // Moderate
    if (value <= 55) return '#eab308'; // USG
    if (value <= 150) return '#f97316'; // Unhealthy
    if (value <= 250) return '#ef4444'; // Very Unhealthy
    return '#7c3aed'; // Hazardous
  };

  const getAQILabel = (value: number) => {
    if (value <= 12) return 'Good';
    if (value <= 35) return 'Moderate';
    if (value <= 55) return 'Unhealthy for Sensitive Groups';
    if (value <= 150) return 'Unhealthy';
    if (value <= 250) return 'Very Unhealthy';
    return 'Hazardous';
  };

  // Calculate stats
  const avgValue = filteredReadings.length > 0
    ? filteredReadings.reduce((sum, r) => sum + r.value, 0) / filteredReadings.length
    : 0;

  const maxReading = filteredReadings.length > 0
    ? filteredReadings.reduce((max, r) => r.value > max.value ? r : max, filteredReadings[0])
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-4">
            <Wind className="w-4 h-4 text-warning animate-pulse" />
            <span className="text-sm text-muted-foreground">Air Quality Monitoring</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Global Pollution Tracker
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time air quality data from OpenAQ sensors worldwide
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          {lastUpdated && (
            <span className="text-xs text-muted-foreground">
              Updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      {/* Parameter Selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {parameters.map((param) => (
          <button
            key={param.id}
            onClick={() => setSelectedParameter(param.id)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedParameter === param.id
                ? 'bg-primary/20 text-primary border border-primary'
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
            }`}
          >
            <span className="font-medium">{param.label}</span>
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-4 rounded-xl">
          <div className="text-sm text-muted-foreground mb-1">Total Sensors</div>
          <div className="text-3xl font-display font-bold text-foreground">{filteredReadings.length}</div>
        </div>
        
        <div className="glass-card p-4 rounded-xl">
          <div className="text-sm text-muted-foreground mb-1">Global Average</div>
          <div className="text-3xl font-display font-bold" style={{ color: getAQIColor(avgValue) }}>
            {avgValue.toFixed(1)}
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-xl">
          <div className="text-sm text-muted-foreground mb-1">Highest Reading</div>
          <div className="text-3xl font-display font-bold text-destructive">
            {maxReading?.value.toFixed(1) || '-'}
          </div>
          <div className="text-xs text-muted-foreground truncate">{maxReading?.city || '-'}</div>
        </div>
        
        <div className="glass-card p-4 rounded-xl">
          <div className="text-sm text-muted-foreground mb-1">Alert Zones</div>
          <div className="text-3xl font-display font-bold text-warning">
            {filteredReadings.filter((r) => r.value > 100).length}
          </div>
        </div>
      </div>

      {error && (
        <div className="glass-card p-4 rounded-xl mb-8 border border-destructive/50 bg-destructive/10">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            <span>Error loading data: {error}</span>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-display font-semibold text-foreground mb-4">
            {selectedParameter.toUpperCase()} Levels Worldwide
          </h3>
          <div className="aspect-video rounded-xl overflow-hidden border border-border/50">
            <EarthMap
              airQuality={filteredReadings}
              earthquakes={[]}
              activeLayers={['pollution']}
            />
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
              <span>Good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#eab308]" />
              <span>Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#f97316]" />
              <span>Unhealthy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <span>Very Unhealthy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#7c3aed]" />
              <span>Hazardous</span>
            </div>
          </div>
        </div>

        {/* Top Polluted Chart */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-display font-semibold text-foreground mb-4">
            Top 10 Polluted Locations
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                <YAxis 
                  dataKey="location" 
                  type="category" 
                  width={80} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} 
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number, name, props) => [
                    `${value.toFixed(1)} ${props.payload.unit}`,
                    selectedParameter.toUpperCase()
                  ]}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getAQIColor(entry.value)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Locations Table */}
      <div className="mt-8 glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-display font-semibold text-foreground mb-6">
          Latest Readings
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Location</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Country</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Value</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Updated</th>
              </tr>
            </thead>
            <tbody>
              {topPolluted.slice(0, 15).map((reading) => (
                <tr key={reading.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{reading.city || reading.location}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{reading.country}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold" style={{ color: getAQIColor(reading.value) }}>
                      {reading.value.toFixed(1)} {reading.unit}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${getAQIColor(reading.value)}20`,
                        color: getAQIColor(reading.value)
                      }}
                    >
                      {getAQILabel(reading.value)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-muted-foreground">
                    {new Date(reading.lastUpdated).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Data source: OpenAQ (openaq.org) - Open Air Quality Data Platform
      </p>
    </div>
  );
};

export default PollutionPage;
