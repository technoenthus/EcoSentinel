import { Link } from 'react-router-dom';
import { Globe, Leaf, Activity, Wind, TreeDeciduous, Droplets, BookOpen, Bot, ArrowRight, Shield, Building2, FlaskConical, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const features = [
    {
      icon: Activity,
      title: 'Live Dashboard',
      description: 'Real-time environmental monitoring with USGS earthquake and OpenAQ pollution data',
      path: '/dashboard',
      color: 'text-primary',
    },
    {
      icon: Wind,
      title: 'Air Quality',
      description: 'Track pollution levels worldwide with live data from OpenAQ sensors',
      path: '/pollution',
      color: 'text-warning',
    },
    {
      icon: TreeDeciduous,
      title: 'Deforestation',
      description: 'Monitor forest cover changes using satellite imagery analysis',
      path: '/deforestation',
      color: 'text-success',
    },
    {
      icon: Droplets,
      title: 'Water Levels',
      description: 'Track water body changes and climate indicators globally',
      path: '/water',
      color: 'text-primary',
    },
    {
      icon: BookOpen,
      title: 'Learn',
      description: 'Educational content about climate change and environmental protection',
      path: '/learn',
      color: 'text-accent',
    },
    {
      icon: Bot,
      title: 'AI Assistant',
      description: 'Get answers about environmental data and climate science',
      path: '/ai-assistant',
      color: 'text-accent',
    },
  ];

  const useCases = [
    { icon: Building2, title: 'Government Agencies', stat: '40% faster response' },
    { icon: Shield, title: 'Disaster Response', stat: '72-hour advance warning' },
    { icon: FlaskConical, title: 'Climate Research', stat: '20+ years data' },
    { icon: Users, title: 'Conservation NGOs', stat: '150+ projects' },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
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

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-8 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-muted-foreground">AI-Powered Environmental Intelligence</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight animate-fade-in">
              <span className="text-foreground">Monitor the </span>
              <span className="bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent text-glow-cyan">
                Planet
              </span>
              <br />
              <span className="text-foreground">in Real Time</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-in">
              EcoSentinel leverages advanced AI and satellite imagery to detect deforestation, 
              pollution spread, and water level changes — protecting our planet from orbit.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Link to="/dashboard">
                <Button variant="cosmic" size="lg" className="group w-full sm:w-auto">
                  <span>Open Dashboard</span>
                  <Activity className="w-5 h-5 ml-2 group-hover:animate-pulse" />
                </Button>
              </Link>
              <Link to="/learn">
                <Button variant="outline" size="lg" className="border-border/50 hover:bg-secondary/50 w-full sm:w-auto">
                  <span>Learn More</span>
                  <Globe className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in">
              <div className="text-center sm:text-left">
                <div className="text-2xl md:text-3xl font-display font-bold text-primary text-glow-cyan">24/7</div>
                <div className="text-sm text-muted-foreground mt-1">Real-time Monitoring</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl md:text-3xl font-display font-bold text-primary text-glow-cyan">99.2%</div>
                <div className="text-sm text-muted-foreground mt-1">Detection Accuracy</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl md:text-3xl font-display font-bold text-primary text-glow-cyan">150+</div>
                <div className="text-sm text-muted-foreground mt-1">Countries Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">Platform Capabilities</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our comprehensive environmental monitoring tools powered by real-time data and AI analysis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.path}
                to={feature.path}
                className="glass-card p-6 rounded-2xl group hover:scale-[1.02] transition-all duration-300 gradient-border"
              >
                <div className={`w-14 h-14 rounded-xl bg-secondary/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">Real-World Impact</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              EcoSentinel empowers organizations worldwide to protect our planet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                  <useCase.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{useCase.title}</h3>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-success/10 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="text-sm text-success font-medium">{useCase.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 rounded-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-success" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
            
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 relative">
              Start Monitoring Today
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 relative">
              Access real-time environmental data and AI-powered insights to protect our planet.
            </p>
            <Link to="/dashboard" className="relative inline-block">
              <Button variant="cosmic" size="lg" className="group">
                <span>Launch Dashboard</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
