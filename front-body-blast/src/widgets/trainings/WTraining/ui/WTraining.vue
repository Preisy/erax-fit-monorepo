<script setup lang="ts">
import { SSwiperSlide } from 'shared/ui/SSwiperSlide';
import { Info } from '../model';
import InfoBlock from './InfoBlock.vue';
import TrainingAnim from './TrainingAnim.vue';

export interface WTrainingProps {
  name: string; //Название тренировки
  commentary: string; //Место для комментария от тренера
  animUrl: string; //Ссылка на ролик с демонстрацией
  info: Info; //Подробности тренировки(вес, подходы)
}
defineProps<WTrainingProps>();
</script>

<template>
  <SSwiperSlide>
    <div flex flex-col gap-1rem>
      <div>
        <h1>{{ name }}</h1>
        <p>{{ commentary }}</p>
      </div>
      <TrainingAnim :url="animUrl" />
      <InfoBlock :info="info" />
    </div>
  </SSwiperSlide>
</template>
