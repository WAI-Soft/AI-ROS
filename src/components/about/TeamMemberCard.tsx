import { useState } from 'react';
import { Linkedin, Twitter, X } from 'lucide-react';
import AnimatedCard from '@/components/shared/AnimatedCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  linkedin_url?: string;
  twitter_url?: string;
  order: number;
}

interface TeamMemberCardProps {
  member: TeamMember;
  delay?: number;
}

const TeamMemberCard = ({ member, delay = 0 }: TeamMemberCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <>
      <AnimatedCard
        hoverEffect="lift"
        animateOnScroll={true}
        delay={delay}
        className="p-6 cursor-pointer"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative">
          {/* Front Side */}
          <div
            className={`transition-all duration-500 ${
              isFlipped ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {/* Avatar with Gradient Border */}
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary to-accent p-1">
                <div className="w-full h-full rounded-full bg-card overflow-hidden">
                  <img
                    src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=128&background=0ea5e9&color=fff`}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary/30 to-accent/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-secondary transition-colors">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-secondary mb-3">{member.title}</p>

              {/* Social Links */}
              {(member.linkedin_url || member.twitter_url) && (
                <div className="flex items-center justify-center gap-2">
                  {member.linkedin_url && (
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 rounded-lg bg-muted hover:bg-secondary/20 flex items-center justify-center transition-colors group/icon"
                    >
                      <Linkedin className="w-4 h-4 text-muted-foreground group-hover/icon:text-secondary transition-colors" />
                    </a>
                  )}
                  {member.twitter_url && (
                    <a
                      href={member.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 rounded-lg bg-muted hover:bg-secondary/20 flex items-center justify-center transition-colors group/icon"
                    >
                      <Twitter className="w-4 h-4 text-muted-foreground group-hover/icon:text-secondary transition-colors" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Back Side (Hover Preview) */}
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              isFlipped ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <div className="h-full flex flex-col items-center justify-center p-4">
              <p className="text-sm text-muted-foreground text-center line-clamp-6 mb-4">
                {member.bio}
              </p>
              <span className="text-xs text-secondary font-medium">Click to read more</span>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Full Bio Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary to-accent p-1">
                  <div className="w-full h-full rounded-full bg-card overflow-hidden">
                    <img
                      src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=64&background=0ea5e9&color=fff`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{member.name}</h3>
                <p className="text-sm font-medium text-secondary">{member.title}</p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {member.bio}
            </p>

            {/* Social Links in Modal */}
            {(member.linkedin_url || member.twitter_url) && (
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                <span className="text-sm text-muted-foreground">Connect:</span>
                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-secondary/20 transition-colors group"
                  >
                    <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
                    <span className="text-sm font-medium text-foreground group-hover:text-secondary transition-colors">
                      LinkedIn
                    </span>
                  </a>
                )}
                {member.twitter_url && (
                  <a
                    href={member.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-secondary/20 transition-colors group"
                  >
                    <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
                    <span className="text-sm font-medium text-foreground group-hover:text-secondary transition-colors">
                      Twitter
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TeamMemberCard;
