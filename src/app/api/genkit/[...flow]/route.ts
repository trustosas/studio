// src/app/api/genkit/[...flow]/route.ts
import { createNextHandler } from '@genkit-ai/next';
import '@/ai/flows/analyze-ikigai-intersections';

export const POST = createNextHandler();
