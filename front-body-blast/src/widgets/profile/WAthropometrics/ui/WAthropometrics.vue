<script setup lang="ts">
import { date, QTabPanels, QTabPanel } from 'quasar';
import { EAthropometricsSlide, IEAthropometricsSlide } from 'entities/profile/EAthropometricsSlide';
const today = date.formatDate(Date.now(), 'DD.MM');
const panel = ref(today);

export interface WAthropometrics {
  slides: Omit<IEAthropometricsSlide, 'panel' | 'dates'>[];
}
const props = defineProps<WAthropometrics>();
const dates = props.slides.map(
  (it) => new Date().getFullYear() + '/' + it.tdate.slice(3, 5) + '/' + it.tdate.slice(0, 2),
);
</script>

<template>
  <div>
    <q-tab-panels v-model="panel" mx="[-0.5rem]" animated swipeable infinite static class="[&_.q-tab-panel]:(p-2)">
      <q-tab-panel v-for="slide in slides" :name="slide.tdate" :key="slide.tdate">
        <EAthropometricsSlide v-bind="slide" v-model:panel="panel" :dates="dates" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
