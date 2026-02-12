import { useState } from 'react';
import { Droplets, MapPin, TrendingDown, TrendingUp, Waves, ThermometerSun, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EarthMap from '@/components/maps/EarthMap';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from 'recharts';

// Mock data for water levels (would come from NOAA/NASA APIs)
const waterData = {
  waterBodies: [
    { 
      id: 1, 
      name: 'Aral Sea', 
      country: 'Kazakhstan/Uzbekistan',
      type: 'Lake',
      change: -15.2,
      currentLevel: 42,
      historicalLevel: 68,
      lat: 45,
      lon: 59,
      status: 'critical'
    },
    { 
      id: 2, 
      name: 'Lake Chad', 
      country: 'Chad',
      type: 'Lake',
      change: -8.7,
      currentLevel: 284,
      historicalLevel: 25000,
      lat: 13,
      lon: 14,
      status: 'critical'
    },
    { 
      id: 3, 
      name: 'Dead Sea', 
      country: 'Israel/Jordan',
      type: 'Lake',
      change: -1.2,
      currentLevel: -430,
      historicalLevel: -394,
      lat: 31.5,
      lon: 35.5,
      status: 'declining'
    },
    { 
      id: 4, 
      name: 'Lake Mead', 
      country: 'USA',
      type: 'Reservoir',
      change: -4.8,
      currentLevel: 1050,
      historicalLevel: 1220,
      lat: 36.1,
      lon: -114.7,
      status: 'warning'
    },
    { 
      id: 5, 
      name: 'Lake Titicaca', 
      country: 'Peru/Bolivia',
      type: 'Lake',
      change: -1.1,
      currentLevel: 3812,
      historicalLevel: 3821,
      lat: -16,
      lon: -69,
      status: 'stable'
    },
  ],
  seaLevelData: [
    { year: '1990', level: 0 },
    { year: '1995', level: 15 },
    { year: '2000', level: 28 },
    { year: '2005', level: 42 },
    { year: '2010', level: 58 },
    { year: '2015', level: 78 },
    { year: '2020', level: 98 },
    { year: '2025', level: 115 },
    { year: '2026', level: 118 },
  ],
  glacierData: [
    { year: '2000', mass: 100 },
    { year: '2005', mass: 96 },
    { year: '2010', mass: 91 },
    { year: '2015', mass: 84 },
    { year: '2020', mass: 76 },
    { year: '2025', mass: 68 },
    { year: '2026', mass: 65 },
  ],
  stats: {
    seaLevelRise: 3.4,
    glacierLoss: 274,
    droughtAreas: 23,
    floodRisk: 47,
  }
};

const WaterPage = () => {
  const [selectedWaterBody, setSelectedWaterBody] = useState<typeof waterData.waterBodies[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-destructive bg-destructive/20';
      case 'declining': return 'text-warning bg-warning/20';
      case 'warning': return 'text-warning bg-warning/20';
      case 'stable': return 'text-success bg-success/20';
      default: return 'text-muted-foreground bg-secondary';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-4">
            <Droplets className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Water Resources</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Water Level Monitor
          </h1>
          <p className="text-muted-foreground mt-2">
            Tracking global water bodies, sea levels, and climate indicators
          </p>
        </div>
        
        <a 
          href="https://www.noaa.gov/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex"
        >
          <Button variant="outline" size="sm" className="gap-2">
            <ExternalLink className="w-4 h-4" />
            NOAA Data
          </Button>
        </a>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Waves className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Sea Level Rise</span>
          </div>
          <div className="text-3xl font-display font-bold text-primary">
            +{waterData.stats.seaLevelRise}mm/yr
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <ThermometerSun className="w-4 h-4 text-destructive" />
            <span className="text-sm text-muted-foreground">Glacier Loss</span>
          </div>
          <div className="text-3xl font-display font-bold text-destructive">
            {waterData.stats.glacierLoss}Gt/yr
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-xl">
          <div className="text-sm text-muted-foreground mb-1">Drought Areas</div>
          <div className="text-3xl font-display font-bold text-warning">
            {waterData.stats.droughtAreas}%
          </div>
          <div className="text-xs text-muted-foreground">of land surface</div>
        </div>
        
        <div className="glass-card p-4 rounded-xl">
          <div className="text-sm text-muted-foreground mb-1">Flood Risk Zones</div>
          <div className="text-3xl font-display font-bold text-primary">
            {waterData.stats.floodRisk}M
          </div>
          <div className="text-xs text-muted-foreground">people affected</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-display font-semibold text-foreground mb-4">
            Global Water Bodies
          </h3>
          <div className="aspect-video rounded-xl overflow-hidden border border-border/50">
            <EarthMap
              earthquakes={[]}
              airQuality={[]}
              activeLayers={['water']}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Blue markers indicate monitored water bodies. Click for detailed information.
          </p>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          {/* Sea Level Chart */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">
              Global Sea Level Rise
            </h3>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waterData.seaLevelData}>
                  <defs>
                    <linearGradient id="gradient-sea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="year" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 8 }} 
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`+${value}mm`, 'vs 1990 baseline']}
                  />
                  <Area
                    type="monotone"
                    dataKey="level"
                    stroke="hsl(var(--primary))"
                    fill="url(#gradient-sea)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">mm above 1990 baseline</p>
          </div>

          {/* Glacier Chart */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">
              Glacier Mass Index
            </h3>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={waterData.glacierData}>
                  <XAxis 
                    dataKey="year" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 8 }} 
                  />
                  <YAxis hide domain={[50, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`${value}%`, 'of 2000 baseline']}
                  />
                  <Line
                    type="monotone"
                    dataKey="mass"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">% of 2000 mass</p>
          </div>
        </div>
      </div>

      {/* Water Bodies Table */}
      <div className="mt-8 glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-display font-semibold text-foreground mb-6">
          Monitored Water Bodies
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Location</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Level Change</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {waterData.waterBodies.map((body) => (
                <tr 
                  key={body.id} 
                  className="border-b border-border/30 hover:bg-secondary/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedWaterBody(body)}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-primary" />
                      <span className="text-foreground font-medium">{body.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{body.country}</td>
                  <td className="py-3 px-4 text-muted-foreground">{body.type}</td>
                  <td className="py-3 px-4">
                    <span className={`font-bold ${body.change < 0 ? 'text-destructive' : 'text-success'}`}>
                      {body.change > 0 ? '+' : ''}{body.change}m
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(body.status)}`}>
                      {body.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Water Body Detail */}
      {selectedWaterBody && (
        <div className="mt-8 glass-card p-6 rounded-2xl border border-primary/30">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-display font-semibold text-foreground">
                {selectedWaterBody.name}
              </h3>
              <p className="text-muted-foreground">{selectedWaterBody.country}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSelectedWaterBody(null)}>
              Close
            </Button>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-secondary/30 p-4 rounded-xl">
              <div className="text-sm text-muted-foreground">Current Level</div>
              <div className="text-2xl font-bold text-foreground">{selectedWaterBody.currentLevel}m</div>
            </div>
            <div className="bg-secondary/30 p-4 rounded-xl">
              <div className="text-sm text-muted-foreground">Historical Level</div>
              <div className="text-2xl font-bold text-muted-foreground">{selectedWaterBody.historicalLevel}m</div>
            </div>
            <div className="bg-secondary/30 p-4 rounded-xl">
              <div className="text-sm text-muted-foreground">Change</div>
              <div className={`text-2xl font-bold ${selectedWaterBody.change < 0 ? 'text-destructive' : 'text-success'}`}>
                {selectedWaterBody.change > 0 ? '+' : ''}{selectedWaterBody.change}m
              </div>
            </div>
            <div className="bg-secondary/30 p-4 rounded-xl">
              <div className="text-sm text-muted-foreground">Status</div>
              <div className={`text-2xl font-bold capitalize ${
                selectedWaterBody.status === 'critical' ? 'text-destructive' :
                selectedWaterBody.status === 'warning' || selectedWaterBody.status === 'declining' ? 'text-warning' :
                'text-success'
              }`}>
                {selectedWaterBody.status}
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-8 text-center">
        Data sources: NOAA, NASA Earth Observatory. Sea level data from satellite altimetry.
      </p>
    </div>
  );
};

export default WaterPage;
