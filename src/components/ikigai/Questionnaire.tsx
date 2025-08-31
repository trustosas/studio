
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Loader, Sparkles } from 'lucide-react';
import { allQuestions, promptsData } from './data';
import type { IkigaiResponses } from '@/app/page';

interface QuestionnaireProps {
  responses: IkigaiResponses;
  onResponseChange: (questionIndex: number, value: string) => void;
  onAnalyze: () => Promise<void>;
  isAnalyzing: boolean;
}

export function Questionnaire({ responses, onResponseChange, onAnalyze, isAnalyzing }: QuestionnaireProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const progress = useMemo(() => ((currentStep + 1) / allQuestions.length) * 100, [currentStep]);

    const handleNext = () => {
        if (currentStep < allQuestions.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    
    const currentPromptData = allQuestions[currentStep];
    const CurrentIcon = currentPromptData.icon;
    const currentCategoryIndex = promptsData.findIndex(p => p.key === currentPromptData.key);

    return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2">Ikigai Navigator</h1>
          <p className="text-muted-foreground text-lg">A guided journal to help you find your purpose.</p>
        </header>

        <div className="mb-6">
          <Progress value={progress} className="w-full h-3 transition-all duration-500" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            {promptsData.map((p, index) => (
                <div key={p.key} className={`flex items-center gap-1 ${index <= currentCategoryIndex ? 'font-bold text-foreground' : ''}`}>
                    <p.icon className={`w-4 h-4 ${index <= currentCategoryIndex ? 'text-accent' : ''}`} />
                    <span>{p.title}</span>
                </div>
            ))}
          </div>
        </div>

        <Card className="shadow-lg transition-all duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <CurrentIcon className="w-8 h-8 text-accent" />
              {currentPromptData.title}
            </CardTitle>
            <CardDescription>
              {currentPromptData.question}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={responses[`q${currentStep}`] || ''}
              onChange={(e) => onResponseChange(currentStep, e.target.value)}
              placeholder="Let your thoughts flow..."
              className="min-h-[250px] text-base resize-y"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handlePrev} disabled={currentStep === 0} variant="outline">
              <ArrowLeft className="mr-2" /> Previous
            </Button>
            {currentStep < allQuestions.length - 1 ? (
              <Button onClick={handleNext}>
                Next <ArrowRight className="ml-2" />
              </Button>
            ) : (
              <Button onClick={onAnalyze} disabled={isAnalyzing} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {isAnalyzing ? (
                  <>
                    <Loader className="mr-2 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2" /> Find my Ikigai
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
        
        <footer className="text-center mt-8 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Ikigai Navigator. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
    );
}
