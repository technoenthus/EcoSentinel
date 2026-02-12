import { Satellite, Brain, Bell, Shield, ChevronRight } from 'lucide-react';

const steps = [
  {
    icon: Satellite,
    title: 'Satellite Data Collection',
    description: 'EcoSentinel continuously receives high-resolution imagery from NASA Earthdata, Copernicus Sentinel-2, and other satellite networks, capturing real-time views of forests, water bodies, and urban areas across the globe.',
    highlight: 'primary',
  },
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Our advanced neural networks process satellite imagery using convolutional neural networks (CNNs) and change detection algorithms to identify deforestation patterns, pollution spread, and water level variations with 99.2% accuracy.',
    highlight: 'accent',
  },
  {
    icon: Bell,
    title: 'Real-Time Alerts',
    description: 'When environmental anomalies are detected, EcoSentinel instantly generates alerts with precise geolocation data, severity assessment, and recommended actions for rapid response teams and authorities.',
    highlight: 'warning',
  },
  {
    icon: Shield,
    title: 'Action & Protection',
    description: 'Environmental agencies, governments, and conservation organizations receive actionable intelligence to deploy resources, enforce regulations, and protect vulnerable ecosystems before irreversible damage occurs.',
    highlight: 'success',
  },
];

const WalkthroughSection = () => {
  return (
    <section id="walkthrough" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6">
            <ChevronRight className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">How It Works</span>
          </div>
          <h2 className="section-heading mb-4">
            From Space to Action
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover how EcoSentinel transforms satellite data into environmental protection through our intelligent pipeline.
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-success hidden md:block" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex gap-6 md:gap-8 group"
              >
                {/* Icon Circle */}
                <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full glass-card flex items-center justify-center border-2 border-${step.highlight}/50 group-hover:border-${step.highlight} transition-colors`}>
                  <step.icon className={`w-7 h-7 text-${step.highlight}`} />
                  <div className={`absolute inset-0 bg-${step.highlight}/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>

                {/* Content */}
                <div className="flex-1 glass-card p-6 rounded-2xl group-hover:border-border/50 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full bg-${step.highlight}/20 text-${step.highlight}`}>
                      Step {index + 1}
                    </span>
                    <h3 className="text-xl font-display font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Ready to see EcoSentinel in action?
          </p>
          <a
            href="#dashboard"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore the Live Dashboard
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default WalkthroughSection;
