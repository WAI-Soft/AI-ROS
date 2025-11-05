import { Loader2, FolderOpen } from 'lucide-react';
import ProjectCard, { Project } from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  loading: boolean;
}

const ProjectGrid = ({ projects, loading }: ProjectGridProps) => {
  if (loading) {
    return (
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
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <FolderOpen className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-50" />
        <h3 className="text-2xl font-bold text-foreground mb-3">No Projects Found</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Try adjusting your filters or search query to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} delay={index * 100} />
      ))}
    </div>
  );
};

export default ProjectGrid;
