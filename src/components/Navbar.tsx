import { useState } from 'react';
import { Menu, X, Satellite } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '#problem', label: 'Problem' },
  { href: '#walkthrough', label: 'How It Works' },
  { href: '#dashboard', label: 'Dashboard' },
  { href: '#ai-model', label: 'AI Model' },
  { href: '#impact', label: 'Impact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card mx-4 mt-4 px-6 py-4 rounded-full">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative">
              <Satellite className="w-8 h-8 text-primary transition-transform group-hover:rotate-12" />
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Eco<span className="text-primary">Sentinel</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              variant="cosmic" 
              size="sm"
              onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Dashboard
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-card mx-4 mt-2 p-6 rounded-2xl animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-primary transition-colors text-lg font-medium py-2"
              >
                {link.label}
              </a>
            ))}
            <Button 
              variant="cosmic" 
              className="mt-4 w-full"
              onClick={() => {
                setIsOpen(false);
                document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Dashboard
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
