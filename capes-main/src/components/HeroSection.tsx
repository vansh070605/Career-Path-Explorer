import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 md:p-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-display font-semibold text-foreground">
            DigitalPath
          </h1>
        </div>
        <LanguageSwitcher />
      </header>

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-accent rounded-full text-accent-foreground text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Trusted by 50,000+ Students
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Degree & College
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Get personalized recommendations for degrees and government colleges 
            based on your interests, skills, and career goals. Start your journey today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="group" asChild>
              <a href="/quiz">
                Start Your Quiz
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <Button variant="outline" size="lg" className="text-muted-foreground hover:text-foreground">
              Learn More
            </Button>
          </div>
          
          <div className="mt-12 text-sm text-muted-foreground">
            ⭐ 4.8/5 rating from 10,000+ students • 🎓 500+ college partnerships
          </div>
        </div>
      </div>

      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50 -z-10" />
    </section>
  );
};

export default HeroSection;