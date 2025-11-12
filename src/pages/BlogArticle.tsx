import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Linkedin, Facebook, Link as LinkIcon, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface BlogArticle {
  title: string;
  slug: string;
  content: string;
  featured_image: string;
  tags: string[];
  reading_time: number;
  published_at: string;
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
}

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await api.get<BlogArticle>(`/posts/${slug}`);
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
        setArticle(mockArticle);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = article?.title || '';

    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast({
          title: 'Link copied!',
          description: 'Article link has been copied to clipboard.',
        });
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Article Not Found</h2>
          <p className="text-muted-foreground">The article you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div
          className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <Header />
      <main>
        {/* Hero Section with Background Image */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-full object-cover"
              loading="eager"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="675"%3E%3Crect fill="%23111827" width="1200" height="675"/%3E%3C/svg%3E';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210,40%,8%)] via-[hsl(210,40%,8%)]/95 to-[hsl(210,40%,8%)]/70" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(210,40%,8%)]" />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-24">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link to="/blog" className="inline-block mb-8">
                <Button
                  variant="ghost"
                  className="text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 backdrop-blur-md text-secondary text-sm font-bold border border-secondary/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-8 leading-tight drop-shadow-2xl">
                {article.title}
              </h1>

              {/* Meta Info & Author Combined */}
              <div className="flex flex-wrap items-center gap-6 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                <div className="flex items-center gap-4">
                  <img
                    src={article.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author.name)}&size=64&background=c4ad9d&color=fff`}
                    alt={article.author.name}
                    className="w-14 h-14 rounded-full ring-2 ring-secondary/50"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Ccircle fill="%23c4ad9d" cx="32" cy="32" r="32"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-size="24" font-weight="bold"%3E' + article.author.name.charAt(0) + '%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div>
                    <div className="font-bold text-white text-base">{article.author.name}</div>
                    {article.author.bio && (
                      <div className="text-sm text-white/70">{article.author.bio}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  <div className="w-1 h-1 rounded-full bg-white/40" />
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">{formatDate(article.published_at)}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{article.reading_time} min read</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">2.4K views</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </section>

        {/* Article Content */}
        <section className="pt-16 pb-24 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* Floating Share Sidebar - Desktop */}
              <div className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
                <div className="flex flex-col gap-3 p-4 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-xl">
                  <div className="text-xs font-bold text-muted-foreground mb-1 text-center">
                    SHARE
                  </div>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="group relative w-12 h-12 rounded-xl bg-gradient-to-br from-card to-card/80 hover:from-secondary/20 hover:to-sky-600/20 border border-border hover:border-secondary/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-secondary/20"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="group relative w-12 h-12 rounded-xl bg-gradient-to-br from-card to-card/80 hover:from-secondary/20 hover:to-blue-600/20 border border-border hover:border-secondary/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-secondary/20"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="group relative w-12 h-12 rounded-xl bg-gradient-to-br from-card to-card/80 hover:from-secondary/20 hover:to-accent/20 border border-border hover:border-secondary/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-secondary/20"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
                  </button>
                  <div className="w-full h-px bg-border my-1" />
                  <button
                    onClick={() => handleShare('copy')}
                    className="group relative w-12 h-12 rounded-xl bg-gradient-to-br from-card to-card/80 hover:from-secondary/20 hover:to-teal-600/20 border border-border hover:border-secondary/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-secondary/20"
                    aria-label="Copy link"
                  >
                    <LinkIcon className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
                  </button>
                </div>
              </div>

              {/* Article Content */}
              <article className="relative">
                {/* Content with Enhanced Typography */}
                <div className="prose prose-xl max-w-none
                  prose-headings:scroll-mt-24
                  prose-headings:font-black prose-headings:tracking-tight prose-headings:mb-6
                  prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 
                  prose-h2:pb-4 prose-h2:border-b prose-h2:border-border/50
                  prose-h2:bg-gradient-to-r prose-h2:from-secondary prose-h2:via-accent prose-h2:to-secondary 
                  prose-h2:bg-clip-text prose-h2:text-transparent
                  prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-foreground prose-h3:font-bold
                  prose-p:text-muted-foreground prose-p:leading-[1.8] prose-p:text-lg prose-p:mb-8
                  prose-p:first-of-type:text-xl prose-p:first-of-type:leading-[1.7] prose-p:first-of-type:text-foreground/90
                  prose-a:text-secondary prose-a:no-underline prose-a:font-semibold 
                  prose-a:border-b-2 prose-a:border-secondary/30 
                  hover:prose-a:text-accent hover:prose-a:border-accent/50 prose-a:transition-all
                  prose-strong:text-foreground prose-strong:font-bold
                  prose-code:text-secondary prose-code:bg-secondary/10 
                  prose-code:px-2 prose-code:py-1 prose-code:rounded-lg 
                  prose-code:font-mono prose-code:text-base prose-code:font-semibold
                  prose-code:border prose-code:border-secondary/20
                  prose-ul:my-8 prose-ul:space-y-3
                  prose-li:text-muted-foreground prose-li:text-lg prose-li:leading-relaxed
                  prose-li:pl-2 prose-li:marker:text-secondary prose-li:marker:text-xl
                  prose-blockquote:border-l-4 prose-blockquote:border-secondary 
                  prose-blockquote:pl-8 prose-blockquote:py-4 prose-blockquote:my-8
                  prose-blockquote:italic prose-blockquote:text-foreground/80
                  prose-blockquote:bg-secondary/5 prose-blockquote:rounded-r-2xl
                  prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-12
                ">
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>

                {/* Article Footer */}
                <div className="mt-20 pt-12 border-t-2 border-border/50">
                  {/* Tags */}
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">Tagged In</h3>
                    <div className="flex flex-wrap gap-3">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-secondary/10 via-accent/10 to-secondary/10 text-secondary text-sm font-bold border border-secondary/30 hover:border-secondary/60 hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                          #{tag.toLowerCase().replace(/\s+/g, '')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Share Section - Mobile/Tablet */}
                  <div className="xl:hidden">
                    <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">Share Article</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <button
                        onClick={() => handleShare('twitter')}
                        className="group px-5 py-4 rounded-2xl bg-gradient-to-br from-card to-card/80 hover:from-secondary/20 hover:to-sky-600/20 border border-border hover:border-secondary/50 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/20"
                      >
                        <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                        <span className="text-xs font-bold text-muted-foreground group-hover:text-secondary transition-colors">Twitter</span>
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="group px-5 py-4 rounded-2xl bg-gradient-to-br from-card to-card/80 hover:from-secondary/20 hover:to-blue-600/20 border border-border hover:border-secondary/50 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/20"
                      >
                        <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                        <span className="text-xs font-bold text-muted-foreground group-hover:text-secondary transition-colors">LinkedIn</span>
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="group px-5 py-4 rounded-2xl bg-gradient-to-br from-card to-card/80 hover:from-secondary/20 hover:to-accent/20 border border-border hover:border-secondary/50 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/20"
                      >
                        <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                        <span className="text-xs font-bold text-muted-foreground group-hover:text-secondary transition-colors">Facebook</span>
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="group px-5 py-4 rounded-2xl bg-gradient-to-br from-card to-card/80 hover:from-secondary/20 hover:to-teal-600/20 border border-border hover:border-secondary/50 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/20"
                      >
                        <LinkIcon className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                        <span className="text-xs font-bold text-muted-foreground group-hover:text-secondary transition-colors">Copy</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Mock data
const mockArticle: BlogArticle = {
  title: 'The Future of Precision Agriculture: AI and IoT Integration',
  slug: 'future-of-precision-agriculture',
  content: `
    <p>The agricultural industry is undergoing a revolutionary transformation, driven by the convergence of artificial intelligence (AI) and Internet of Things (IoT) technologies. This integration is enabling farmers to make data-driven decisions, optimize resource usage, and significantly increase crop yields while reducing environmental impact.</p>

    <h2 style="font-size: 3rem; color: #c4ad9d; font-weight: 900;">The Challenge</h2>
    <p>Today's farmers face unprecedented challenges: climate change, water scarcity, increasing global food demand, and the need for sustainable practices. Traditional farming methods are no longer sufficient to address these complex issues.</p>
    
    <p>The agricultural sector must produce 70% more food by 2050 to feed a growing global population, yet faces:</p>
    <ul>
      <li>Unpredictable weather patterns and extreme climate events</li>
      <li>Declining water resources and soil degradation</li>
      <li>Rising costs of fertilizers and pesticides</li>
      <li>Labor shortages and increasing operational expenses</li>
      <li>Pressure to reduce environmental impact while maintaining productivity</li>
    </ul>

    <hr style="border: none; height: 2px; background: linear-gradient(to right, transparent, rgba(196, 173, 157, 0.5), transparent); margin: 3rem 0;" />

    <h2 style="font-size: 3rem; color: #c4ad9d; font-weight: 900;">Our Solution</h2>
    <p>The combination of AI and IoT creates a powerful ecosystem for modern agriculture, enabling precision farming at scale:</p>

    <h3>1. Real-Time Monitoring</h3>
    <p>IoT sensors deployed across fields continuously collect data on soil moisture, temperature, humidity, and nutrient levels. This real-time information allows farmers to understand exactly what's happening in their fields at any given moment.</p>

    <h3>2. Predictive Analytics</h3>
    <p>AI algorithms analyze historical and real-time data to predict crop yields, identify potential pest infestations, and forecast optimal harvest times. Machine learning models can detect patterns that human observers might miss, enabling proactive rather than reactive farming.</p>

    <h3>3. Automated Irrigation</h3>
    <p>Smart irrigation systems use AI to determine the precise amount of water needed for each section of a field. By considering factors like soil type, crop variety, weather forecasts, and growth stage, these systems optimize water usage while improving crop health.</p>

    <hr style="border: none; height: 2px; background: linear-gradient(to right, transparent, rgba(196, 173, 157, 0.5), transparent); margin: 3rem 0;" />

    <h2 style="font-size: 3rem; color: #c4ad9d; font-weight: 900;">The Results</h2>
    <p>The impact of AI-powered precision agriculture is transforming farms worldwide. Farms implementing these solutions have reported measurable improvements across all key metrics:</p>
    <ul>
      <li><strong>25-30% increase in crop yields</strong> through optimized growing conditions</li>
      <li><strong>40% reduction in water consumption</strong> via smart irrigation systems</li>
      <li><strong>60% decrease in pesticide use</strong> with targeted application</li>
      <li><strong>30% reduction in operational costs</strong> through automation and efficiency</li>
      <li><strong>50% faster decision-making</strong> with real-time data insights</li>
    </ul>

    <p>Beyond the numbers, farmers report improved crop quality, reduced environmental impact, and the ability to scale operations sustainably. The technology pays for itself within the first growing season for most implementations.</p>

    <h2>The Road Ahead</h2>
    <p>As technology continues to evolve, we can expect even more sophisticated applications. Computer vision will enable drones to identify individual plants that need attention. Edge computing will allow for instant decision-making without relying on cloud connectivity. And blockchain technology will provide transparent supply chain tracking from farm to table.</p>

    <p>The future of agriculture is not just about producing more food—it's about producing it sustainably, efficiently, and intelligently. AI and IoT are the tools that will make this vision a reality.</p>
  `,
  featured_image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=675&fit=crop&q=80&fm=webp',
  tags: ['AI & Machine Learning', 'Agriculture', 'IoT'],
  reading_time: 8,
  published_at: '2024-01-15',
  author: {
    name: 'Dr. Sarah Chen',
    avatar: '',
    bio: 'Chief Executive Officer & AI Research Lead',
  },
};

export default BlogArticle;

