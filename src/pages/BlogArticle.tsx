import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Calendar, Clock, User, ArrowLeft, Share2, Twitter, Linkedin, Facebook, Link as LinkIcon } from 'lucide-react';
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
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Article Hero */}
        <section className="relative py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link to="/blog" className="inline-block mb-8">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(article.published_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{article.reading_time} min read</span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pb-8 border-b border-border">
                <img
                  src={article.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author.name)}&size=64&background=0ea5e9&color=fff`}
                  alt={article.author.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <div className="font-semibold text-foreground text-lg">{article.author.name}</div>
                  {article.author.bio && (
                    <div className="text-sm text-muted-foreground">{article.author.bio}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto -mt-8">
              <img
                src={article.featured_image}
                alt={article.title}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-12">
                {/* Share Bar - Desktop */}
                <div className="hidden lg:block sticky top-24 h-fit">
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-12 h-12 rounded-lg bg-muted hover:bg-secondary/20 flex items-center justify-center transition-colors group"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-12 h-12 rounded-lg bg-muted hover:bg-secondary/20 flex items-center justify-center transition-colors group"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-12 h-12 rounded-lg bg-muted hover:bg-secondary/20 flex items-center justify-center transition-colors group"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-12 h-12 rounded-lg bg-muted hover:bg-secondary/20 flex items-center justify-center transition-colors group"
                      aria-label="Copy link"
                    >
                      <LinkIcon className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-secondary prose-strong:text-foreground prose-code:text-secondary">
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
              </div>

              {/* Share Bar - Mobile */}
              <div className="lg:hidden mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Share this article</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex-1 px-4 py-3 rounded-lg bg-muted hover:bg-secondary/20 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                    <span className="text-sm font-medium">Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex-1 px-4 py-3 rounded-lg bg-muted hover:bg-secondary/20 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="flex-1 px-4 py-3 rounded-lg bg-muted hover:bg-secondary/20 flex items-center justify-center gap-2 transition-colors"
                  >
                    <LinkIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">Copy</span>
                  </button>
                </div>
              </div>
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

    <h2>The Challenge of Modern Agriculture</h2>
    <p>Today's farmers face unprecedented challenges: climate change, water scarcity, increasing global food demand, and the need for sustainable practices. Traditional farming methods are no longer sufficient to address these complex issues. The solution lies in precision agriculture—a farming management concept that uses technology to observe, measure, and respond to variability in crops.</p>

    <h2>How AI and IoT Are Transforming Farming</h2>
    <p>The combination of AI and IoT creates a powerful ecosystem for modern agriculture:</p>

    <h3>1. Real-Time Monitoring</h3>
    <p>IoT sensors deployed across fields continuously collect data on soil moisture, temperature, humidity, and nutrient levels. This real-time information allows farmers to understand exactly what's happening in their fields at any given moment.</p>

    <h3>2. Predictive Analytics</h3>
    <p>AI algorithms analyze historical and real-time data to predict crop yields, identify potential pest infestations, and forecast optimal harvest times. Machine learning models can detect patterns that human observers might miss, enabling proactive rather than reactive farming.</p>

    <h3>3. Automated Irrigation</h3>
    <p>Smart irrigation systems use AI to determine the precise amount of water needed for each section of a field. By considering factors like soil type, crop variety, weather forecasts, and growth stage, these systems can reduce water usage by up to 40% while improving crop health.</p>

    <h2>Real-World Impact</h2>
    <p>The results speak for themselves. Farms implementing AI-powered precision agriculture solutions have reported:</p>
    <ul>
      <li>25-30% increase in crop yields</li>
      <li>40% reduction in water consumption</li>
      <li>60% decrease in pesticide use</li>
      <li>30% reduction in operational costs</li>
    </ul>

    <h2>The Road Ahead</h2>
    <p>As technology continues to evolve, we can expect even more sophisticated applications. Computer vision will enable drones to identify individual plants that need attention. Edge computing will allow for instant decision-making without relying on cloud connectivity. And blockchain technology will provide transparent supply chain tracking from farm to table.</p>

    <p>The future of agriculture is not just about producing more food—it's about producing it sustainably, efficiently, and intelligently. AI and IoT are the tools that will make this vision a reality.</p>
  `,
  featured_image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=675&fit=crop',
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

