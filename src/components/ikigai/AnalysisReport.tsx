'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, BrainCircuit, Sun } from 'lucide-react';
import { intersectionData } from './data';
import type { AnalyzeIkigaiIntersectionsOutput } from '@/ai/flows/analyze-ikigai-intersections';

interface AnalysisReportProps {
  analysis: AnalyzeIkigaiIntersectionsOutput;
  onReset: () => void;
}

export function AnalysisReport({ analysis, onReset }: AnalysisReportProps) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2 flex items-center justify-center gap-3">
            <Sun className="text-accent w-10 h-10" /> Your Ikigai Analysis
          </h1>
          <p className="text-muted-foreground text-lg">Here's what we've discovered from your journal.</p>
        </header>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <BrainCircuit className="w-8 h-8 text-accent" />
              Ikigai: Your Reason for Being
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-base">{analysis.ikigai}</p>
          </CardContent>
        </Card>
        
        <Accordion type="single" collapsible className="w-full" defaultValue="passion">
          {intersectionData.map(item => {
            const IntersectionIcon = item.icon;
            return (
              <AccordionItem value={item.key} key={item.key}>
                <AccordionTrigger className="text-xl font-semibold">
                  <div className="flex items-center gap-3">
                    <IntersectionIcon className="w-6 h-6 text-accent" />
                    {item.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-base p-4 bg-card rounded-b-md">
                  <p className="font-semibold text-muted-foreground mb-4">{item.description}</p>
                  <p className="whitespace-pre-wrap">{analysis[item.key as keyof AnalyzeIkigaiIntersectionsOutput]}</p>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        <div className="text-center mt-12">
          <Button onClick={onReset} size="lg" variant="outline">
            <BookOpen className="mr-2" /> Start a New Journal
          </Button>
        </div>

        <footer className="text-center mt-12 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Ikigai Navigator. All Rights Reserved.</p>
        </footer>
      </div>
    );
}
