import { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  type: 'leaf' | 'orb';
}

const GalaxyBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: i % 3 === 0 ? Math.random() * 5 + 3 : Math.random() * 4 + 2,
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 15,
      type: i % 3 === 0 ? 'leaf' : 'orb',
    }))
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxX = (mousePosition.x - 0.5) * 20;
  const parallaxY = (mousePosition.y - 0.5) * 20;

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden -z-10">
      {/* Base gradient — deep forest to ocean */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px) scale(1.05)`,
          background: 'linear-gradient(160deg, hsl(150 15% 6%) 0%, hsl(160 20% 8%) 30%, hsl(190 25% 7%) 70%, hsl(200 30% 6%) 100%)',
        }}
      />

      {/* Subtle radial glow spots */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          top: '10%',
          left: '20%',
          background: 'radial-gradient(circle, hsl(152 60% 42% / 0.15), transparent 70%)',
          transform: `translate(${parallaxX * 0.2}px, ${parallaxY * 0.2}px)`,
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          bottom: '15%',
          right: '10%',
          background: 'radial-gradient(circle, hsl(200 70% 50% / 0.12), transparent 70%)',
          transform: `translate(${parallaxX * 0.15}px, ${parallaxY * 0.15}px)`,
        }}
      />

      {/* Floating nature particles */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full animate-drift"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              background:
                p.type === 'leaf'
                  ? 'hsl(152 60% 42% / 0.6)'
                  : 'hsl(45 80% 70% / 0.4)',
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              transform: `translate(${parallaxX * 0.4}px, ${parallaxY * 0.4}px)`,
              filter: p.type === 'orb' ? 'blur(1px)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Soft vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/60" />
    </div>
  );
};

export default GalaxyBackground;
