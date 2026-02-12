import { Globe, Shield, Activity, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Organic gradient blobs */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] hidden lg:block pointer-events-none">
        <div className="absolute inset-0 animate-float" style={{ animationDuration: '8s' }}>
          <div className="absolute top-[10%] left-[15%] w-[55%] h-[55%] bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute bottom-[15%] right-[10%] w-[45%] h-[45%] bg-accent/12 rounded-full blur-3xl" />
          <div className="absolute top-[40%] left-[35%] w-[35%] h-[35%] bg-success/10 rounded-full blur-2xl" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Leaf className="w-24 h-24 text-primary/20" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-8 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">AI-Powered Environmental Intelligence</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-foreground">Monitor the </span>
            <span className="bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent text-glow-cyan">
              Planet
            </span>
            <br />
            <span className="text-foreground">in Real Time</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            EcoSentinel leverages advanced AI and satellite imagery to detect deforestation, 
            pollution spread, and water level changes — protecting our planet from orbit.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button 
              variant="cosmic" 
              size="lg" 
              className="group"
              onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Dashboard</span>
              <Activity className="w-5 h-5 ml-2 group-hover:animate-pulse" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-border/50 hover:bg-secondary/50"
              onClick={() => document.getElementById('walkthrough')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Watch Demo</span>
              <Globe className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <StatItem value="24/7" label="Real-time Monitoring" />
            <StatItem value="99.2%" label="Detection Accuracy" />
            <StatItem value="150+" label="Countries Covered" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center sm:text-left">
    <div className="text-2xl md:text-3xl font-display font-bold text-primary text-glow-cyan">{value}</div>
    <div className="text-sm text-muted-foreground mt-1">{label}</div>
  </div>
);

export default HeroSection;
