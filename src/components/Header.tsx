import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">AI</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">AI-ROS</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-2 text-base font-medium transition-colors rounded-lg hover:bg-muted ${
                  isScrolled 
                    ? 'text-foreground hover:text-secondary' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center space-x-2"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </Button>

            <Button variant="default" size="sm" className="hidden md:inline-flex bg-gradient-to-r from-secondary to-accent hover:opacity-90">
              Get Started
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-slide-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-3 text-base font-medium hover:bg-muted rounded-lg transition-colors ${
                    isScrolled 
                      ? 'text-foreground hover:text-secondary' 
                      : 'text-white/90 hover:text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center space-x-3 px-4 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="flex-1"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {language.toUpperCase()}
                </Button>
                <Button variant="default" size="sm" className="flex-1 bg-gradient-to-r from-secondary to-accent">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
