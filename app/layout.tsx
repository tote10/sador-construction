import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/state/AppContext';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${COMPANY.name} - General Contractor`,
  description: 'Sador General Construction delivers buildings, roads, and civil infrastructure in Ethiopia with disciplined project control and reliable execution.',
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