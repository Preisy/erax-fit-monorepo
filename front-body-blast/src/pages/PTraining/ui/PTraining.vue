<script setup lang="ts">
import { WAddition } from 'widgets/trainings/WAddition';
import { WTraining, WTrainingProps } from 'widgets/trainings/WTraining';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';

// const trainings = useTrainingStore().trainings;
const trainings: WTrainingProps[] = [
  {
    name: 'Пуловер лёжа',
    commentary: 'Место для комментария от тренера',
    animUrl:
      'https://s3-alpha-sig.figma.com/img/41ed/1e26/d9829e7aa8de66c289cf24a0d5263700?Expires=1697414400&Signature=XK1X-EaCakuhYZYJmjJzVuAM5ajUk3DGBEpuEfJz6fSrsO4byv1WwLCJMhwM23M1bPil6gj4x~C~Ttr-lKFlqzEhsdR6V6SmOOdKh3OmFF~mwEvyhTm85dACvy186QZSkeunZ4TDPm7aUIyQNVv1e6zMnNYebUqayuaY3ARS9gkZfS~6SH8UxUd~F54ACyQDIb1e6hw1ug81I4OC7cotr1rDzGWcAb2gm9SBnHYgbk0VrFfwHf-SEM2rKEKFB6sDmuUUluIujyel78eOHSYgF4nEOzwdhNhD5wmdEIDjfovErXV0A7835Ps2aEyi6JzlDGkxX0nhASUlXz~PVef6Hg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    info: {
      weight: '5 кг',
      sets: '4',
      repeats: '10 + 10',
      rest: '120',
      temp: '2-0-2',
    },
  },
  {
    name: 'Брусья',
    commentary: 'Место для комментария от тренера',
    animUrl:
      'https://s3-alpha-sig.figma.com/img/41ed/1e26/d9829e7aa8de66c289cf24a0d5263700?Expires=1697414400&Signature=XK1X-EaCakuhYZYJmjJzVuAM5ajUk3DGBEpuEfJz6fSrsO4byv1WwLCJMhwM23M1bPil6gj4x~C~Ttr-lKFlqzEhsdR6V6SmOOdKh3OmFF~mwEvyhTm85dACvy186QZSkeunZ4TDPm7aUIyQNVv1e6zMnNYebUqayuaY3ARS9gkZfS~6SH8UxUd~F54ACyQDIb1e6hw1ug81I4OC7cotr1rDzGWcAb2gm9SBnHYgbk0VrFfwHf-SEM2rKEKFB6sDmuUUluIujyel78eOHSYgF4nEOzwdhNhD5wmdEIDjfovErXV0A7835Ps2aEyi6JzlDGkxX0nhASUlXz~PVef6Hg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    info: {
      weight: '20 кг',
      sets: '5',
      repeats: '20 + 10',
      rest: '150',
      temp: '2-0-2',
    },
  },
];
</script>
<template>
  <SStructure>
    <SSplide :options="{ direction: 'ttb', height: '35rem' }">
      <SSplideSlide v-for="training in trainings" :key="training.name">
        <WTraining v-bind="training" py-1.5rem />
      </SSplideSlide>
      <SSplideSlide>
        <WAddition py-1.5rem />
      </SSplideSlide>
    </SSplide>
  </SStructure>
</template>
