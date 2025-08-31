// src/app/api/genkit/[...flow]/route.ts
import {createNextHandler} from '@genkit-ai/next/server';
import '@/ai/flows/analyze-ikigai-intersections';

export const POST = createNextHandler();
