"use client";

import { useState, type ChangeEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { generateIndianName, type GenerateIndianNameOutput } from '@/ai/flows/generate-indian-name';
import { generateInstagramCaption, type GenerateInstagramCaptionOutput } from '@/ai/flows/generate-instagram-caption';
import LoadingDots from '@/components/LoadingDots';
import { UploadCloud, Copy, Sparkles, Image as ImageIcon, AlertCircle, TextQuote, భారతీయ } from 'lucide-react'; // భారతీయ is a placeholder, replace with a real icon or SVG if available

const IndianIcon = () => ( // Simple SVG placeholder for "Indian" aspect
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="4"></circle>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
  </svg>
);


export default function InstaVihangamPage() {
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [generatedName, setGeneratedName] = useState<string | null>(null);
  const [generatedCaption, setGeneratedCaption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      setError(null);
      setGeneratedName(null);
      setGeneratedCaption(null);
      try {
        const dataUri = await fileToDataUri(file);
        setImageDataUri(dataUri);
      } catch (err) {
        console.error("Error converting file to data URI:", err);
        setError("Failed to load image. Please try another one.");
        setImageDataUri(null);
        setSelectedImageFile(null);
      }
    }
  };

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!imageDataUri) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedName(null);
    setGeneratedCaption(null);

    try {
      const nameResult: GenerateIndianNameOutput = await generateIndianName({ photoDataUri: imageDataUri });
      setGeneratedName(nameResult.indianName);

      const captionResult: GenerateInstagramCaptionOutput = await generateInstagramCaption({
        photoDataUri: imageDataUri,
        creativeIndianName: nameResult.indianName,
      });
      setGeneratedCaption(captionResult.instagramCaption);
    } catch (err) {
      console.error("AI generation failed:", err);
      setError("Failed to generate content. The AI might be busy or an error occurred. Please try again.");
      // Keep partially generated content if any
      if (!generatedName) setGeneratedName(null); // If name failed, ensure it's null
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string, type: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: `${type} Copied!`,
        description: `${type} has been copied to your clipboard.`,
      });
    } catch (err) {
      toast({
        title: `Failed to Copy ${type}`,
        description: "Could not copy text to clipboard. Please try again manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-4 shadow-md bg-card">
        <div className="container mx-auto flex items-center justify-center sm:justify-between">
          <h1 className="text-3xl sm:text-4xl font-bold text-accent">InstaVihangam</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <section aria-labelledby="intro-title" className="text-center">
            <h2 id="intro-title" className="text-2xl font-semibold text-foreground">
              Craft Your Perfect Indian-Inspired Instagram Post
            </h2>
            <p className="mt-2 text-muted-foreground">
              Upload your image, and let AI generate a unique Indian name and an engaging caption for you!
            </p>
          </section>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <UploadCloud className="h-6 w-6 text-primary" />
                Upload Your Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file:text-primary file:font-semibold hover:file:bg-primary/10"
                aria-label="Upload image"
              />
              {imageDataUri && (
                <div className="mt-4 p-2 border rounded-md overflow-hidden bg-muted/50">
                  <Image
                    src={imageDataUri}
                    alt="Uploaded preview"
                    width={500}
                    height={300}
                    className="rounded-md object-contain max-h-[300px] w-auto mx-auto shadow-sm"
                    data-ai-hint="user uploaded image"
                  />
                </div>
              )}
            </CardContent>
          </Card>
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="text-center">
            <Button
              onClick={handleSubmit}
              disabled={!imageDataUri || isLoading}
              size="lg"
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <LoadingDots />
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Post Ideas
                </>
              )}
            </Button>
          </div>

          {isLoading && !generatedName && !generatedCaption && ( // Show loading dots prominently if no results yet
            <div className="py-10">
               <LoadingDots />
            </div>
          )}


          {(generatedName || generatedCaption) && !isLoading && (
            <div className="space-y-6">
              {generatedName && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <IndianIcon /> {/* Using custom SVG Icon */}
                       Creative Indian Name
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-medium text-accent">{generatedName}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" onClick={() => handleCopy(generatedName, "Name")}>
                      <Copy className="mr-2 h-4 w-4" /> Copy Name
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {generatedCaption && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <TextQuote className="h-6 w-6 text-primary" />
                      Instagram Caption
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line text-foreground/90 bg-muted/30 p-3 rounded-md border">{generatedCaption}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" onClick={() => handleCopy(generatedCaption, "Caption")}>
                      <Copy className="mr-2 h-4 w-4" /> Copy Caption
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              {imageDataUri && (generatedName || generatedCaption) && (
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                        <ImageIcon className="h-6 w-6 text-primary" />
                        Post Preview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 p-4 bg-muted/30 rounded-b-md">
                        <div className="aspect-[4/5] w-full max-w-xs mx-auto bg-secondary rounded-md overflow-hidden shadow-lg">
                         <Image src={imageDataUri} alt="Post preview" width={400} height={500} className="w-full h-full object-cover" data-ai-hint="social media post"/>
                        </div>
                        <div className="text-center max-w-xs mx-auto">
                        {generatedName && <p className="font-semibold text-accent mt-2 truncate">{generatedName}</p>}
                        {generatedCaption && <p className="text-sm text-foreground/80 mt-1 line-clamp-3 whitespace-pre-line">{generatedCaption}</p>}
                        </div>
                    </CardContent>
                 </Card>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="text-center py-6 text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} InstaVihangam. All rights reserved.
      </footer>
    </div>
  );
}
