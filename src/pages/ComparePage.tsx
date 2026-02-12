import { useState } from 'react';
import { ArrowLeftRight, Wind, Thermometer, TreeDeciduous, Droplets, Factory, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

interface CityData {
  name: string;
  country: string;
  coordinates: [number, number];
  aqi: number;
  pm25: number;
  temperature: number;
  forestCover: number;
  waterQuality: number;
  co2Emissions: number;
  population: string;
  greenSpacePercent: number;
}

const cities: CityData[] = [
  {
    name: 'New Delhi',
    country: 'India',
    coordinates: [28.6139, 77.209],
    aqi: 185,
    pm25: 98,
    temperature: 32,
    forestCover: 12,
    waterQuality: 42,
    co2Emissions: 1.9,
    population: '32M',
    greenSpacePercent: 9,
  },
  {
    name: 'Beijing',
    country: 'China',
    coordinates: [39.9042, 116.4074],
    aqi: 152,
    pm25: 72,
    temperature: 18,
    forestCover: 25,
    waterQuality: 55,
    co2Emissions: 8.0,
    population: '21M',
    greenSpacePercent: 15,
  },
  {
    name: 'London',
    country: 'UK',
    coordinates: [51.5074, -0.1278],
    aqi: 42,
    pm25: 12,
    temperature: 14,
    forestCover: 35,
    waterQuality: 82,
    co2Emissions: 5.2,
    population: '9M',
    greenSpacePercent: 33,
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    coordinates: [35.6762, 139.6503],
    aqi: 55,
    pm25: 15,
    temperature: 20,
    forestCover: 67,
    waterQuality: 88,
    co2Emissions: 8.5,
    population: '14M',
    greenSpacePercent: 29,
  },
  {
    name: 'Sao Paulo',
    country: 'Brazil',
    coordinates: [-23.5505, -46.6333],
    aqi: 68,
    pm25: 22,
    temperature: 25,
    forestCover: 48,
    waterQuality: 60,
    co2Emissions: 2.3,
    population: '22M',
    greenSpacePercent: 18,
  },
  {
    name: 'Los Angeles',
    country: 'USA',
    coordinates: [34.0522, -118.2437],
    aqi: 78,
    pm25: 28,
    temperature: 22,
    forestCover: 18,
    waterQuality: 75,
    co2Emissions: 14.7,
    population: '4M',
    greenSpacePercent: 22,
  },
  {
    name: 'Lagos',
    country: 'Nigeria',
    coordinates: [6.5244, 3.3792],
    aqi: 132,
    pm25: 55,
    temperature: 30,
    forestCover: 10,
    waterQuality: 35,
    co2Emissions: 0.6,
    population: '16M',
    greenSpacePercent: 5,
  },
  {
    name: 'Stockholm',
    country: 'Sweden',
    coordinates: [59.3293, 18.0686],
    aqi: 22,
    pm25: 6,
    temperature: 10,
    forestCover: 75,
    waterQuality: 95,
    co2Emissions: 3.8,
    population: '1M',
    greenSpacePercent: 40,
  },
  {
    name: 'Sydney',
    country: 'Australia',
    coordinates: [-33.8688, 151.2093],
    aqi: 35,
    pm25: 9,
    temperature: 23,
    forestCover: 40,
    waterQuality: 90,
    co2Emissions: 15.3,
    population: '5M',
    greenSpacePercent: 28,
  },
  {
    name: 'Cairo',
    country: 'Egypt',
    coordinates: [30.0444, 31.2357],
    aqi: 165,
    pm25: 85,
    temperature: 35,
    forestCover: 1,
    waterQuality: 38,
    co2Emissions: 2.5,
    population: '22M',
    greenSpacePercent: 3,
  },
];

const getAqiLabel = (aqi: number) => {
  if (aqi <= 50) return { label: 'Good', color: 'text-success' };
  if (aqi <= 100) return { label: 'Moderate', color: 'text-warning' };
  if (aqi <= 150) return { label: 'Unhealthy (Sensitive)', color: 'text-orange-500' };
  return { label: 'Unhealthy', color: 'text-destructive' };
};

const ComparePage = () => {
  const [cityA, setCityA] = useState(0); // New Delhi
  const [cityB, setCityB] = useState(2); // London

  const a = cities[cityA];
  const b = cities[cityB];

  const barData = [
    { metric: 'AQI', [a.name]: a.aqi, [b.name]: b.aqi },
    { metric: 'PM2.5', [a.name]: a.pm25, [b.name]: b.pm25 },
    { metric: 'Forest %', [a.name]: a.forestCover, [b.name]: b.forestCover },
    { metric: 'Water Q.', [a.name]: a.waterQuality, [b.name]: b.waterQuality },
    { metric: 'Green %', [a.name]: a.greenSpacePercent, [b.name]: b.greenSpacePercent },
  ];

  const radarData = [
    { subject: 'Air Quality', A: Math.max(0, 100 - a.aqi / 2), B: Math.max(0, 100 - b.aqi / 2) },
    { subject: 'Forest Cover', A: a.forestCover, B: b.forestCover },
    { subject: 'Water Quality', A: a.waterQuality, B: b.waterQuality },
    { subject: 'Green Space', A: a.greenSpacePercent * 2.5, B: b.greenSpacePercent * 2.5 },
    { subject: 'Low Emissions', A: Math.max(0, 100 - a.co2Emissions * 5), B: Math.max(0, 100 - b.co2Emissions * 5) },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-4">
          <ArrowLeftRight className="w-4 h-4 text-accent" />
          <span className="text-sm text-muted-foreground">Environmental Comparison</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
          Compare Regions
        </h1>
        <p className="text-muted-foreground mt-2">
          Side-by-side environmental comparison between two cities worldwide.
        </p>
      </div>

      {/* City Selectors */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-5 rounded-2xl">
          <label className="text-sm text-muted-foreground mb-2 block">City A</label>
          <select
            value={cityA}
            onChange={(e) => setCityA(Number(e.target.value))}
            className="w-full p-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground focus:outline-none focus:border-primary/50"
          >
            {cities.map((c, i) => (
              <option key={i} value={i} disabled={i === cityB}>
                {c.name}, {c.country}
              </option>
            ))}
          </select>
        </div>
        <div className="glass-card p-5 rounded-2xl">
          <label className="text-sm text-muted-foreground mb-2 block">City B</label>
          <select
            value={cityB}
            onChange={(e) => setCityB(Number(e.target.value))}
            className="w-full p-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground focus:outline-none focus:border-primary/50"
          >
            {cities.map((c, i) => (
              <option key={i} value={i} disabled={i === cityA}>
                {c.name}, {c.country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Stats Comparison */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {[a, b].map((city, idx) => {
          const aqiInfo = getAqiLabel(city.aqi);
          return (
            <div key={idx} className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-display font-bold text-foreground">
                  {city.name}, {city.country}
                </h3>
              </div>
              <div className="text-xs text-muted-foreground mb-4">Population: {city.population}</div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Wind className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                  <div className={`text-2xl font-display font-bold ${aqiInfo.color}`}>{city.aqi}</div>
                  <div className="text-xs text-muted-foreground">AQI</div>
                  <div className={`text-xs ${aqiInfo.color}`}>{aqiInfo.label}</div>
                </div>
                <div className="text-center">
                  <TreeDeciduous className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-2xl font-display font-bold text-success">{city.forestCover}%</div>
                  <div className="text-xs text-muted-foreground">Forest Cover</div>
                </div>
                <div className="text-center">
                  <Droplets className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-2xl font-display font-bold text-primary">{city.waterQuality}/100</div>
                  <div className="text-xs text-muted-foreground">Water Quality</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Thermometer className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-lg font-display font-bold text-foreground">{city.temperature}°C</div>
                  <div className="text-xs text-muted-foreground">Avg Temp</div>
                </div>
                <div className="text-center">
                  <Factory className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-lg font-display font-bold text-foreground">{city.co2Emissions}t</div>
                  <div className="text-xs text-muted-foreground">CO2/capita</div>
                </div>
                <div className="text-center">
                  <TreeDeciduous className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-lg font-display font-bold text-foreground">{city.greenSpacePercent}%</div>
                  <div className="text-xs text-muted-foreground">Green Space</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-display font-semibold text-foreground mb-4">Metric Comparison</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis type="category" dataKey="metric" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} width={65} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey={a.name} fill="hsl(152, 60%, 42%)" radius={[0, 4, 4, 0]} />
                <Bar dataKey={b.name} fill="hsl(200, 70%, 50%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(152, 60%, 42%)' }} />
              <span className="text-sm text-muted-foreground">{a.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(200, 70%, 50%)' }} />
              <span className="text-sm text-muted-foreground">{b.name}</span>
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-display font-semibold text-foreground mb-4">Environmental Health Score</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name={a.name}
                  dataKey="A"
                  stroke="hsl(152, 60%, 42%)"
                  fill="hsl(152, 60%, 42%)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Radar
                  name={b.name}
                  dataKey="B"
                  stroke="hsl(200, 70%, 50%)"
                  fill="hsl(200, 70%, 50%)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Legend
                  wrapperStyle={{ fontSize: 12, color: 'hsl(var(--muted-foreground))' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-lg font-display font-semibold text-foreground mb-4">Key Insights</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Air Quality Comparison */}
          <div className="p-4 rounded-xl bg-secondary/30">
            <Wind className="w-5 h-5 text-warning mb-2" />
            <h4 className="font-medium text-foreground text-sm mb-1">Air Quality</h4>
            <p className="text-xs text-muted-foreground">
              {a.aqi > b.aqi
                ? `${a.name} has ${((a.aqi / b.aqi - 1) * 100).toFixed(0)}% worse air quality than ${b.name}.`
                : `${b.name} has ${((b.aqi / a.aqi - 1) * 100).toFixed(0)}% worse air quality than ${a.name}.`}
            </p>
          </div>

          {/* Forest Cover */}
          <div className="p-4 rounded-xl bg-secondary/30">
            <TreeDeciduous className="w-5 h-5 text-success mb-2" />
            <h4 className="font-medium text-foreground text-sm mb-1">Forest Cover</h4>
            <p className="text-xs text-muted-foreground">
              {a.forestCover > b.forestCover
                ? `${a.name} has ${a.forestCover - b.forestCover}% more forest cover than ${b.name}.`
                : `${b.name} has ${b.forestCover - a.forestCover}% more forest cover than ${a.name}.`}
            </p>
          </div>

          {/* CO2 Emissions */}
          <div className="p-4 rounded-xl bg-secondary/30">
            <Factory className="w-5 h-5 text-destructive mb-2" />
            <h4 className="font-medium text-foreground text-sm mb-1">Carbon Emissions</h4>
            <p className="text-xs text-muted-foreground">
              {a.co2Emissions > b.co2Emissions
                ? `${a.name} emits ${(a.co2Emissions - b.co2Emissions).toFixed(1)} more tonnes CO2 per capita than ${b.name}.`
                : `${b.name} emits ${(b.co2Emissions - a.co2Emissions).toFixed(1)} more tonnes CO2 per capita than ${a.name}.`}
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground mt-6 text-center">
        Data based on aggregated environmental reports and global monitoring indices.
        Values represent approximate annual averages for comparison purposes.
      </p>
    </div>
  );
};

export default ComparePage;
