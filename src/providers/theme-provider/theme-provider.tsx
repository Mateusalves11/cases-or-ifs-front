'use client';
import { theme } from '@/styles/theme';
import { Box, ThemeProvider as ThemeProviderMui } from '@mui/material';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProviderMui theme={theme}>
      <Box>{children}</Box>
    </ThemeProviderMui>
  );
};
