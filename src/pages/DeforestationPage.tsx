import { useState } from 'react';
import { TreeDeciduous, MapPin, AlertTriangle, TrendingDown, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EarthMap from '@/components/maps/EarthMap';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

// Mock data for deforestation (would come from Global Forest Watch API with proper key)
const deforestationData = {
  hotspots: [
    { 
      id: 1, 
      region: 'Amazon Basin', 
      country: 'Brazil', 
      area: 1247, 
      change: -2.3,
      lat: -3.4653, 
      lon: -62.2159,
      alerts: 156,
      lastUpdated: '2026-01-24'
    },
    { 
      id: 2, 
      region: 'Borneo Rainforest', 
      country: 'Indonesia', 
      area: 856, 
      change: -1.8,
      lat: 1.5, 
      lon: 110,
      alerts: 89,
      lastUpdated: '2026-01-24'
    },
    { 
      id: 3, 
      region: 'Congo Basin', 
      country: 'DRC', 
      area: 623, 
      change: -1.2,
      lat: -2, 
      lon: 22,
      alerts: 67,
      lastUpdated: '2026-01-24'
    },
    { 
      id: 4, 
      region: 'Cerrado Savanna', 
      country: 'Brazil', 
      area: 412, 
      change: -0.9,
      lat: -15, 
      lon: -47,
      alerts: 45,
      lastUpdated: '2026-01-24'
    },
    { 
      id: 5, 
      region: 'Chaco Region', 
      country: 'Paraguay', 
      area: 298, 
      change: -0.7,
      lat: -22, 
      lon: -60,
      alerts: 34,
      lastUpdated: '2026-01-24'
    },
  ],
  trendData: [
    { year: '2020', loss: 25.8 },
    { year: '2021', loss: 27.1 },
    { year: '2022', loss: 24.3 },
    { year: '2023', loss: 22.8 },
    { year: '2024', loss: 20.1 },
    { year: '2025', loss: 18.9 },
    { year: '2026', loss: 17.2 },
  ],
  stats: {
    totalLoss2026: 17.2,
    alertsToday: 391,
    activeMonitoring: 4.2,
    protectedAreas: 12.5,
  }
};

const DeforestationPage = () => {
  const [selectedRegion, setSelectedRegion] = useState<typeof deforestationData.hotspots[0] | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-4">
            <TreeDeciduous className="w-4 h-4 text-success animate-pulse" />
            <span className="text-sm text-muted-foreground">Forest Monitoring</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Deforestation Tracker
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitoring global forest cover changes using satellite imagery
          </p>
        </div>
        
        <a 
          href="https://www.globalforestwatch.org/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex"
        >
          <Button variant="outline" size="sm" className="gap-2">
            <ExternalLink className="w-4 h-4" />
            Global Forest Watch
          </Button>
        </a>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-4 rounded-xl">
          <div className="text-sm text-muted-foreground mb-1">2026 Forest Loss</div>
          <div className="text-3xl font-display font-bold text-destructive">
            {deforestationData.stats.totalLoss2026}M ha
          </div>
          <div className="flex items-center gap-1 text-success text-xs mt-1">
            <TrendingDown className="w-3 h-3" />
            <span>9% less than 2025</span>
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-xl">
          <div className="text-sm text-muted-foreground mb-1">Alerts Today</div>
          <div className="text-3xl font-display font-bold text-warning">
            {deforestationData.stats.alertsToday}
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-xl">
          <div className="text-sm text-muted-foreground mb-1">Active Monitoring</div>
          <div className="text-3xl font-display font-bold text-foreground">
            {deforestationData.stats.activeMonitoring}B ha
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-xl">
          <div className="text-sm text-muted-foreground mb-1">Protected Areas</div>
          <div className="text-3xl font-display font-bold text-success">
            {deforestationData.stats.protectedAreas}%
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-display font-semibold text-foreground mb-4">
            Deforestation Hotspots
          </h3>
          <div className="aspect-video rounded-xl overflow-hidden border border-border/50">
            <EarthMap
              earthquakes={[]}
              airQuality={[]}
              activeLayers={['deforestation']}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Green circles indicate active deforestation alerts. Click for details.
          </p>
        </div>

        {/* Trend Chart */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-display font-semibold text-foreground mb-4">
            Annual Forest Loss Trend
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={deforestationData.trendData}>
                <defs>
                  <linearGradient id="gradient-forest" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} 
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`${value}M hectares`, 'Forest Loss']}
                />
                <Area
                  type="monotone"
                  dataKey="loss"
                  stroke="hsl(var(--success))"
                  fill="url(#gradient-forest)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Global annual forest loss in million hectares
          </p>
        </div>
      </div>

      {/* Hotspots Table */}
      <div className="mt-8 glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-display font-semibold text-foreground mb-6">
          Active Deforestation Hotspots
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Region</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Country</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Area Affected</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Change</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Alerts</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Updated</th>
              </tr>
            </thead>
            <tbody>
              {deforestationData.hotspots.map((hotspot) => (
                <tr 
                  key={hotspot.id} 
                  className="border-b border-border/30 hover:bg-secondary/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedRegion(hotspot)}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <TreeDeciduous className="w-4 h-4 text-success" />
                      <span className="text-foreground font-medium">{hotspot.region}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{hotspot.country}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-destructive">{hotspot.area} km²</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-destructive">{hotspot.change}%</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-warning/20 text-warning">
                      {hotspot.alerts} alerts
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-muted-foreground">
                    {hotspot.lastUpdated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Region Detail */}
      {selectedRegion && (
        <div className="mt-8 glass-card p-6 rounded-2xl border border-success/30">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-display font-semibold text-foreground">
                {selectedRegion.region}
              </h3>
              <p className="text-muted-foreground">{selectedRegion.country}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSelectedRegion(null)}>
              Close
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-secondary/30 p-4 rounded-xl">
              <div className="text-sm text-muted-foreground">Affected Area</div>
              <div className="text-2xl font-bold text-destructive">{selectedRegion.area} km²</div>
            </div>
            <div className="bg-secondary/30 p-4 rounded-xl">
              <div className="text-sm text-muted-foreground">Change Rate</div>
              <div className="text-2xl font-bold text-destructive">{selectedRegion.change}%</div>
            </div>
            <div className="bg-secondary/30 p-4 rounded-xl">
              <div className="text-sm text-muted-foreground">Active Alerts</div>
              <div className="text-2xl font-bold text-warning">{selectedRegion.alerts}</div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            <AlertTriangle className="w-4 h-4 inline mr-1 text-warning" />
            This region requires immediate attention. Satellite imagery shows significant canopy loss in the past 30 days.
          </p>
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-8 text-center">
        Data visualization based on Global Forest Watch methodology. For live alerts, visit{' '}
        <a href="https://www.globalforestwatch.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          globalforestwatch.org
        </a>
      </p>
    </div>
  );
};

export default DeforestationPage;
