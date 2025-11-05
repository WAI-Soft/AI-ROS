import { Building2, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import AnimatedCard from '@/components/shared/AnimatedCard';

interface QuickFactsProps {
  client?: string;
  year: number;
  location?: string;
  metrics: Record<string, string | number>;
}

const QuickFacts = ({ client, year, location, metrics }: QuickFactsProps) => {
  return (
    <AnimatedCard className="p-8 sticky top-24">
      <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-secondary" />
        Quick Facts
      </h3>

      <div className="space-y-6">
        {/* Client */}
        {client && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Client</div>
              <div className="font-semibold text-foreground">{client}</div>
            </div>
          </div>
        )}

        {/* Year */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Year</div>
            <div className="font-semibold text-foreground">{year}</div>
          </div>
        </div>

        {/* Location */}
        {location && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Location</div>
              <div className="font-semibold text-foreground">{location}</div>
            </div>
          </div>
        )}

        {/* Metrics */}
        {Object.keys(metrics).length > 0 && (
          <>
            <div className="border-t border-border pt-6">
              <h4 className="text-lg font-bold text-foreground mb-4">Key Metrics</h4>
              <div className="space-y-4">
                {Object.entries(metrics).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-sm text-muted-foreground mb-1 capitalize">
                      {key.replace(/_/g, ' ')}
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AnimatedCard>
  );
};

export default QuickFacts;
