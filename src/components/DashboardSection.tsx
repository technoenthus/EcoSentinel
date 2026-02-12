import { useState } from 'react';
import { Activity, TreeDeciduous, Factory, Droplets, AlertTriangle, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

type MonitoringLayer = 'deforestation' | 'pollution' | 'water';

const mockData = {
  deforestation: [
    { month: 'Jan', value: 120 },
    { month: 'Feb', value: 145 },
    { month: 'Mar', value: 180 },
    { month: 'Apr', value: 165 },
    { month: 'May', value: 210 },
    { month: 'Jun', value: 185 },
  ],
  pollution: [
    { month: 'Jan', value: 85 },
    { month: 'Feb', value: 92 },
    { month: 'Mar', value: 78 },
    { month: 'Apr', value: 105 },
    { month: 'May', value: 95 },
    { month: 'Jun', value: 110 },
  ],
  water: [
    { month: 'Jan', value: 95 },
    { month: 'Feb', value: 88 },
    { month: 'Mar', value: 82 },
    { month: 'Apr', value: 76 },
    { month: 'May', value: 70 },
    { month: 'Jun', value: 68 },
  ],
};

const alerts = [
  { id: 1, type: 'deforestation', location: 'Amazon Basin, Brazil', severity: 'critical', time: '2 min ago' },
  { id: 2, type: 'pollution', location: 'Delhi NCR, India', severity: 'high', time: '15 min ago' },
  { id: 3, type: 'water', location: 'Lake Chad, Africa', severity: 'medium', time: '1 hour ago' },
  { id: 4, type: 'deforestation', location: 'Borneo, Indonesia', severity: 'high', time: '2 hours ago' },
];

const recentActions = [
  { 
    id: 1, 
    action: 'Deforestation detected',
    location: 'Amazon Basin, Brazil',
    timestamp: 'Jan 24, 2026 – 14:32 UTC',
    status: 'Alert sent to IBAMA',
  },
  { 
    id: 2, 
    action: 'Water level drop detected',
    location: 'Aral Sea, Kazakhstan',
    timestamp: 'Jan 24, 2026 – 12:18 UTC',
    status: 'Report generated',
  },
  { 
    id: 3, 
    action: 'Air pollution spike detected',
    location: 'Northern India',
    timestamp: 'Jan 24, 2026 – 09:45 UTC',
    status: 'Advisory issued',
  },
  { 
    id: 4, 
    action: 'Illegal mining activity flagged',
    location: 'Congo Rainforest',
    timestamp: 'Jan 23, 2026 – 22:11 UTC',
    status: 'Authorities notified',
  },
  { 
    id: 5, 
    action: 'Coral bleaching risk elevated',
    location: 'Great Barrier Reef',
    timestamp: 'Jan 23, 2026 – 16:03 UTC',
    status: 'Monitoring intensified',
  },
];

const hotspots = [
  { id: 1, x: 25, y: 45, type: 'deforestation' },
  { id: 2, x: 70, y: 35, type: 'pollution' },
  { id: 3, x: 48, y: 55, type: 'water' },
  { id: 4, x: 80, y: 60, type: 'deforestation' },
  { id: 5, x: 55, y: 25, type: 'pollution' },
];

const DashboardSection = () => {
  const [activeLayer, setActiveLayer] = useState<MonitoringLayer>('deforestation');

  const layers = [
    { id: 'deforestation' as const, icon: TreeDeciduous, label: 'Deforestation', color: 'text-success', bgColor: 'bg-success' },
    { id: 'pollution' as const, icon: Factory, label: 'Pollution', color: 'text-warning', bgColor: 'bg-warning' },
    { id: 'water' as const, icon: Droplets, label: 'Water Level', color: 'text-primary', bgColor: 'bg-primary' },
  ];

  const activeLayerConfig = layers.find(l => l.id === activeLayer)!;

  return (
    <section id="dashboard" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6">
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Live Monitoring</span>
          </div>
          <h2 className="section-heading mb-4">
            Real-Time Dashboard
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Monitor environmental changes across the globe with our advanced satellite-powered dashboard.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
            {/* Layer Toggle */}
            <div className="flex flex-wrap gap-3 mb-6">
              {layers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    activeLayer === layer.id
                      ? `${layer.bgColor}/20 ${layer.color} border border-current`
                      : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  <layer.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{layer.label}</span>
                </button>
              ))}
            </div>

            {/* Mock World Map */}
            <div className="relative aspect-[16/9] rounded-xl bg-secondary/30 border border-border/50 overflow-hidden">
              {/* Grid lines */}
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-6">
                {Array.from({ length: 72 }).map((_, i) => (
                  <div key={i} className="border border-border/10" />
                ))}
              </div>

              {/* Continents (simplified shapes) */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60">
                {/* North America */}
                <path d="M10 15 L25 12 L28 20 L20 28 L12 25 Z" className="fill-secondary/50 stroke-border/30" />
                {/* South America */}
                <path d="M22 32 L28 30 L30 45 L25 55 L20 50 Z" className="fill-secondary/50 stroke-border/30" />
                {/* Europe */}
                <path d="M45 12 L55 10 L58 18 L50 22 L45 18 Z" className="fill-secondary/50 stroke-border/30" />
                {/* Africa */}
                <path d="M45 25 L55 22 L60 40 L50 50 L42 38 Z" className="fill-secondary/50 stroke-border/30" />
                {/* Asia */}
                <path d="M58 10 L85 8 L90 25 L75 35 L60 28 Z" className="fill-secondary/50 stroke-border/30" />
                {/* Australia */}
                <path d="M78 42 L90 40 L92 50 L82 52 Z" className="fill-secondary/50 stroke-border/30" />
              </svg>

              {/* Hotspots */}
              {hotspots.filter(h => h.type === activeLayer).map((hotspot) => (
                <div
                  key={hotspot.id}
                  className={`absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 ${activeLayerConfig.bgColor} rounded-full animate-pulse`}
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                >
                  <div className={`absolute inset-0 ${activeLayerConfig.bgColor}/50 rounded-full animate-ping`} />
                </div>
              ))}

              {/* Status indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 glass-card rounded-full">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-muted-foreground">Live</span>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Chart */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <activeLayerConfig.icon className={`w-5 h-5 ${activeLayerConfig.color}`} />
                {activeLayerConfig.label} Trend
              </h3>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockData[activeLayer]}>
                    <defs>
                      <linearGradient id={`gradient-${activeLayer}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={`hsl(var(--${activeLayer === 'deforestation' ? 'success' : activeLayer === 'pollution' ? 'warning' : 'primary'}))`} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={`hsl(var(--${activeLayer === 'deforestation' ? 'success' : activeLayer === 'pollution' ? 'warning' : 'primary'}))`} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={`hsl(var(--${activeLayer === 'deforestation' ? 'success' : activeLayer === 'pollution' ? 'warning' : 'primary'}))`}
                      fill={`url(#gradient-${activeLayer})`}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Recent Alerts
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.severity === 'critical' ? 'bg-destructive' : 
                      alert.severity === 'high' ? 'bg-warning' : 'bg-primary'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-foreground truncate">{alert.location}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Actions Timeline */}
        <div className="mt-12 glass-card p-6 rounded-2xl">
          <h3 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Recent Actions Timeline
          </h3>
          <div className="space-y-4">
            {recentActions.map((item, index) => (
              <div 
                key={item.id} 
                className="relative flex gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Timeline connector */}
                {index < recentActions.length - 1 && (
                  <div className="absolute left-7 top-14 w-px h-6 bg-border/50" />
                )}
                
                {/* Status indicator */}
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="font-medium text-foreground">{item.action}</span>
                    <span className="text-sm text-primary">• {item.location}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success">{item.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
