import { Brain, Layers, Target, Zap, CheckCircle } from 'lucide-react';

const AIModelSection = () => {
  const modelFeatures = [
    { icon: Layers, title: 'Multi-Scale CNNs', description: 'Hierarchical feature extraction from satellite imagery' },
    { icon: Target, title: 'Semantic Segmentation', description: 'Pixel-level classification for precise boundary detection' },
    { icon: Zap, title: 'Real-Time Inference', description: 'Optimized for edge deployment and fast processing' },
  ];

  const metrics = [
    { label: 'F1 Score', value: '0.94' },
    { label: 'Precision', value: '0.96' },
    { label: 'Recall', value: '0.92' },
    { label: 'IoU', value: '0.89' },
  ];

  const capabilities = [
    'Deforestation detection with 1km² resolution',
    'Multi-spectral pollution analysis (SO₂, NO₂, PM2.5)',
    'Water body segmentation and level estimation',
    'Temporal change detection across years',
    'Cloud-robust processing pipelines',
    'Cross-validation with ground truth data',
  ];

  return (
    <section id="ai-model" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6">
            <Brain className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">AI Technology</span>
          </div>
          <h2 className="section-heading mb-4">
            Deep Learning at Scale
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our proprietary AI models are trained on petabytes of satellite imagery 
            to detect environmental changes with unprecedented accuracy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Model Architecture Visualization */}
          <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-success" />
            
            <h3 className="text-xl font-display font-bold text-foreground mb-8">Model Architecture</h3>
            
            {/* Simplified Neural Network Diagram */}
            <div className="relative py-8">
              <div className="flex items-center justify-between gap-4">
                {/* Input Layer */}
                <div className="flex flex-col gap-2">
                  <div className="text-xs text-muted-foreground text-center mb-2">Input</div>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-lg bg-primary/30 border border-primary/50" />
                  ))}
                </div>

                {/* Connections */}
                <svg className="flex-1 h-32" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {[0, 1, 2, 3].map((i) => (
                    [0, 1, 2].map((j) => (
                      <line
                        key={`${i}-${j}`}
                        x1="0"
                        y1={15 + i * 24}
                        x2="100"
                        y2={20 + j * 30}
                        stroke="hsl(var(--primary))"
                        strokeOpacity="0.2"
                        strokeWidth="0.5"
                      />
                    ))
                  ))}
                </svg>

                {/* Hidden Layer 1 */}
                <div className="flex flex-col gap-2">
                  <div className="text-xs text-muted-foreground text-center mb-2">Conv</div>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-lg bg-accent/30 border border-accent/50" />
                  ))}
                </div>

                {/* Connections */}
                <svg className="flex-1 h-32" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {[0, 1, 2].map((i) => (
                    [0, 1].map((j) => (
                      <line
                        key={`${i}-${j}`}
                        x1="0"
                        y1={20 + i * 30}
                        x2="100"
                        y2={30 + j * 40}
                        stroke="hsl(var(--accent))"
                        strokeOpacity="0.2"
                        strokeWidth="0.5"
                      />
                    ))
                  ))}
                </svg>

                {/* Hidden Layer 2 */}
                <div className="flex flex-col gap-2">
                  <div className="text-xs text-muted-foreground text-center mb-2">Dense</div>
                  {[1, 2].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-lg bg-success/30 border border-success/50" />
                  ))}
                </div>

                {/* Connections */}
                <svg className="flex-1 h-32" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {[0, 1].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={30 + i * 40}
                      x2="100"
                      y2="50"
                      stroke="hsl(var(--success))"
                      strokeOpacity="0.3"
                      strokeWidth="0.5"
                    />
                  ))}
                </svg>

                {/* Output Layer */}
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-xs text-muted-foreground text-center mb-2">Output</div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-accent to-success flex items-center justify-center">
                    <Target className="w-6 h-6 text-foreground" />
                  </div>
                </div>
              </div>

              {/* Animated data flow */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute left-0 top-1/2 w-2 h-2 rounded-full bg-primary animate-data-flow" />
              </div>
            </div>

            {/* Model Metrics */}
            <div className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t border-border/50">
              {metrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className="text-2xl font-display font-bold text-primary">{metric.value}</div>
                  <div className="text-xs text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Features & Capabilities */}
          <div className="space-y-8">
            {/* Feature Cards */}
            <div className="space-y-4">
              {modelFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="glass-card p-5 rounded-xl flex items-start gap-4 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Capabilities List */}
            <div className="glass-card p-6 rounded-xl">
              <h4 className="font-display font-semibold text-foreground mb-4">Detection Capabilities</h4>
              <div className="grid gap-3">
                {capabilities.map((cap, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIModelSection;
