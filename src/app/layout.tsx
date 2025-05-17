import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'InstaVihangam',
  description: 'AI Powered Instagram Post Generator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={`antialiased font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
