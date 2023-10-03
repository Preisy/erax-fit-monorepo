import type { Theme } from '@unocss/preset-uno';
import {
  defineConfig,
  presetUno,
  presetAttributify,
  transformerVariantGroup,
  transformerDirectives,
} from 'unocss';

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
    },
    fontSize: {
      sm: ['0.7rem', 'normal'],
      base: ['0.9rem', '1.3'],
      md: ['1rem', '1.4'],
      lg: ['1.2rem', '1'],
      xl: ['2.3rem', '1.4'],
      '2xl': ['3rem', '1.4'],
    },
    breakpoints: {
      sm: '450px',
      '2sm': '600px',
      md: '900px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1600px',
      '4xl': '1920px',
    },
  },
  preflights: [],
  rules: [],
});
