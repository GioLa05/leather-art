export const theme = {
  tan: '#B5895E',
  choc: '#3D1F0F',
  bone: '#F0E4D2',
  mid: '#8B6B4D',
  hair: 'rgba(61,31,15,.55)',
  hairStrong: '#3D1F0F',
  display: '"Archivo Black", "Helvetica Neue", Arial, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace',
  script: '"Pinyon Script", "Snell Roundhand", cursive',
} as const;

export type Theme = typeof theme;
