import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';

export const metadata: Metadata = {
  title: 'LEATHER//ART — Specimen Archive',
  description: 'Every specimen, catalogued. Vegetable-tanned leather goods from Tbilisi.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=JetBrains+Mono:wght@400;500;700&family=Pinyon+Script&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --tan: #B5895E;
            --choc: #3D1F0F;
            --bone: #F0E4D2;
            --mid: #8B6B4D;
            --hair: rgba(61,31,15,.55);
            --hair-strong: #3D1F0F;
            --display: "Archivo Black", "Helvetica Neue", Arial, sans-serif;
            --mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;
            --script: "Pinyon Script", "Snell Roundhand", cursive;
          }
          *, *::before, *::after { box-sizing: border-box; }
          html, body { margin: 0; padding: 0; }
          html { background: var(--tan); }
          body {
            background: var(--tan);
            color: var(--choc);
            font-family: var(--mono);
            font-size: 13px;
            line-height: 1.45;
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
          }
          a { color: inherit; text-decoration: none; }
          button { font: inherit; color: inherit; background: none; border: 0; padding: 0; }
          input, select { font: inherit; color: inherit; }
          .mono { font-family: var(--mono); font-feature-settings: "tnum" 1, "ss01" 1; }
          .display { font-family: var(--display); letter-spacing: -0.02em; }
          .script { font-family: var(--script); }
          .hairline { background: var(--hair-strong); height: 0.5px; width: 100%; display: block; }
          .vrule { background: var(--hair-strong); width: 0.5px; align-self: stretch; }
        `}</style>
      </head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
