import { Building2, Users, FlaskConical, Shield, ArrowRight, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ImpactSection = () => {
  const useCases = [
    {
      icon: Building2,
      title: 'Government Agencies',
      description: 'Real-time environmental compliance monitoring and policy enforcement',
      stats: '40% faster response to violations',
    },
    {
      icon: Shield,
      title: 'Disaster Response',
      description: 'Early warning systems for floods, fires, and ecological disasters',
      stats: 'Up to 72-hour advance warning',
    },
    {
      icon: FlaskConical,
      title: 'Climate Researchers',
      description: 'Longitudinal data analysis for climate change studies',
      stats: '20+ years of historical data',
    },
    {
      icon: Users,
      title: 'NGOs & Conservation',
      description: 'Protecting endangered ecosystems and wildlife habitats',
      stats: '150+ conservation projects',
    },
  ];

  const hackathonFit = [
    'Real-time satellite data integration',
    'AI-powered environmental analysis',
    'Scalable cloud infrastructure',
    'Open data APIs for extensibility',
    'Global impact potential',
  ];

  return (
    <section id="impact" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6">
            <Trophy className="w-4 h-4 text-warning" />
            <span className="text-sm text-muted-foreground">Real-World Impact</span>
          </div>
          <h2 className="section-heading mb-4">
            Protecting Our Planet
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            EcoSentinel is more than technology — it's a mission to safeguard Earth 
            for future generations through actionable environmental intelligence.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              className="glass-card p-8 rounded-2xl group hover:scale-[1.02] transition-all duration-300 gradient-border"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <useCase.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {useCase.description}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-success/10 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                    <span className="text-sm text-success font-medium">{useCase.stats}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hackathon Fit */}
        <div className="glass-card p-8 md:p-12 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-success" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/10 rounded-full mb-6">
                <Trophy className="w-4 h-4 text-warning" />
                <span className="text-sm text-warning font-medium">Why EcoSentinel?</span>
              </div>
              <h3 className="text-3xl font-display font-bold text-foreground mb-4">
                Built for This Moment
              </h3>
              <p className="text-muted-foreground mb-8">
                EcoSentinel directly addresses the urgent need for scalable, 
                intelligent environmental monitoring. Our solution combines 
                cutting-edge technology with real-world applicability.
              </p>
              <Button variant="cosmic" size="lg" className="group">
                <span>Explore the Demo</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {hackathonFit.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
