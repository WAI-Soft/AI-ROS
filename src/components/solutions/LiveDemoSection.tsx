import { useState } from 'react';
import { Play, Monitor, Smartphone, Tablet, Maximize2, Activity, BarChart3, Zap, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import SectionContainer from '@/components/shared/SectionContainer';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface LiveDemoSectionProps {
  image: string;
  videoUrl?: string;
  title: string;
  metrics?: Array<{
    label: string;
    value: string;
    change: string;
    icon: any;
  }>;
}

const LiveDemoSection = ({ image, videoUrl, title, metrics }: LiveDemoSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  const defaultMetrics = [
    { label: 'Uptime', value: '99.9%', change: '+0.2%', icon: Activity },
    { label: 'Response Time', value: '45ms', change: '-12ms', icon: Zap },
    { label: 'Active Users', value: '2.4K', change: '+18%', icon: BarChart3 },
  ];

  const displayMetrics = metrics || defaultMetrics;

  const deviceSizes = {
    desktop: 'w-full',
    tablet: 'w-3/4 mx-auto',
    mobile: 'w-1/2 mx-auto',
  };

  return (
    <>
      <SectionContainer background="default" className="relative overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div ref={sectionRef} className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold rounded-full",
                "bg-gradient-to-r from-secondary/10 via-accent/10 to-secondary/10",
                "border border-secondary/30 backdrop-blur-sm",
                "transition-all duration-700",
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Interactive Demo
              </span>
            </div>
            
            <h2
              className={cn(
                "text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100",
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              Experience the Platform
              <span className="block text-transparent bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text mt-2">
                Live & In Action
              </span>
            </h2>
            
            <p
              className={cn(
                "text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200",
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              See how our solution works in real-time across all devices
            </p>
          </div>

          {/* Live Metrics Bar */}
          <div
            className={cn(
              "grid grid-cols-3 gap-4 mb-8 transition-all duration-700 delay-300",
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            {displayMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="relative group p-6 rounded-2xl bg-gradient-to-br from-card to-muted/50 border border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-secondary" />
                    </div>
                    <span className={cn(
                      "text-xs font-semibold px-2 py-1 rounded-full",
                      metric.change.startsWith('+') ? 'bg-lime-700/10 text-lime-700' : 'bg-amber-800/10 text-amber-800'
                    )}>
                      {metric.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              );
            })}
          </div>

          {/* Device Selector */}
          <div
            className={cn(
              "flex items-center justify-center gap-2 mb-8 transition-all duration-700 delay-400",
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-muted border border-
border">
              <button
                onClick={() => setActiveDevice('desktop')}
                className={cn(
                  "px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2",
                  activeDevice === 'desktop' ? 'bg-secondary text-white' : 'hover:bg-muted-foreground/10'
                )}
              >
                <Monitor className="w-4 h-4" />
                <span className="text-sm font-medium">Desktop</span>
              </button>
              <button
                onClick={() => setActiveDevice('tablet')}
                className={cn(
                  "px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2",
                  activeDevice === 'tablet' ? 'bg-secondary text-white' : 'hover:bg-muted-foreground/10'
                )}
              >
                <Tablet className="w-4 h-4" />
                <span className="text-sm font-medium">Tablet</span>
              </button>
              <button
                onClick={() => setActiveDevice('mobile')}
                className={cn(
                  "px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2",
                  activeDevice === 'mobile' ? 'bg-secondary text-white' : 'hover:bg-muted-foreground/10'
                )}
              >
                <Smartphone className="w-4 h-4" />
                <span className="text-sm font-medium">Mobile</span>
              </button>
            </div>
          </div>

          {/* Demo Preview */}
          <div
            className={cn(
              "relative transition-all duration-700 delay-500",
              deviceSizes[activeDevice],
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
              <div className="relative rounded-2xl overflow-hidden border-2 border-border hover:border-secondary/50 transition-all duration-300 shadow-2xl hover:shadow-secondary/20">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-auto"
                />
                
                {/* Play Overlay */}
                {videoUrl && (
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-secondary/20 rounded-full blur-2xl animate-pulse" />
                      <button className="relative w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Expand Button */}
                <button
                  className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-card/80 backdrop-blur-sm border border-border hover:border-secondary/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div
            className={cn(
              "mt-12 grid md:grid-cols-3 gap-6 transition-all duration-700 delay-600",
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            {[
              { title: 'Real-time Updates', desc: 'See changes instantly' },
              { title: 'Cross-platform', desc: 'Works on all devices' },
              { title: 'Secure & Reliable', desc: '99.9% uptime guarantee' },
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
            {videoUrl ? (
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full"
              />
            ) : (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LiveDemoSection;
