import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-muted via-muted/80 to-muted dark:from-[#1f1812] dark:via-[#2a2218] dark:to-[#1f1812]/90 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 dark:bg-[#c4ad9d]/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 dark:bg-[#c4ad9d]/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-20 left-20 w-5 h-5 text-foreground/20 dark:text-white/20 animate-float" style={{ animationDelay: '0s' }} />
        <Sparkles className="absolute top-40 right-32 w-4 h-4 text-foreground/20 dark:text-white/20 animate-float" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute bottom-32 left-1/3 w-6 h-6 text-foreground/20 dark:text-white/20 animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground dark:text-white mb-6 leading-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground dark:text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join industry leaders who trust AI-ROS to deliver innovative solutions. 
              Let's discuss how we can help you achieve your goals.
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <Button
              size="lg"
              className="group bg-gradient-to-r from-secondary to-accent hover:shadow-2xl hover:shadow-secondary/50 text-white font-bold text-lg px-10 h-16 rounded-full transition-all duration-500 hover:scale-110"
            >
              Schedule a Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-border dark:border-white/30 text-foreground dark:text-white hover:bg-muted dark:hover:bg-white/20 backdrop-blur-sm font-bold text-lg px-10 h-16 rounded-full hover:border-primary dark:hover:border-white/50 transition-all duration-500 hover:scale-110"
            >
              <Mail className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Contact Sales
            </Button>
          </div>

          <div className={`mt-16 pt-12 border-t border-border dark:border-white/20 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              <div className="group transition-transform duration-500 hover:scale-110">
                <div className="text-5xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-3">30 min</div>
                <div className="text-sm text-muted-foreground dark:text-white/80 font-semibold uppercase tracking-wide">Free Consultation</div>
              </div>
              <div className="group transition-transform duration-500 hover:scale-110">
                <div className="text-5xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-3">48 hrs</div>
                <div className="text-sm text-muted-foreground dark:text-white/80 font-semibold uppercase tracking-wide">Response Time</div>
              </div>
              <div className="group transition-transform duration-500 hover:scale-110">
                <div className="text-5xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-3">100%</div>
                <div className="text-sm text-muted-foreground dark:text-white/80 font-semibold uppercase tracking-wide">Confidential</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
