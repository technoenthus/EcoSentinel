import { Satellite, Cpu, Database, Bell, ArrowRight } from 'lucide-react';

const SolutionSection = () => {
  const pipeline = [
    {
      icon: Satellite,
      title: 'Satellite Ingestion',
      description: 'Multi-spectral imagery from Sentinel-2 and Landsat satellites',
      color: 'from-primary to-primary/50',
    },
    {
      icon: Database,
      title: 'Data Processing',
      description: 'Real-time preprocessing, cloud masking, and normalization',
      color: 'from-accent to-accent/50',
    },
    {
      icon: Cpu,
      title: 'AI Analysis',
      description: 'Deep learning models detect environmental changes',
      color: 'from-success to-success/50',
    },
    {
      icon: Bell,
      title: 'Alert Generation',
      description: 'Instant notifications for detected anomalies',
      color: 'from-warning to-warning/50',
    },
  ];

  return (
    <section id="solution" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6">
            <Satellite className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Our Solution</span>
          </div>
          <h2 className="section-heading mb-4">
            AI Meets Satellite Technology
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            EcoSentinel combines cutting-edge machine learning with real-time satellite data 
            to create a planetary-scale environmental monitoring system.
          </p>
        </div>

        {/* Pipeline Visualization */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-success -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {pipeline.map((step, index) => (
              <div 
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Card */}
                <div className="glass-card p-6 h-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 gradient-border">
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-primary border border-primary/30">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-8 h-8 text-foreground" />
                  </div>

                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for mobile/tablet */}
                {index < pipeline.length - 1 && (
                  <div className="hidden md:flex lg:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 text-primary">
                    <ArrowRight className="w-6 h-6 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Data Flow Animation */}
        <div className="mt-16 glass-card p-8 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-success/5" />
          
          {/* Animated scan line */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line" />
          </div>

          <div className="relative grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-display font-bold text-primary mb-2">15TB+</div>
              <div className="text-muted-foreground">Satellite data processed daily</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-accent mb-2">&lt;5min</div>
              <div className="text-muted-foreground">Average detection time</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-success mb-2">1km²</div>
              <div className="text-muted-foreground">Minimum detectable change</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
