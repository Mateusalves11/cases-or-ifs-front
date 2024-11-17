import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Navbar } from '@/components/navbar/navbar';
import { ThemeProvider } from '@/providers/theme-provider/theme-provider';
import { GlobalStyles } from '@mui/material';

const geistSans = localFont({
  src: './fonts/Raleway-VariableFont_wght.ttf',
  variable: '--font-raleway',
  weight: '100 200 300 400 500 600 700 800 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        <ThemeProvider>
          <GlobalStyles
            styles={{
              '*': {
                boxSizing: 'border-box',
              },
              body: {
                maxWidth: '100vw',
                overflowX: 'hidden',
              },
              html: {
                fontSize: 16,
              },
            }}
          />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
