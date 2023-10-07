<script setup lang="ts">
import { FTraining, FTrainingProps } from 'features/FTraining';

// const trainings = useTrainingStore().trainings;
const trainings: FTrainingProps[] = [
  {
    name: 'Пуловер лёжа',
    commentary: 'Место для комментария от тренера',
    animUrl:
      'https://s3-alpha-sig.figma.com/img/41ed/1e26/d9829e7aa8de66c289cf24a0d5263700?Expires=1697414400&Signature=XK1X-EaCakuhYZYJmjJzVuAM5ajUk3DGBEpuEfJz6fSrsO4byv1WwLCJMhwM23M1bPil6gj4x~C~Ttr-lKFlqzEhsdR6V6SmOOdKh3OmFF~mwEvyhTm85dACvy186QZSkeunZ4TDPm7aUIyQNVv1e6zMnNYebUqayuaY3ARS9gkZfS~6SH8UxUd~F54ACyQDIb1e6hw1ug81I4OC7cotr1rDzGWcAb2gm9SBnHYgbk0VrFfwHf-SEM2rKEKFB6sDmuUUluIujyel78eOHSYgF4nEOzwdhNhD5wmdEIDjfovErXV0A7835Ps2aEyi6JzlDGkxX0nhASUlXz~PVef6Hg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    info: {
      weight:'5 кг',
      sets:'4',
      repeats:'10 + 10',
      rest:'120',
      temp:'2-0-2',
    }
  },
];
</script>
<template>
  <div>
    <div>
      <FTraining
        v-for="training in trainings"
        :key="training.name"
        v-bind="training"
      />
    </div>
  </div>
</template>
