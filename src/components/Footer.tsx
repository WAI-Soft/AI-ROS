import { useState } from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Sprout, Wind, Droplets, Brain, GraduationCap, X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const [selectedSolution, setSelectedSolution] = useState<any>(null);

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/ai-ros/', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://www.facebook.com/share/1EW9u4zaLh/?mibextid=wwXIfr', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/airos.ai?igsh=bHR3dXh6bThkcHBi', label: 'Instagram' },
  ];

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const solutionsData = [
    {
      icon: Sprout,
      title: 'GROW+ – Smart Plant Doctor',
      description: 'An AI-based plant disease detection platform supporting over 30 species. It empowers farmers with early diagnosis, reduces pesticide dependency, and increases yields sustainably.',
      impact: 'Reduces crop loss, improves food security',
      tech: 'AI-based image recognition + plant pathology models',
      color: 'text-green-500',
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
    {
      icon: Wind,
      title: 'Cozy Earth – Air Quality by Design',
      description: 'A VR-powered, AI-guided plant recommendation engine that chooses the best greenery for your space based on local pollution data and oxygen needs. Users can visualize and place plants in their home or office virtually.',
      impact: 'Improves indoor air, promotes urban greening',
      tech: 'AI + VR + environmental data analytics',
      color: 'text-cyan-500',
      gradient: 'from-cyan-500/20 to-blue-500/20',
    },
    {
      icon: Droplets,
      title: 'Soil-Sense – Precision Irrigation for a Thirsty World',
      description: 'A smart irrigation assistant using IoT sensors and AI algorithms to monitor moisture, nutrients, and environmental conditions. It automates water and fertilizer usage for efficient, sustainable farming.',
      impact: 'Saves water, reduces over-fertilization',
      tech: 'AI + IoT + real-time soil analytics',
      color: 'text-blue-500',
      gradient: 'from-blue-500/20 to-indigo-500/20',
    },
    {
      icon: Brain,
      title: 'RaG SaaS – AI That Thinks With You',
      description: 'A Retrieval-Augmented Generation (RaG) platform that allows users to build decision-support agents trained on their own policies, documents, and data. Ideal for sustainability planning, governance, and research.',
      impact: 'Smarter decisions, faster policy design',
      tech: 'LLMs + vector databases + GenAI frameworks',
      color: 'text-purple-500',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      icon: GraduationCap,
      title: 'AI LearnLab – Personalized Education with AI',
      description: 'A platform combining intelligent tutoring, curriculum personalization, and interactive tools to make education more accessible and effective. Whether you\'re a student struggling with math or a professional entering AI from scratch, LearnLab adapts to your needs.',
      impact: 'Equity in education, democratizing AI skills globally',
      tech: 'NLP + adaptive learning engines + interactive simulations',
      color: 'text-orange-500',
      gradient: 'from-orange-500/20 to-red-500/20',
    },
  ];

  const solutions = solutionsData.map((sol) => ({
    label: sol.title.split('–')[0].trim(),
    data: sol,
  }));

  return (
    <footer className="relative text-foreground dark:text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/src/assets/background1.jpg)' }}
      >
        {/* Dark overlay for dark mode */}
        <div className="absolute inset-0 bg-black/0 dark:bg-black/70 transition-colors duration-300" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <img 
                src="/src/assets/AIROS-Logo.png"
                alt="AIROS Logo" 
                className="h-32 w-auto max-w-[400px] object-contain"
              />
            </div>
            <p className="text-base text-muted-foreground dark:text-secondary leading-relaxed">
              Pioneering AI-driven solutions for smart agriculture, cities, and industrial automation.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-secondary/10 hover:bg-secondary text-secondary hover:text-white flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-base text-muted-foreground dark:text-secondary hover:text-secondary dark:hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Solutions</h3>
            <ul className="space-y-2">
              {solutions.map((solution) => (
                <li key={solution.label}>
                  <button
                    onClick={() => setSelectedSolution(solution.data)}
                    className="text-base text-muted-foreground dark:text-secondary hover:text-secondary dark:hover:text-accent transition-colors text-left"
                  >
                    {solution.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:ola@ai-ros.ai"
                  className="text-base text-muted-foreground dark:text-secondary hover:text-secondary dark:hover:text-accent transition-colors"
                >
                  ola@ai-ros.ai
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+201021183564"
                  className="text-base text-muted-foreground dark:text-secondary hover:text-secondary dark:hover:text-accent transition-colors"
                >
                  +20 1021183564
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-base text-muted-foreground dark:text-secondary">
                  Cairo, Egypt
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border dark:border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-base text-muted-foreground dark:text-secondary">
              © {currentYear} AI-ROS. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-base text-muted-foreground dark:text-secondary hover:text-secondary dark:hover:text-accent transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-base text-muted-foreground dark:text-secondary hover:text-secondary dark:hover:text-accent transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedSolution && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedSolution(null)}>
          <div 
            className="relative bg-card rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-primary/30 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedSolution(null)}
              className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background"
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Modal content */}
            <div className="p-8 md:p-12">
              {/* Icon and Title */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className={`absolute inset-0 ${selectedSolution.color} opacity-20 blur-2xl rounded-full`} />
                  <div className={`relative p-4 rounded-2xl bg-gradient-to-br from-card to-muted border-2 border-primary/20 shadow-lg`}>
                    <selectedSolution.icon className={`w-12 h-12 ${selectedSolution.color}`} />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  {selectedSolution.title}
                </h2>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side - Description */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Description
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedSolution.description}
                  </p>
                </div>

                {/* Right Side - Impact & Tech Stack */}
                <div className="space-y-6">
                  {/* Impact */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur-sm border border-primary/20">
                    <h3 className={`text-lg font-semibold ${selectedSolution.color} mb-3 flex items-center gap-2`}>
                      <Sparkles className="w-5 h-5" />
                      Impact
                    </h3>
                    <p className="text-foreground font-medium">
                      {selectedSolution.impact}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur-sm border border-primary/20">
                    <h3 className={`text-lg font-semibold ${selectedSolution.color} mb-3 flex items-center gap-2`}>
                      <Sparkles className="w-5 h-5" />
                      Tech Stack
                    </h3>
                    <p className="text-foreground font-medium">
                      {selectedSolution.tech}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
