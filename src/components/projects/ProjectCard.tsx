import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCard from '@/components/shared/AnimatedCard';

export interface Project {
  slug: string;
  title: string;
  excerpt: string;
  banner_image_url: string;
  categories: string[];
  year: number;
  location?: string;
}

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

const ProjectCard = ({ project, delay = 0 }: ProjectCardProps) => {
  return (
    <Link to={`/projects/${project.slug}`}>
      <AnimatedCard
        hoverEffect="lift"
        animateOnScroll={true}
        delay={delay}
        className="h-full overflow-hidden cursor-pointer"
      >
        {/* Image Banner */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={project.banner_image_url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210,40%,8%)]/90 via-[hsl(210,40%,8%)]/40 to-transparent" />
          
          {/* Category Badge */}
          {project.categories[0] && (
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-secondary/90 backdrop-blur-sm text-white text-xs font-semibold shadow-lg">
              {project.categories[0]}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors line-clamp-2">
            {project.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {project.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{project.year}</span>
            </div>
            {project.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{project.location}</span>
              </div>
            )}
          </div>

          {/* Read More */}
          <div className="flex items-center gap-2 text-secondary font-semibold group-hover:gap-3 transition-all">
            <span>Read More</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </AnimatedCard>
    </Link>
  );
};

export default ProjectCard;
