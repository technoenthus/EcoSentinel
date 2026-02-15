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
  ArrowLeftRight,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import GalaxyBackground from '@/components/GalaxyBackground';

interface NavLink {
  path: string;
  icon: any;
  label: string;
}

interface NavGroup {
  heading: string;
  items: NavLink[];
}

const navGroups: NavGroup[] = [
  {
    heading: '',
    items: [
      { path: '/', icon: Home, label: 'Home' },
      { path: '/dashboard', icon: Activity, label: 'Dashboard' },
    ],
  },
  {
    heading: 'Monitoring',
    items: [
      { path: '/pollution', icon: Wind, label: 'Pollution' },
      { path: '/deforestation', icon: TreeDeciduous, label: 'Deforestation' },
      { path: '/water', icon: Droplets, label: 'Water' },
      { path: '/events', icon: Flame, label: 'NASA Events' },
    ],
  },
  {
    heading: 'Tools',
    items: [
      { path: '/carbon-calculator', icon: Calculator, label: 'Carbon Calculator' },
      { path: '/compare', icon: ArrowLeftRight, label: 'Compare Regions' },
      { path: '/ai-assistant', icon: Bot, label: 'AI Assistant' },
    ],
  },
  {
    heading: '',
    items: [
      { path: '/learn', icon: BookOpen, label: 'Learn' },
    ],
  },
];

// Flat list for mobile menu
const allNavItems = navGroups.flatMap((g) => g.items);

interface AppLayoutProps {
  children: ReactNode;
}

const SidebarGroup = ({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
}) => {
  // Groups with headings are collapsible
  const hasHeading = group.heading.length > 0;
  const isAnyActive = group.items.some((item) => item.path === pathname);
  const [open, setOpen] = useState(true);

  return (
    <div>
      {hasHeading && (
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full px-4 pt-4 pb-1"
        >
          <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground/60">
            {group.heading}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-muted-foreground/40 transition-transform ${
              open ? '' : '-rotate-90'
            }`}
          />
        </button>
      )}

      {(open || !hasHeading) && (
        <div className="space-y-0.5">
          {group.items.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary/15 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <item.icon className="w-[18px] h-[18px]" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <GalaxyBackground />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-64 z-50 flex-col bg-card/80 backdrop-blur-md border-r border-border/40">
        {/* Logo */}
        <div className="px-6 py-5">
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

        {/* Navigation Groups */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto space-y-1">
          {navGroups.map((group, idx) => (
            <SidebarGroup key={idx} group={group} pathname={location.pathname} />
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-4 border-t border-border/30" />

        {/* Team Credit */}
        <div className="px-6 py-4">
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
            <nav className="flex flex-col gap-0.5">
              {allNavItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
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
