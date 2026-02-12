import { useState, useRef, useEffect } from 'react';
import { AlertTriangle, TreeDeciduous, Factory, Droplets } from 'lucide-react';
import forestBefore from '@/assets/forest-before.jpg';
import forestAfter from '@/assets/forest-after.jpg';

const ProblemSection = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const stats = [
    { icon: TreeDeciduous, value: '10M', label: 'Hectares of forest lost yearly', color: 'text-success' },
    { icon: Factory, value: '91%', label: 'People breathe polluted air', color: 'text-warning' },
    { icon: Droplets, value: '2B', label: 'People lack safe drinking water', color: 'text-primary' },
  ];

  return (
    <section id="problem" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <span className="text-sm text-muted-foreground">Environmental Crisis</span>
          </div>
          <h2 className="section-heading mb-4">
            Our Planet is Under Threat
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every day, environmental damage accelerates across the globe. 
            Traditional monitoring methods can't keep pace with the scale of destruction.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Before/After Slider */}
          <div 
            ref={containerRef}
            className="relative rounded-2xl overflow-hidden glass-card aspect-[4/3] cursor-ew-resize select-none"
            onMouseDown={() => setIsDragging(true)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (background) */}
            <img 
              src={forestAfter} 
              alt="Deforested area - after" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Before Image (overlay with clip) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img 
                src={forestBefore} 
                alt="Forest area - before" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Slider Line */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-primary glow-cyan -translate-x-1/2 z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Slider Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary border-4 border-background flex items-center justify-center glow-cyan">
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-4 bg-primary-foreground rounded" />
                  <div className="w-0.5 h-4 bg-primary-foreground rounded" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 px-3 py-1.5 glass-card rounded-full text-sm font-medium text-success">
              Before
            </div>
            <div className="absolute top-4 right-4 px-3 py-1.5 glass-card rounded-full text-sm font-medium text-destructive">
              After
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-foreground mb-8">
              The Numbers Don't Lie
            </h3>
            
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="stat-card flex items-center gap-6"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-xl bg-secondary/50 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <div>
                  <div className={`text-3xl font-display font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}

            <p className="text-muted-foreground pt-4">
              Without real-time monitoring, we're fighting blind. 
              <span className="text-foreground font-medium"> EcoSentinel changes everything.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
