'use client';

import { useState, useEffect } from 'react';
import { Questionnaire } from '@/components/ikigai/Questionnaire';
import { AnalysisReport } from '@/components/ikigai/AnalysisReport';
import { analyzeIkigaiIntersections, type AnalyzeIkigaiIntersectionsInput, type AnalyzeIkigaiIntersectionsOutput } from '@/ai/flows/analyze-ikigai-intersections';
import { useToast } from "@/hooks/use-toast";
import { Loader } from 'lucide-react';

export default function Home() {
  const [responses, setResponses] = useState<AnalyzeIkigaiIntersectionsInput>({
    whatYouLove: '',
    whatYouAreGoodAt: '',
    whatTheWorldNeeds: '',
    whatYouCanBePaidFor: '',
  });
  const [analysis, setAnalysis] = useState<AnalyzeIkigaiIntersectionsOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    try {
      const savedResponses = {
        whatYouLove: localStorage.getItem('ikigai-whatYouLove') || '',
        whatYouAreGoodAt: localStorage.getItem('ikigai-whatYouAreGoodAt') || '',
        whatTheWorldNeeds: localStorage.getItem('ikigai-whatTheWorldNeeds') || '',
        whatYouCanBePaidFor: localStorage.getItem('ikigai-whatYouCanBePaidFor') || '',
      };
      setResponses(savedResponses);
    } catch (error) { console.error("Failed to load from localStorage", error); }
  }, []);

  const handleResponseChange = (key: keyof AnalyzeIkigaiIntersectionsInput, value: string) => {
    const newResponses = { ...responses, [key]: value };
    setResponses(newResponses);
    try {
      localStorage.setItem(`ikigai-${key}`, value);
    } catch (error) { console.error("Failed to save to localStorage", error); }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeIkigaiIntersections(responses);
      setAnalysis(result);
    } catch (error) {
      console.error("AI analysis failed:", error);
      toast({ variant: "destructive", title: "Analysis Failed", description: "There was an error while analyzing your responses. Please try again." });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    const clearedResponses = {
      whatYouLove: '', whatYouAreGoodAt: '', whatTheWorldNeeds: '', whatYouCanBePaidFor: '',
    };
    setResponses(clearedResponses);
    setAnalysis(null);
    try {
      Object.keys(clearedResponses).forEach(key => localStorage.removeItem(`ikigai-${key}`));
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
