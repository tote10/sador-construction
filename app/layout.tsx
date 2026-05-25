import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/state/AppContext';

export const metadata: Metadata = {
  title: 'Sador Construction - Building the Future',
  description: 'Professional construction company in Ethiopia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}