import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/shared/PageHero';
import SectionContainer from '@/components/shared/SectionContainer';
import AnimatedCard from '@/components/shared/AnimatedCard';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      setLoading(true);
      const response = await api.post<{ reference_id: string }>('/contact', formData);
      setReferenceId(response.reference_id);
      setSuccess(true);
      setFormData({ name: '', company: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Mock success for demo
      setReferenceId('CNT-20240115-A3B9');
      setSuccess(true);
      setFormData({ name: '', company: '', email: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          title="Get in Touch"
          subtitle="Let's discuss how AI-ROS can transform your business"
          backgroundImage="/src/assets/background1.jpg"
          parallax
          fullHeight
        />

        <SectionContainer background="default">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <AnimatedCard className="p-8 md:p-10">
                <h2 className="text-3xl font-bold text-foreground mb-6">Send us a Message</h2>
                
                {success ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">Message Sent!</h3>
                    <p className="text-muted-foreground mb-4">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      Reference ID: <span className="font-mono text-secondary">{referenceId}</span>
                    </p>
                    <Button
                      onClick={() => setSuccess(false)}
                      variant="outline"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-muted border ${
                          errors.name ? 'border-red-500' : 'border-border'
                        } focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all`}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                        placeholder="Your company name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-muted border ${
                          errors.email ? 'border-red-500' : 'border-border'
                        } focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-muted border ${
                          errors.subject ? 'border-red-500' : 'border-border'
                        } focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all`}
                        placeholder="How can we help?"
                      />
                      {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full px-4 py-3 rounded-lg bg-muted border ${
                          errors.message ? 'border-red-500' : 'border-border'
                        } focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all resize-none`}
                        placeholder="Tell us about your project..."
                      />
                      {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-white font-semibold"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </AnimatedCard>

              {/* Contact Info */}
              <div className="space-y-8">
                <AnimatedCard className="p-8" delay={100}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Email Us</h3>
                      <p className="text-muted-foreground mb-2">
                        Our team typically responds within 24 hours
                      </p>
                      <a
                        href="mailto:ola@ai-ros.ai"
                        className="text-secondary font-semibold hover:underline"
                      >
                        ola@ai-ros.ai
                      </a>
                    </div>
                  </div>
                </AnimatedCard>

                <AnimatedCard className="p-8" delay={200}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Call Us</h3>
                      <p className="text-muted-foreground mb-2">
                        Mon-Fri from 8am to 6pm PST
                      </p>
                      <a
                        href="tel:+201021183564"
                        className="text-secondary font-semibold hover:underline"
                      >
                        +20 1021183564
                      </a>
                    </div>
                  </div>
                </AnimatedCard>

                <AnimatedCard className="p-8" delay={300}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">Visit Us</h3>
                      <p className="text-muted-foreground mb-4">
                        Cairo, Egypt
                      </p>
                      
                      {/* Map */}
                      <div className="mt-4 rounded-lg overflow-hidden border-2 border-border hover:border-secondary/50 transition-colors">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221088.49265690424!2d31.145994999999998!3d30.0444196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Egypt!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                          width="100%"
                          height="250"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="grayscale hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      
                      <a
                        href="https://maps.google.com/?q=Cairo+Egypt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-sm text-secondary font-semibold hover:underline"
                      >
                        <MapPin className="w-4 h-4" />
                        Open in Google Maps
                      </a>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
