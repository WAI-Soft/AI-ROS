import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import SectionContainer from '@/components/shared/SectionContainer';
import TeamMemberCard, { TeamMember } from './TeamMemberCard';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { api } from '@/lib/api';

const LeadershipTeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const data = await api.get<TeamMember[]>('/team');
        // Sort by order field
        const sortedData = data.sort((a, b) => a.order - b.order);
        setTeamMembers(sortedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError('Unable to load team members. Please try again later.');
        // Use mock data for development
        setTeamMembers(mockTeamMembers);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <SectionContainer background="default">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-secondary bg-secondary/10 rounded-full border border-secondary/30 backdrop-blur-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <Users className="w-4 h-4" />
            Leadership Team
          </div>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Meet Our Leaders
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Visionary experts driving innovation and excellence in AI and automation
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border animate-pulse"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-muted" />
                <div className="h-6 bg-muted rounded mb-2" />
                <div className="h-4 bg-muted rounded w-2/3 mx-auto" />
              </div>
            ))}
          </div>
        )}

        {/* Team Grid */}
        {!loading && teamMembers.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={index * 100}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && teamMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No team members found.</p>
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

// Mock data for development/fallback
const mockTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    title: 'Chief Executive Officer',
    bio: 'Dr. Sarah Chen is a visionary leader with over 20 years of experience in artificial intelligence and robotics. She holds a Ph.D. in Computer Science from MIT and has led groundbreaking research in machine learning applications for industrial automation. Under her leadership, AI-ROS has grown from a startup to an industry leader, completing over 50 successful projects worldwide.',
    avatar: '',
    linkedin_url: 'https://linkedin.com',
    twitter_url: 'https://twitter.com',
    order: 1,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    title: 'Chief Technology Officer',
    bio: 'Michael Rodriguez brings 15 years of expertise in robotics and IoT systems. He previously worked at leading tech companies, developing autonomous systems and smart sensors. At AI-ROS, Michael oversees all technical development and ensures our solutions remain at the cutting edge of technology.',
    avatar: '',
    linkedin_url: 'https://linkedin.com',
    order: 2,
  },
  {
    id: 3,
    name: 'Dr. Aisha Patel',
    title: 'Head of AI Research',
    bio: 'Dr. Aisha Patel leads our AI research initiatives, focusing on computer vision, natural language processing, and predictive analytics. With a Ph.D. from Stanford and numerous published papers, she drives innovation in our AI algorithms and ensures we stay ahead of industry trends.',
    avatar: '',
    linkedin_url: 'https://linkedin.com',
    twitter_url: 'https://twitter.com',
    order: 3,
  },
  {
    id: 4,
    name: 'James Thompson',
    title: 'VP of Operations',
    bio: 'James Thompson manages our global operations, ensuring seamless project delivery and client satisfaction. With an MBA from Harvard and experience in supply chain optimization, he has streamlined our processes to achieve 99.9% uptime and exceptional client retention rates.',
    avatar: '',
    linkedin_url: 'https://linkedin.com',
    order: 4,
  },
];

export default LeadershipTeamSection;
