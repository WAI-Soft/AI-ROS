import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/shared/PageHero';
import ArticleCard, { Article } from '@/components/blog/ArticleCard';
import { Button } from '@/components/ui/button';
import { FolderOpen, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(searchParams.get('tag'));

  const tags = ['AI & Machine Learning', 'IoT', 'Smart Cities', 'Agriculture', 'Industry 4.0', 'Sustainability'];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const params: any = {};
        if (selectedTag) params.tag = selectedTag;
        
        const data = await api.get<Article[]>('/posts', { params });
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles(mockArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedTag]);

  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag);
    if (tag) {
      setSearchParams({ tag });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          title="Insights & Articles"
          subtitle="Thought leadership and industry insights from our team of experts"
          backgroundImage="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&h=1080&fit=crop"
          parallax
          fullHeight
        />

        {/* Topic Filters */}
        <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                onClick={() => handleTagClick(null)}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all',
                  !selectedTag
                    ? 'bg-secondary text-white shadow-lg shadow-secondary/30'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                )}
              >
                All Topics
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all',
                    selectedTag === tag
                      ? 'bg-secondary text-white shadow-lg shadow-secondary/30'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="rounded-3xl bg-card/80 backdrop-blur-sm border border-border animate-pulse overflow-hidden"
                  >
                    <div className="h-56 bg-muted" />
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-20">
                <FolderOpen className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-50" />
                <h3 className="text-2xl font-bold text-foreground mb-3">No Articles Found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Try selecting a different topic to find what you're looking for.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, index) => (
                  <ArticleCard key={article.slug} article={article} delay={index * 100} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Mock data
const mockArticles: Article[] = [
  {
    slug: 'future-of-precision-agriculture',
    title: 'The Future of Precision Agriculture: AI and IoT Integration',
    excerpt: 'Explore how artificial intelligence and IoT sensors are revolutionizing modern farming practices and enabling sustainable agriculture at scale.',
    featured_image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
    tags: ['AI & Machine Learning', 'Agriculture', 'IoT'],
    reading_time: 8,
    published_at: '2024-01-15',
    author: {
      name: 'Dr. Sarah Chen',
      avatar: '',
    },
  },
  {
    slug: 'smart-cities-sustainability',
    title: 'Building Sustainable Smart Cities: Lessons from Global Leaders',
    excerpt: 'Discover how cities worldwide are leveraging technology to reduce carbon emissions, optimize resources, and improve quality of life for residents.',
    featured_image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop',
    tags: ['Smart Cities', 'Sustainability'],
    reading_time: 10,
    published_at: '2024-01-10',
    author: {
      name: 'Michael Rodriguez',
      avatar: '',
    },
  },
  {
    slug: 'industrial-automation-trends-2024',
    title: '2024 Industrial Automation Trends: What Manufacturers Need to Know',
    excerpt: 'Stay ahead of the curve with insights into the latest automation technologies transforming manufacturing and production processes.',
    featured_image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    tags: ['Industry 4.0', 'AI & Machine Learning'],
    reading_time: 7,
    published_at: '2024-01-05',
    author: {
      name: 'Dr. Aisha Patel',
      avatar: '',
    },
  },
  {
    slug: 'iot-sensors-agriculture',
    title: 'How IoT Sensors Are Transforming Water Management in Agriculture',
    excerpt: 'Learn about the latest IoT sensor technologies helping farmers optimize irrigation and conserve water resources.',
    featured_image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop',
    tags: ['IoT', 'Agriculture', 'Sustainability'],
    reading_time: 6,
    published_at: '2023-12-28',
    author: {
      name: 'James Thompson',
      avatar: '',
    },
  },
  {
    slug: 'predictive-maintenance-roi',
    title: 'The ROI of Predictive Maintenance: Real-World Case Studies',
    excerpt: 'Examine concrete examples of how predictive maintenance systems deliver measurable returns on investment for industrial operations.',
    featured_image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=600&fit=crop',
    tags: ['Industry 4.0', 'AI & Machine Learning'],
    reading_time: 9,
    published_at: '2023-12-20',
    author: {
      name: 'Dr. Sarah Chen',
      avatar: '',
    },
  },
  {
    slug: 'smart-grid-renewable-energy',
    title: 'Smart Grids and Renewable Energy: The Perfect Partnership',
    excerpt: 'Understand how intelligent energy distribution systems are enabling the integration of renewable energy sources at scale.',
    featured_image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop',
    tags: ['Smart Cities', 'Sustainability'],
    reading_time: 8,
    published_at: '2023-12-15',
    author: {
      name: 'Michael Rodriguez',
      avatar: '',
    },
  },
];

export default Blog;

