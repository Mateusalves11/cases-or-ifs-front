'use client';
import { theme } from '@/styles/theme';
import { ThemeProvider as ThemeProviderMui } from '@mui/material';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProviderMui theme={theme}>
      <div>{children}</div>
    </ThemeProviderMui>
  );
};
