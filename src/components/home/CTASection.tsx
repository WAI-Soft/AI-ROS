import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join industry leaders who trust AI-ROS to deliver innovative solutions. 
            Let's discuss how we can help you achieve your goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-white font-semibold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all"
            >
              Schedule a Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm font-semibold text-lg px-8 h-14"
            >
              <Mail className="mr-2 w-5 h-5" />
              Contact Sales
            </Button>
          </div>

          <div className="mt-12 pt-12 border-t border-primary-foreground/20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">30 min</div>
                <div className="text-sm text-primary-foreground/70">Free Consultation</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">48 hrs</div>
                <div className="text-sm text-primary-foreground/70">Response Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">100%</div>
                <div className="text-sm text-primary-foreground/70">Confidential</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
