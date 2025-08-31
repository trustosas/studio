// 'use server'
'use server';

/**
 * @fileOverview Analyzes user responses to the Ikigai journal prompts using generative AI to identify potential Ikigai intersections.
 *
 * - analyzeIkigaiIntersections - A function that handles the analysis of Ikigai intersections.
 * - AnalyzeIkigaiIntersectionsInput - The input type for the analyzeIkigaiIntersections function.
 * - AnalyzeIkigaiIntersectionsOutput - The return type for the analyzeIkigaiIntersections function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeIkigaiIntersectionsInputSchema = z.object({
  whatYouLove: z.string().describe('User responses related to what they love.'),
  whatTheWorldNeeds: z.string().describe('User responses related to what the world needs.'),
  whatYouAreGoodAt: z.string().describe('User responses related to what they are good at.'),
  whatYouCanBePaidFor: z.string().describe('User responses related to what they can be paid for.'),
});
export type AnalyzeIkigaiIntersectionsInput = z.infer<typeof AnalyzeIkigaiIntersectionsInputSchema>;

const AnalyzeIkigaiIntersectionsOutputSchema = z.object({
  passion: z.string().describe('Analysis of the intersection between what you love and what you are good at, with citations.'),
  mission: z.string().describe('Analysis of the intersection between what you love and what the world needs, with citations.'),
  vocation: z.string().describe('Analysis of the intersection between what you are good at and what you can be paid for, with citations.'),
  profession: z.string().describe('Analysis of the intersection between what the world needs and what you can be paid for, with citations.'),
  ikigai: z.string().describe('Overall analysis of the Ikigai intersection, combining all four components, with citations.'),
});
export type AnalyzeIkigaiIntersectionsOutput = z.infer<typeof AnalyzeIkigaiIntersectionsOutputSchema>;

export async function analyzeIkigaiIntersections(input: AnalyzeIkigaiIntersectionsInput): Promise<AnalyzeIkigaiIntersectionsOutput> {
  return analyzeIkigaiIntersectionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeIkigaiIntersectionsPrompt',
  input: {schema: AnalyzeIkigaiIntersectionsInputSchema},
  output: {schema: AnalyzeIkigaiIntersectionsOutputSchema},
  prompt: `You are an expert in Ikigai, helping users find their Ikigai by analyzing their responses to the four key areas:

  - What you love
  - What the world needs
  - What you are good at
  - What you can be paid for

  Analyze the user's responses below and identify potential Ikigai intersections, providing explanations for each intersection with citations to relevant Ikigai resources. Explain each of the 4 intersections (passion, mission, vocation, profession) with supporting citations, and the overall Ikigai.

  What you love: {{{whatYouLove}}}
  What the world needs: {{{whatTheWorldNeeds}}}
  What you are good at: {{{whatYouAreGoodAt}}}
  What you can be paid for: {{{whatYouCanBePaidFor}}}

  Format the output as a JSON object with the following keys: passion, mission, vocation, profession, ikigai.
`,
});

const analyzeIkigaiIntersectionsFlow = ai.defineFlow(
  {
    name: 'analyzeIkigaiIntersectionsFlow',
    inputSchema: AnalyzeIkigaiIntersectionsInputSchema,
    outputSchema: AnalyzeIkigaiIntersectionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
