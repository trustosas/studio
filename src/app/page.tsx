
'use client';

import { useState, useEffect } from 'react';
import { Questionnaire } from '@/components/ikigai/Questionnaire';
import { AnalysisReport } from '@/components/ikigai/AnalysisReport';
import { analyzeIkigaiIntersections, type AnalyzeIkigaiIntersectionsOutput } from '@/ai/flows/analyze-ikigai-intersections';
import { useToast } from "@/hooks/use-toast";
import { Loader } from 'lucide-react';
import { allQuestions } from '@/components/ikigai/data';

export type IkigaiResponses = {
  [key: string]: string;
};

export default function Home() {
  const [responses, setResponses] = useState<IkigaiResponses>({});
  const [analysis, setAnalysis] = useState<AnalyzeIkigaiIntersectionsOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    try {
      const savedResponses: IkigaiResponses = {};
      allQuestions.forEach((q, index) => {
        savedResponses[`q${index}`] = localStorage.getItem(`ikigai-q${index}`) || '';
      });
      setResponses(savedResponses);
    } catch (error) { console.error("Failed to load from localStorage", error); }
  }, []);

  const handleResponseChange = (questionIndex: number, value: string) => {
    const questionKey = `q${questionIndex}`;
    const newResponses = { ...responses, [questionKey]: value };
    setResponses(newResponses);
    try {
      localStorage.setItem(`ikigai-${questionKey}`, value);
    } catch (error) { console.error("Failed to save to localStorage", error); }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);

    const aggregatedResponses = {
        whatYouLove: allQuestions.map((q, i) => q.key === 'whatYouLove' ? responses[`q${i}`] : '').filter(Boolean).join('\\n- '),
        whatYouAreGoodAt: allQuestions.map((q, i) => q.key === 'whatYouAreGoodAt' ? responses[`q${i}`] : '').filter(Boolean).join('\\n- '),
        whatTheWorldNeeds: allQuestions.map((q, i) => q.key === 'whatTheWorldNeeds' ? responses[`q${i}`] : '').filter(Boolean).join('\\n- '),
        whatYouCanBePaidFor: allQuestions.map((q, i) => q.key === 'whatYouCanBePaidFor' ? responses[`q${i}`] : '').filter(Boolean).join('\\n- '),
    };

    try {
      const result = await analyzeIkigaiIntersections(aggregatedResponses);
      setAnalysis(result);
    } catch (error) {
      console.error("AI analysis failed:", error);
      toast({ variant: "destructive", title: "Analysis Failed", description: "There was an error while analyzing your responses. Please try again." });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    const clearedResponses: IkigaiResponses = {};
    allQuestions.forEach((_q, index) => {
      clearedResponses[`q${index}`] = '';
    });
    setResponses(clearedResponses);
    setAnalysis(null);
    try {
      allQuestions.forEach((_q, index) => {
        localStorage.removeItem(`ikigai-q${index}`);
      });
    } catch (error) { console.error("Failed to clear localStorage", error); }
  };
  
  if (!isClient) {
    return <div className="flex items-center justify-center min-h-screen bg-background"><Loader className="w-12 h-12 animate-spin text-primary" /></div>;
  }

  return (
    <main className="font-body">
      {analysis ? (
        <AnalysisReport analysis={analysis} onReset={handleReset} />
      ) : (
        <Questionnaire 
          responses={responses} 
          onResponseChange={handleResponseChange}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
        />
      )}
    </main>
  );
}
