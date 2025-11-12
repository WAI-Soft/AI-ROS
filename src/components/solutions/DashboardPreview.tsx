import { useState } from 'react';
import { Play, Monitor, Smartphone, Zap, TrendingUp, Eye, Sparkles, Activity, BarChart3, Gauge, Layers, Maximize2 } from 'lucide-react';
import SectionContainer from '@/components/shared/SectionContainer';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DashboardPreviewProps {
  image: string;
  videoUrl?: string;
  title: string;
}

const DashboardPreview = ({ image, videoUrl, title }: DashboardPreviewProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    freezeOnceVisible: true,
  });

  const highlights = [
    {
      icon: TrendingUp,
      label: 'Real-time Analytics',
      value: 'Live Data',
      description: 'Monitor performance metrics as they happen',
      color: 'from-amber-700 to-orange-800'
    },
    {
      icon: Monitor,
      label: 'Custom Dashboards',
      value: 'Personalized',
      description: 'Tailored views for your specific needs',
      color: 'from-amber-800 to-yellow-700'
    },
    {
      icon: Smartphone,
      label: 'Mobile Responsive',
      value: 'Any Device',
      description: 'Access from anywhere, anytime',
      color: 'from-purple-500 to-pink-500'
    },
  ];

  const stats = [
    { icon: Activity, value: '99.9%', label: 'Uptime', trend: '+2.5%' },
    { icon: BarChart3, value: '2.4s', label: 'Response Time', trend: '-15%' },
    { icon: Gauge, value: '50K+', label: 'Data Points/sec', trend: '+30%' },
  ];

  return (
    <>
      <SectionContainer background="muted" className="relative overflow-hidden">
        {/* Enhanced Animated Background with Grid */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-700/20 via-orange-800/20 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-amber-800/20 via-purple-500/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-pink-500/10 via-orange-500/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div ref={sectionRef} className="max-w-7xl mx-auto relative z-10">
          {/* Section Header - Enhanced */}
          <div className="text-center mb-20">
            <div
              className={`inline-flex items-center gap-2 px-6 py-3 mb-8 text-sm font-bold text-white bg-gradient-to-r from-amber-700 via-orange-800 to-yellow-700 rounded-full shadow-2xl shadow-amber-700/30 transition-all duration-700 hover:scale-105 hover:shadow-amber-700/50 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              <div className="relative">
                <Eye className="w-4 h-4" />
                <div className="absolute inset-0 animate-ping">
                  <Eye className="w-4 h-4 opacity-75" />
                </div>
              </div>
              <span className="relative">
                Live Interactive Demo
                <Sparkles className="absolute -top-1 -right-5 w-3 h-3 animate-pulse" />
              </span>
            </div>
            <h2
              className={`text-5xl md:text-6xl lg:text-7xl font-black mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              <span className="bg-gradient-to-r from-amber-600 via-orange-700 to-yellow-600 bg-clip-text text-transparent animate-gradient-x">
                Experience The Future
              </span>
            </h2>
            <p
              className={`text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              Immerse yourself in our cutting-edge platform with real-time data visualization and intelligent insights
            </p>
          </div>

          {/* Live Stats Bar */}
          <div
            className={`mb-12 grid grid-cols-3 gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="relative group p-6 rounded-2xl bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-xl border border-border/50 hover:border-amber-700/50 transition-all duration-500 hover:scale-105 overflow-hidden"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-700/0 to-orange-800/0 group-hover:from-amber-700/10 group-hover:to-orange-800/10 transition-all duration-500" />

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-700/20 to-orange-800/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-3xl font-black text-foreground group-hover:text-amber-600 transition-colors">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                    <div className="text-amber-600 text-sm font-bold flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {stat.trend}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dashboard Preview - Completely Redesigned */}
          <div
            className={`relative transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
          >
            {/* Main Container with Floating Effect */}
            <div className="relative">
              {/* Glow Effect Behind */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-700/20 via-orange-800/20 to-yellow-700/20 rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Main Preview Card */}
              <div className="relative group cursor-pointer">
                {/* Outer Frame with Gradient Border */}
                <div className="relative p-1 rounded-[2rem] bg-gradient-to-br from-amber-700/50 via-orange-800/50 to-yellow-700/50 shadow-2xl hover:shadow-amber-700/30 transition-all duration-500">
                  {/* Inner Container */}
                  <div className="relative rounded-[1.9rem] overflow-hidden bg-gradient-to-br from-[hsl(210,40%,8%)] to-[hsl(210,40%,12%)]">
                    {/* Image Container */}
                    <div className="relative overflow-hidden" onClick={() => videoUrl && setIsModalOpen(true)}>
                      <img
                        src={image}
                        alt={title}
                        className="w-full h-auto group-hover:scale-105 transition-transform duration-1000"
                      />

                      {/* Multi-layer Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210,40%,8%)]/95 via-[hsl(210,40%,8%)]/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-700/20 via-transparent to-yellow-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      {/* Animated Scan Lines */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-600/30 to-transparent animate-scan" />
                      </div>

                      {/* Play Button - Ultra Enhanced */}
                      {videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className="relative group/play">
                            {/* Multiple Animated Rings */}
                            <div className="absolute inset-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-700/30 to-orange-800/30 animate-ping" />
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-800/40 to-yellow-700/40 animate-ping" style={{ animationDelay: '0.3s' }} />
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-700/30 to-amber-800/30 animate-ping" style={{ animationDelay: '0.6s' }} />
                            </div>

                            {/* Main Play Button */}
                            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-amber-600 via-orange-700 to-yellow-600 flex items-center justify-center shadow-2xl shadow-amber-700/60 group-hover/play:scale-125 group-hover/play:rotate-90 transition-all duration-500 border-4 border-white/30 backdrop-blur-sm">
                              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                              <Play className="w-12 h-12 text-white ml-2 drop-shadow-lg relative z-10" fill="white" />
                            </div>

                            {/* Orbiting Sparkles */}
                            <Sparkles className="absolute -top-6 -right-6 w-7 h-7 text-amber-600 animate-pulse drop-shadow-lg" />
                            <Sparkles className="absolute -bottom-6 -left-6 w-6 h-6 text-yellow-600 animate-pulse drop-shadow-lg" style={{ animationDelay: '0.5s' }} />
                            <Sparkles className="absolute -top-6 -left-6 w-5 h-5 text-orange-700 animate-pulse drop-shadow-lg" style={{ animationDelay: '1s' }} />
                            <Sparkles className="absolute -bottom-6 -right-6 w-6 h-6 text-amber-700 animate-pulse drop-shadow-lg" style={{ animationDelay: '1.5s' }} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Info Bar - Always Visible */}
                    <div className="relative p-8 bg-gradient-to-t from-[hsl(210,40%,6%)] to-transparent border-t border-amber-700/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-700/30 to-orange-800/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-amber-700/30">
                            <Layers className="w-7 h-7 text-amber-600" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-white mb-1">{title}</h3>
                            {videoUrl && (
                              <p className="text-amber-600/90 text-sm font-semibold flex items-center gap-2">
                                <Play className="w-3 h-3" />
                                Click to explore interactive demo
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-700/10 border border-amber-700/30 backdrop-blur-sm">
                          <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                          <span className="text-amber-600 text-sm font-bold">LIVE</span>
                        </div>
                      </div>
                    </div>

                    {/* Corner Accent Lights */}
                    <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-amber-700/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-yellow-700/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                  </div>
                </div>

                {/* Floating Action Button */}
                {videoUrl && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg shadow-secondary/50 hover:scale-110 hover:rotate-12 transition-all duration-300 border-2 border-white/20 z-30"
                  >
                    <Maximize2 className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>

              {/* Floating Orbs Around Preview */}
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl animate-float" />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>
          </div>

          {/* Features Highlights - Completely Redesigned */}
          <div
            className={`mt-20 grid sm:grid-cols-3 gap-8 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="group relative"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-700`} />

                  {/* Main Card */}
                  <div className="relative p-8 rounded-3xl bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl border-2 border-border/50 hover:border-transparent transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5`} />
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)`,
                        backgroundSize: '32px 32px',
                        opacity: 0.03
                      }} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon with Glow */}
                      <div className="relative mb-6">
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.color} blur-2xl rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500`} />
                        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                          <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-0 transition-all duration-500 shadow-lg">
                          <Zap className="w-3 h-3 text-white" />
                        </div>
                      </div>

                      {/* Value with Gradient */}
                      <div className={`text-4xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300 origin-left`}>
                        {item.value}
                      </div>

                      {/* Label */}
                      <div className="text-lg font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-300">
                        {item.label}
                      </div>

                      {/* Description */}
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </div>

                      {/* Progress Bar Animation */}
                      <div className="mt-6 h-1 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${item.color} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out`} />
                      </div>
                    </div>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                    </div>

                    {/* Corner Sparkle */}
                    <Sparkles className="absolute top-4 right-4 w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-700" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div
            className={`mt-20 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => videoUrl && setIsModalOpen(true)}
                className="group/cta relative px-8 py-4 rounded-2xl bg-gradient-to-r from-secondary to-accent text-white font-bold text-lg shadow-2xl shadow-secondary/50 hover:shadow-secondary/70 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-3">
                  <Play className="w-5 h-5" />
                  Watch Full Demo
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </span>
              </button>
              <a
                href="/contact"
                className="px-8 py-4 rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-secondary/30 text-foreground font-bold text-lg hover:bg-card hover:border-secondary hover:scale-105 transition-all duration-300"
              >
                Request Custom Demo
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scan {
            0% {
              transform: translateY(-100%);
            }
            100% {
              transform: translateY(100%);
            }
          }
          .animate-scan {
            animation: scan 3s ease-in-out infinite;
          }
          @keyframes gradient-x {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease infinite;
          }
        `}</style>
      </SectionContainer>

      {/* Video Modal - Ultra Enhanced */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-7xl bg-gradient-to-br from-[hsl(210,40%,8%)] to-[hsl(210,40%,12%)] border-2 border-secondary/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-4 text-3xl">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/30 to-accent/30 flex items-center justify-center border border-secondary/30">
                <Monitor className="w-7 h-7 text-secondary" />
              </div>
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent font-black">
                {title}
              </span>
              <div className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/10 border border-secondary/30">
                <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                <span className="text-amber-600 text-sm font-bold">LIVE DEMO</span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-8">
            {videoUrl && (
              <div className="relative aspect-video bg-muted rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-700/30">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-700/10 to-orange-800/10 pointer-events-none" />
                <iframe
                  src={videoUrl}
                  className="w-full h-full relative z-10"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            )}
            <div className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-amber-700/10 via-orange-800/10 to-yellow-700/10 border border-amber-700/30 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-700/30 to-orange-800/30 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-3">Powerful Features at Your Fingertips</h4>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    Experience the full power of our platform with real-time data visualization,
                    customizable widgets, and intelligent insights that help you make better decisions faster.
                    Our intuitive interface adapts to your workflow, providing exactly what you need, when you need it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardPreview;
