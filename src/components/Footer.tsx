import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const solutions = [
    { label: 'Smart Agriculture', href: '#solutions' },
    { label: 'Smart Cities', href: '#solutions' },
    { label: 'Industrial Automation', href: '#solutions' },
  ];

  return (
    <footer className="bg-[hsl(210,40%,8%)] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="text-xl font-bold">AI-ROS</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Pioneering AI-driven solutions for smart agriculture, cities, and industrial automation.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Solutions</h3>
            <ul className="space-y-2">
              {solutions.map((solution) => (
                <li key={solution.label}>
                  <a
                    href={solution.href}
                    className="text-sm text-gray-300 hover:text-secondary transition-colors"
                  >
                    {solution.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@ai-ros.com"
                  className="text-sm text-gray-300 hover:text-secondary transition-colors"
                >
                  info@ai-ros.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-sm text-gray-300 hover:text-secondary transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-300">
                  123 Tech Boulevard, Innovation City
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} AI-ROS. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-secondary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-secondary transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
