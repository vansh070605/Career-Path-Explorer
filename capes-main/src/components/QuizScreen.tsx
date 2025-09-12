import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
  id: number;
  type: 'multiple-choice' | 'likert';
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'Which subject interests you the most?',
    options: ['Mathematics & Logic', 'Science & Technology', 'Arts & Literature', 'Business & Economics', 'Social Sciences']
  },
  {
    id: 2,
    type: 'likert',
    question: 'I enjoy solving complex mathematical problems',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 3,
    type: 'multiple-choice',
    question: 'What type of work environment do you prefer?',
    options: ['Office/Corporate', 'Laboratory/Research', 'Creative Studio', 'Outdoor/Field Work', 'Home/Remote']
  },
  {
    id: 4,
    type: 'likert',
    question: 'I prefer working with people rather than working alone',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 5,
    type: 'multiple-choice',
    question: 'Which career path appeals to you most?',
    options: ['Engineering & Technology', 'Medical & Healthcare', 'Business & Management', 'Arts & Design', 'Education & Research']
  },
  {
    id: 6,
    type: 'likert',
    question: 'I am comfortable with technology and digital tools',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 7,
    type: 'multiple-choice',
    question: 'What motivates you the most in your studies?',
    options: ['Achieving high grades', 'Learning new concepts', 'Solving real-world problems', 'Creative expression', 'Helping others']
  },
  {
    id: 8,
    type: 'likert',
    question: 'I enjoy leading group projects and activities',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 9,
    type: 'multiple-choice',
    question: 'Which skill would you like to develop further?',
    options: ['Analytical thinking', 'Communication', 'Creativity', 'Technical skills', 'Leadership']
  },
  {
    id: 10,
    type: 'likert',
    question: 'I prefer structured, predictable tasks over spontaneous ones',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  }
];

const QuizScreen = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleting, setIsCompleting] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Quiz completion
      setIsCompleting(true);
      // Simulate processing time
      setTimeout(() => {
        navigate('/results');
      }, 3000);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const isAnswered = answers[currentQ.id] !== undefined;
  const canGoNext = isAnswered;

  if (isCompleting) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-6">
        <Card className="p-12 text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
            Analyzing Your Responses
          </h2>
          <p className="text-muted-foreground mb-6">
            We're processing your answers to find the perfect degree and college matches for you.
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header with Progress */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-display font-semibold text-foreground">
              Aptitude & Interest Assessment
            </h1>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-8 shadow-card">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {currentQuestion + 1}
              </div>
              <span className="text-sm font-medium text-primary capitalize">
                {currentQ.type.replace('-', ' ')} Question
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground leading-tight">
              {currentQ.question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={cn(
                  "w-full p-6 rounded-lg border-2 text-left transition-all duration-200 group",
                  "hover:border-primary/50 hover:bg-accent/50",
                  answers[currentQ.id] === option
                    ? "border-primary bg-accent text-accent-foreground"
                    : "border-border bg-card"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {currentQ.type === 'likert' && (
                      <div className={cn(
                        "w-6 h-6 rounded-full border-2 transition-colors",
                        answers[currentQ.id] === option
                          ? "border-primary bg-primary"
                          : "border-muted-foreground/30"
                      )}>
                        {answers[currentQ.id] === option && (
                          <CheckCircle className="w-6 h-6 text-white" />
                        )}
                      </div>
                    )}
                    {currentQ.type === 'multiple-choice' && (
                      <div className={cn(
                        "w-6 h-6 rounded-md border-2 transition-colors",
                        answers[currentQ.id] === option
                          ? "border-primary bg-primary"
                          : "border-muted-foreground/30"
                      )}>
                        {answers[currentQ.id] === option && (
                          <CheckCircle className="w-6 h-6 text-white" />
                        )}
                      </div>
                    )}
                    <span className="font-medium text-base md:text-lg">
                      {option}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index <= currentQuestion ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>

          <Button
            variant="hero"
            onClick={handleNext}
            disabled={!canGoNext}
            className="flex items-center gap-2"
          >
            {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;