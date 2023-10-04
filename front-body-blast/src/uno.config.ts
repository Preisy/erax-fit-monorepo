import type { Theme } from '@unocss/preset-uno';
import { defineConfig, presetUno, presetAttributify, transformerVariantGroup, transformerDirectives } from 'unocss';

export default defineConfig<Theme>({
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  theme: {
    fontFamily: {
      monsterrat: 'Montserrat, sans-serif',
      inter: 'Inter, sans-serif',
    },
    colors: {
      unset: 'unset',
      bg: '#FFFFFF',
      primary: '#000000',
      secondary: '#FCD844',
    },
    fontSize: {
      sm: ['0.7rem', 'normal'],
      base: ['1rem', 'normal'],
      md: ['1.5rem', 'normal'],
      lg: ['2rem', 'normal'],
      // xl: ['2.3rem', '1.4'],
    },
    breakpoints: {
      sm: '450px',
      md: '900px',
      xl: '1280px',
    },
  },
  preflights: [],
  rules: [],
});
