import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, BookOpen, Target, GraduationCap } from 'lucide-react';

const ProcessSteps = () => {
  const steps = [
    {
      icon: BookOpen,
      title: 'Take Quiz',
      description: 'Answer questions about your interests, skills, and career aspirations in just 5 minutes.',
      step: '01'
    },
    {
      icon: Target,
      title: 'Get Recommendations',
      description: 'Receive personalized degree and college suggestions based on your profile and preferences.',
      step: '02'
    },
    {
      icon: GraduationCap,
      title: 'Apply to Colleges',
      description: 'Get direct application links and guidance for your recommended government colleges.',
      step: '03'
    }
  ];

  return (
    <section className="py-24 px-6 md:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4 mr-2" />
            Simple 3-Step Process
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Your Path to Success
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From confusion to clarity in three simple steps. Join thousands of students 
            who found their perfect academic path.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-8 h-full hover:shadow-card transition-all duration-300 border-border/50">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-display font-bold text-primary">
                    {step.step}
                  </div>
                </div>
                
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 -right-4 z-10">
                  <ArrowRight className="w-8 h-8 text-primary/30" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" className="group shadow-button" asChild>
            <a href="/quiz">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Free quiz • No registration required • Instant results
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;