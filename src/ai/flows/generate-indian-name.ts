'use server';
/**
 * @fileOverview AI agent that generates a creative Indian name for an image.
 *
 * - generateIndianName - A function that generates a creative Indian name for an image.
 * - GenerateIndianNameInput - The input type for the generateIndianName function.
 * - GenerateIndianNameOutput - The return type for the generateIndianName function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateIndianNameInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo for which a name should be generated, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateIndianNameInput = z.infer<typeof GenerateIndianNameInputSchema>;

const GenerateIndianNameOutputSchema = z.object({
  indianName: z.string().describe('A creative, relevant Indian name for the image.'),
});
export type GenerateIndianNameOutput = z.infer<typeof GenerateIndianNameOutputSchema>;

export async function generateIndianName(input: GenerateIndianNameInput): Promise<GenerateIndianNameOutput> {
  return generateIndianNameFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateIndianNamePrompt',
  input: {schema: GenerateIndianNameInputSchema},
  output: {schema: GenerateIndianNameOutputSchema},
  prompt: `You are an AI agent specializing in generating creative Indian names for images.

  Based on the image, generate a creative and relevant Indian name.
  The name should reflect the essence, theme, or prominent elements of the image.

  Image: {{media url=photoDataUri}}`,
});

const generateIndianNameFlow = ai.defineFlow(
  {
    name: 'generateIndianNameFlow',
    inputSchema: GenerateIndianNameInputSchema,
    outputSchema: GenerateIndianNameOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
