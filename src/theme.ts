import { CSSVariablesResolver, createTheme } from '@mantine/core';

export const theme = createTheme({
  /** Put your mantine theme override here */
  primaryColor: 'green',
  autoContrast: true,
  colors: {
    green: [
      '#e4ffe8',
      '#cdffd4',
      '#9bffa8',
      '#65fe7a',
      '#39fe53',
      '#1ffe3a',
      '#0afe2b',
      '#00e21d',
      '#00c914',
      '#00ae03',
    ],
  },
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {},
  dark: {},
});
