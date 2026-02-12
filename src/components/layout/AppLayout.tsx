import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Activity,
  Wind,
  TreeDeciduous,
  Droplets,
  BookOpen,
  Bot,
  Leaf,
  Menu,
  X,
  Flame,
  Calculator,
  ArrowLeftRight
} from 'lucide-react';
import { useState } from 'react';
import GalaxyBackground from '@/components/GalaxyBackground';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/dashboard', icon: Activity, label: 'Dashboard' },
  { path: '/pollution', icon: Wind, label: 'Pollution' },
  { path: '/deforestation', icon: TreeDeciduous, label: 'Deforestation' },
  { path: '/water', icon: Droplets, label: 'Water' },
  { path: '/learn', icon: BookOpen, label: 'Learn' },
  { path: '/ai-assistant', icon: Bot, label: 'AI Assistant' },
  { path: '/events', icon: Flame, label: 'NASA Events' },
  { path: '/carbon-calculator', icon: Calculator, label: 'Carbon Calc' },
  { path: '/compare', icon: ArrowLeftRight, label: 'Compare' },
];

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <GalaxyBackground />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-64 z-50 flex-col bg-card/80 backdrop-blur-md border-r border-border/40">
        {/* Logo */}
        <div className="px-6 py-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Leaf className="w-8 h-8 text-primary transition-transform group-hover:rotate-12" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Eco<span className="text-primary">Sentinel</span>
            </span>
          </Link>
        </div>

        {/* Divider */}
        <div className="mx-4 border-t border-border/30" />

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary/15 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mx-4 border-t border-border/30" />

        {/* Team Credit */}
        <div className="px-6 py-5">
          <p className="text-xs text-muted-foreground">Built by Team 2GB</p>
          <p className="text-xs text-muted-foreground mt-0.5">Disha Malhotra, Rohan Arora</p>
          <p className="text-[10px] text-muted-foreground/60 mt-1">
            &copy; 2026 EcoSentinel
          </p>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <div className="bg-card/80 backdrop-blur-md border-b border-border/40 px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="w-7 h-7 text-primary" />
            <span className="font-display text-lg font-bold text-foreground">
              Eco<span className="text-primary">Sentinel</span>
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="bg-card/95 backdrop-blur-md border-b border-border/40 px-4 pb-4 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-primary/15 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
