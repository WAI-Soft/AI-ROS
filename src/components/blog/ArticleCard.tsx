import { Clock, Calendar, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCard from '@/components/shared/AnimatedCard';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  featured_image: string;
  tags: string[];
  reading_time: number;
  published_at: string;
  author: {
    name: string;
    avatar: string;
  };
}

interface ArticleCardProps {
  article: Article;
  delay?: number;
}

const ArticleCard = ({ article, delay = 0 }: ArticleCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Link to={`/blog/${article.slug}`}>
      <AnimatedCard
        hoverEffect="lift"
        animateOnScroll={true}
        delay={delay}
        className="h-full overflow-hidden cursor-pointer"
      >
        {/* Featured Image */}
        <div className="relative h-56 overflow-hidden bg-muted">
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23374151" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="20"%3EImage%3C/text%3E%3C/svg%3E';
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210,40%,8%)]/90 via-[hsl(210,40%,8%)]/40 to-transparent" />
          
          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {article.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-secondary/90 backdrop-blur-sm text-white text-xs font-semibold shadow-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.published_at)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{article.reading_time} min read</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {article.excerpt}
          </p>

          {/* Author */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author.name)}&size=32&background=0ea5e9&color=fff`}
                alt={article.author.name}
                className="w-8 h-8 rounded-full bg-muted"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const initial = article.author.name.charAt(0).toUpperCase();
                  e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32"%3E%3Ccircle fill="%230ea5e9" cx="16" cy="16" r="16"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-size="14" font-weight="bold"%3E${initial}%3C/text%3E%3C/svg%3E`;
                }}
              />
              <span className="text-sm font-medium text-foreground">{article.author.name}</span>
            </div>

            {/* Read More */}
            <div className="flex items-center gap-2 text-secondary font-semibold group-hover:gap-3 transition-all">
              <span className="text-sm">Read</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </AnimatedCard>
    </Link>
  );
};

export default ArticleCard;
