import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is AIROS only for agriculture?',
      answer: 'No. While agri-tech is a core focus, our platforms serve any sector needing AI for sustainability, education, policy, or automation.',
    },
    {
      question: 'Do you offer custom solutions?',
      answer: 'Yes. We specialize in building tailored AI systems that match your operational needs and goals.',
    },
    {
      question: 'What makes you different?',
      answer: 'Our products are born from R&D, grounded in sustainability, and designed with human impact in mind.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 animate-gradient-shift" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--primary)) 2px, transparent 2px), radial-gradient(circle at 80% 50%, hsl(var(--secondary)) 2px, transparent 2px)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px',
        }} />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-primary bg-primary/10 rounded-full border border-primary/30 backdrop-blur-sm">
            <HelpCircle className="w-4 h-4" />
            Got Questions?
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text">
            FAQs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about AIROS
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-card/80 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 flex items-center justify-between text-left relative z-10"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                    openIndex === index
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                  )}>
                    Q{index + 1}
                  </div>
                  <span className={cn(
                    "text-lg font-semibold transition-colors duration-300",
                    openIndex === index ? "text-primary" : "text-foreground group-hover:text-primary"
                  )}>
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-muted-foreground transition-all duration-300 flex-shrink-0 ml-4",
                    openIndex === index && "rotate-180 text-primary"
                  )}
                />
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 relative z-10",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <div className="px-6 pb-6 pl-[4.5rem]">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Still have questions? We're here to help!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-secondary to-accent text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
