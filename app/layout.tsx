import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import WagmiProviderComp from '@/lib/wagmi/wagmi-provider';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import {dynamic} from './config';
import { config } from '@/lib/wagmi/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GreenCommute - Metro Carbon Savings Rewards',
  description: 'Convert your metro journey into eco-rewards with GreenCommute',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <WagmiProviderComp initialState={initialState}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </WagmiProviderComp>
      </body>
    </html>
  );
}