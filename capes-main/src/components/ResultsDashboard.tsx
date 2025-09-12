import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  BookOpen, 
  Microscope, 
  Calculator, 
  Palette, 
  MapPin, 
  Star,
  Plus,
  ArrowRight,
  Award,
  Building2
} from 'lucide-react';

interface DegreeProgram {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  matchPercentage: number;
  duration: string;
}

interface College {
  id: string;
  name: string;
  distance: string;
  rating: number;
  type: 'Government' | 'Aided';
  established: string;
}

const ResultsDashboard = () => {
  // Mock data - in real app this would come from API/props
  const recommendedStream = "Science";
  const matchPercentage = 92;
  
  const degreePrograms: DegreeProgram[] = [
    {
      id: '1',
      name: 'Computer Science Engineering',
      description: 'Build software, websites, and mobile applications. High demand in tech industry.',
      icon: Calculator,
      matchPercentage: 95,
      duration: '4 years'
    },
    {
      id: '2',
      name: 'Biotechnology',
      description: 'Combine biology with technology for medical and agricultural innovations.',
      icon: Microscope,
      matchPercentage: 89,
      duration: '4 years'
    },
    {
      id: '3',
      name: 'Applied Mathematics',
      description: 'Use mathematical principles to solve real-world problems in various industries.',
      icon: BookOpen,
      matchPercentage: 87,
      duration: '3 years'
    }
  ];

  const nearbyColleges: College[] = [
    {
      id: '1',
      name: 'Government Engineering College',
      distance: '2.5 km',
      rating: 4.6,
      type: 'Government',
      established: '1985'
    },
    {
      id: '2',
      name: 'State University of Technology',
      distance: '4.2 km',
      rating: 4.4,
      type: 'Government',
      established: '1972'
    },
    {
      id: '3',
      name: 'Regional Technical Institute',
      distance: '6.8 km',
      rating: 4.2,
      type: 'Aided',
      established: '1990'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Award className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-display font-bold text-foreground">
              Your Results
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on your responses, we've identified the best academic path for your interests and aptitudes.
          </p>
        </div>

        {/* Recommended Stream Highlight */}
        <div className="mb-12">
          <Card className="relative overflow-hidden shadow-card bg-gradient-hero text-white border-0">
            <CardHeader className="text-center pb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 mx-auto">
                <GraduationCap className="w-10 h-10" />
              </div>
              <CardTitle className="text-3xl font-display font-bold mb-2">
                Recommended Stream: {recommendedStream}
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">
                {matchPercentage}% compatibility match based on your assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-white/80 text-sm">Career Options</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">₹8-25L</div>
                  <div className="text-white/80 text-sm">Starting Salary</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-white/80 text-sm">Placement Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Degree Programs */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Recommended Degree Programs
              </h2>
            </div>
            
            <div className="space-y-6">
              {degreePrograms.map((program, index) => {
                const IconComponent = program.icon;
                return (
                  <Card key={program.id} className="shadow-soft hover:shadow-card transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl text-foreground">
                              {program.name}
                            </CardTitle>
                            <div className="flex items-center gap-3 mt-1">
                              <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground">
                                {program.matchPercentage}% match
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {program.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            #{index + 1}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base mb-4 leading-relaxed">
                        {program.description}
                      </CardDescription>
                      <Button variant="outline" className="group">
                        View Career Paths
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right Column - Nearby Colleges */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Nearby Colleges
              </h2>
            </div>
            
            <div className="space-y-4">
              {nearbyColleges.map((college) => (
                <Card key={college.id} className="shadow-soft hover:shadow-card transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-foreground leading-tight">
                          {college.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {college.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Est. {college.established}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {college.distance} away
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">
                            {college.rating}
                          </span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Shortlist
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Card */}
            <Card className="mt-6 bg-accent/30 border-accent shadow-soft">
              <CardContent className="p-6 text-center">
                <Palette className="w-8 h-8 text-accent-foreground mx-auto mb-3" />
                <h3 className="font-semibold text-accent-foreground mb-2">
                  Need More Options?
                </h3>
                <p className="text-sm text-accent-foreground/80 mb-4">
                  Explore more colleges and programs in your area
                </p>
                <Button variant="outline" size="sm" className="border-accent-foreground/20">
                  View All Colleges
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;