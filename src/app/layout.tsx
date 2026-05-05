import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({ 
  subsets: ['latin'], 
  weight: ['300','400','500','600'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  weight: ['400','500','600','700'],
  variable: '--font-heading',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  weight: ['400','500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: "AgentFlow AI - Automate Your Professional Presence",
  description: "Create tasks, let AI write your content, and publish automatically to LinkedIn, Twitter, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <div className="orb-bg">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <main className="relative z-10">
          {children}
        </main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
