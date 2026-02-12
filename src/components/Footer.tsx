import { Satellite, Github, ExternalLink, Mail } from 'lucide-react';

const Footer = () => {
  const links = {
    product: [
      { label: 'Dashboard', href: '#dashboard' },
      { label: 'AI Model', href: '#ai-model' },
      { label: 'How It Works', href: '#walkthrough' },
      { label: 'API Access', href: '#' },
    ],
    resources: [
      { label: 'NASA Earthdata', href: 'https://earthdata.nasa.gov/' },
      { label: 'Copernicus Sentinel', href: 'https://scihub.copernicus.eu/' },
      { label: 'Global Forest Watch', href: 'https://www.globalforestwatch.org/' },
      { label: 'OpenAQ', href: 'https://openaq.org/' },
    ],
  };

  const team = {
    leader: 'Disha Malhotra',
    members: ['Rohan Arora'],
  };

  return (
    <footer className="relative py-16 border-t border-border/50">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Satellite className="w-8 h-8 text-primary" />
                <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
              </div>
              <span className="font-display text-2xl font-bold text-foreground">
                Eco<span className="text-primary">Sentinel</span>
              </span>
            </a>
            <p className="text-muted-foreground max-w-md mb-6">
              AI-powered environmental monitoring system using satellite imagery 
              to detect and track environmental changes in real-time.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Data Sources Badge */}
        <div className="glass-card p-4 rounded-xl mb-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Powered by:</span>
          <span>NASA Earthdata</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
          <span>Copernicus Sentinel-2</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
          <span>OpenAQ</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
          <span>Global Forest Watch</span>
        </div>

        {/* Team Credits */}
        <div className="glass-card p-6 rounded-xl mb-8">
          <div className="text-center">
            <h4 className="font-display font-semibold text-foreground mb-3">Team 2GB</h4>
            <p className="text-muted-foreground text-sm mb-2">
              <span className="text-primary">Team Lead:</span> {team.leader}
            </p>
            <p className="text-muted-foreground text-sm">
              <span className="text-primary">Team Members:</span> {team.members.join(', ')}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            © 2026 EcoSentinel. Built for the future of our planet.
          </p>
          <p className="text-sm text-muted-foreground">
            A global mission by Team 2GB
          </p>
        </div>
      </div>

      {/* Animated cosmic dust */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/50 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
