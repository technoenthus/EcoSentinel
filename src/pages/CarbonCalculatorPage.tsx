import { useState, useMemo } from 'react';
import { Calculator, Car, Utensils, Zap, Recycle, TreeDeciduous, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface Inputs {
  carKm: number;
  flights: number;
  publicTransport: number;
  diet: 'heavy-meat' | 'medium-meat' | 'light-meat' | 'vegetarian' | 'vegan';
  electricityKwh: number;
  gasHeating: boolean;
  shopping: 'high' | 'medium' | 'low';
  recycling: boolean;
}

const dietEmissions: Record<string, number> = {
  'heavy-meat': 3.3,
  'medium-meat': 2.5,
  'light-meat': 1.9,
  'vegetarian': 1.4,
  'vegan': 1.0,
};

const shoppingEmissions: Record<string, number> = {
  high: 1.8,
  medium: 1.0,
  low: 0.4,
};

const GLOBAL_AVERAGE = 4.7; // tonnes CO2e per year (world average)

const CarbonCalculatorPage = () => {
  const [inputs, setInputs] = useState<Inputs>({
    carKm: 30,
    flights: 2,
    publicTransport: 10,
    diet: 'medium-meat',
    electricityKwh: 300,
    gasHeating: true,
    shopping: 'medium',
    recycling: true,
  });

  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    // Transport: car ~0.21 kg CO2/km, flights ~0.255 tonnes per round trip, public transit ~0.089 kg/km
    const carAnnual = inputs.carKm * 365 * 0.21 / 1000; // tonnes
    const flightAnnual = inputs.flights * 0.255; // tonnes per flight
    const transitAnnual = inputs.publicTransport * 365 * 0.089 / 1000; // tonnes
    const transport = carAnnual + flightAnnual + transitAnnual;

    // Diet
    const diet = dietEmissions[inputs.diet];

    // Energy: ~0.5 kg CO2/kWh electricity, gas heating ~2.0 tonnes/year
    const electricity = inputs.electricityKwh * 12 * 0.5 / 1000;
    const heating = inputs.gasHeating ? 2.0 : 0.5;
    const energy = electricity + heating;

    // Lifestyle
    const shopping = shoppingEmissions[inputs.shopping];
    const recyclingReduction = inputs.recycling ? -0.3 : 0;
    const lifestyle = shopping + recyclingReduction;

    const total = transport + diet + energy + Math.max(0, lifestyle);

    return {
      transport: Math.round(transport * 100) / 100,
      diet: Math.round(diet * 100) / 100,
      energy: Math.round(energy * 100) / 100,
      lifestyle: Math.round(Math.max(0, lifestyle) * 100) / 100,
      total: Math.round(total * 100) / 100,
    };
  }, [inputs]);

  const pieData = [
    { name: 'Transport', value: results.transport, color: 'hsl(30, 85%, 55%)' },
    { name: 'Diet', value: results.diet, color: 'hsl(142, 60%, 50%)' },
    { name: 'Energy', value: results.energy, color: 'hsl(200, 70%, 50%)' },
    { name: 'Lifestyle', value: results.lifestyle, color: 'hsl(280, 60%, 55%)' },
  ];

  const comparisonData = [
    { name: 'You', value: results.total, fill: results.total > GLOBAL_AVERAGE ? 'hsl(0, 65%, 50%)' : 'hsl(142, 60%, 50%)' },
    { name: 'World Avg', value: GLOBAL_AVERAGE, fill: 'hsl(var(--muted-foreground))' },
    { name: 'EU Avg', value: 6.8, fill: 'hsl(var(--muted-foreground))' },
    { name: 'US Avg', value: 14.7, fill: 'hsl(var(--muted-foreground))' },
    { name: 'India Avg', value: 1.9, fill: 'hsl(var(--muted-foreground))' },
  ];

  const tips = useMemo(() => {
    const t: string[] = [];
    if (results.transport > 3) t.push('Consider carpooling or switching to an electric vehicle to cut transport emissions.');
    if (inputs.flights > 3) t.push('Reducing flights by even one per year saves ~0.25 tonnes of CO2.');
    if (inputs.diet === 'heavy-meat') t.push('Shifting to a lighter meat diet can save over 1 tonne of CO2 annually.');
    if (results.energy > 3) t.push('Switch to renewable energy providers or install solar panels to reduce energy emissions.');
    if (!inputs.recycling) t.push('Recycling can reduce your carbon footprint by up to 0.3 tonnes per year.');
    if (inputs.shopping === 'high') t.push('Buying less fast fashion and choosing durable goods reduces lifestyle emissions.');
    if (t.length === 0) t.push('Great job! Your footprint is relatively low. Keep up the sustainable practices!');
    return t;
  }, [results, inputs]);

  const updateInput = <K extends keyof Inputs>(key: K, value: Inputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-4">
          <Calculator className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Personal Impact Assessment</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
          Carbon Footprint Calculator
        </h1>
        <p className="text-muted-foreground mt-2">
          Estimate your annual carbon emissions and discover ways to reduce your environmental impact.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Transport */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
                <Car className="w-5 h-5 text-warning" />
              </div>
              <h2 className="text-lg font-display font-bold text-foreground">Transport</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Daily car travel: <span className="text-foreground font-semibold">{inputs.carKm} km</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={inputs.carKm}
                  onChange={(e) => updateInput('carKm', Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0 km</span><span>200 km</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Flights per year: <span className="text-foreground font-semibold">{inputs.flights}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={inputs.flights}
                  onChange={(e) => updateInput('flights', Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0</span><span>20</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Daily public transport: <span className="text-foreground font-semibold">{inputs.publicTransport} km</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={inputs.publicTransport}
                  onChange={(e) => updateInput('publicTransport', Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0 km</span><span>100 km</span>
                </div>
              </div>
            </div>
          </div>

          {/* Diet */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                <Utensils className="w-5 h-5 text-success" />
              </div>
              <h2 className="text-lg font-display font-bold text-foreground">Diet</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'heavy-meat', label: 'Heavy Meat' },
                { id: 'medium-meat', label: 'Medium Meat' },
                { id: 'light-meat', label: 'Light Meat' },
                { id: 'vegetarian', label: 'Vegetarian' },
                { id: 'vegan', label: 'Vegan' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => updateInput('diet', d.id as Inputs['diet'])}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    inputs.diet === d.id
                      ? 'bg-primary/20 text-primary border border-primary/40'
                      : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Energy */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-lg font-display font-bold text-foreground">Energy</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Monthly electricity: <span className="text-foreground font-semibold">{inputs.electricityKwh} kWh</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="10"
                  value={inputs.electricityKwh}
                  onChange={(e) => updateInput('electricityKwh', Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>50 kWh</span><span>1000 kWh</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Gas/oil heating?</span>
                <button
                  onClick={() => updateInput('gasHeating', !inputs.gasHeating)}
                  className={`w-12 h-6 rounded-full transition-all ${
                    inputs.gasHeating ? 'bg-primary' : 'bg-secondary'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      inputs.gasHeating ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Lifestyle */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Recycle className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-lg font-display font-bold text-foreground">Lifestyle</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Shopping habits</label>
                <div className="flex gap-2">
                  {[
                    { id: 'high', label: 'High' },
                    { id: 'medium', label: 'Medium' },
                    { id: 'low', label: 'Minimal' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => updateInput('shopping', s.id as Inputs['shopping'])}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        inputs.shopping === s.id
                          ? 'bg-primary/20 text-primary border border-primary/40'
                          : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Do you recycle?</span>
                <button
                  onClick={() => updateInput('recycling', !inputs.recycling)}
                  className={`w-12 h-6 rounded-full transition-all ${
                    inputs.recycling ? 'bg-primary' : 'bg-secondary'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      inputs.recycling ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <Button
            variant="cosmic"
            size="lg"
            className="w-full gap-2"
            onClick={() => setShowResults(true)}
          >
            <span>Calculate My Footprint</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Total Score */}
          <div className="glass-card p-8 rounded-2xl text-center">
            <h2 className="text-lg font-display font-semibold text-muted-foreground mb-2">
              Your Annual Carbon Footprint
            </h2>
            <div className={`text-6xl font-display font-bold mb-2 ${
              results.total > GLOBAL_AVERAGE ? 'text-destructive' : 'text-success'
            }`}>
              {results.total.toFixed(1)}
            </div>
            <div className="text-muted-foreground">tonnes CO2e / year</div>
            <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              results.total > GLOBAL_AVERAGE
                ? 'bg-destructive/10 text-destructive'
                : 'bg-success/10 text-success'
            }`}>
              {results.total > GLOBAL_AVERAGE
                ? `${((results.total / GLOBAL_AVERAGE - 1) * 100).toFixed(0)}% above world average`
                : `${((1 - results.total / GLOBAL_AVERAGE) * 100).toFixed(0)}% below world average`}
            </div>
          </div>

          {/* Breakdown Pie Chart */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Emission Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`${value.toFixed(2)} tonnes`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <span className="text-sm font-medium text-foreground ml-auto">{item.value.toFixed(1)}t</span>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Bar Chart */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">How You Compare</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} layout="vertical">
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} width={70} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`${value.toFixed(1)} tonnes CO2e`, '']}
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tips */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <TreeDeciduous className="w-5 h-5 text-success" />
              <h3 className="text-lg font-display font-semibold text-foreground">Reduction Tips</h3>
            </div>
            <div className="space-y-3">
              {tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trees needed */}
          <div className="glass-card p-6 rounded-2xl text-center">
            <TreeDeciduous className="w-10 h-10 text-success mx-auto mb-3" />
            <div className="text-3xl font-display font-bold text-success">
              {Math.ceil(results.total / 0.022)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              trees needed to offset your annual emissions
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              (Each tree absorbs ~22 kg CO2 per year)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculatorPage;
