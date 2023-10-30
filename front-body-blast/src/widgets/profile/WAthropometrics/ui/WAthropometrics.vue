<script setup lang="ts">
import { date, QTabPanels, QTabPanel } from 'quasar';
import { EAthropometricsSlide, EAthropometricsSlideProps } from 'entities/profile/EAthropometricsSlide';
import { SDatePicker } from 'shared/ui/SDatePicker';
const today = date.formatDate(Date.now(), 'DD.MM');
const panel = ref(today);

export interface WAthropometrics {
  slides: EAthropometricsSlideProps[];
}

const props = defineProps<WAthropometrics>();
const dates = props.slides.map(
  (it) => new Date().getFullYear() + '/' + it.tdate.slice(3, 5) + '/' + it.tdate.slice(0, 2),
);
</script>

<template>
  <div h-full>
    <SDatePicker v-model:panel="panel" :dates="dates" />
    <q-tab-panels v-model="panel" animated swipeable infinite static mx--2 class="[&_.q-tab-panel]:(p-2)" h-full>
      <q-tab-panel v-for="slide in slides" :name="slide.tdate" :key="slide.tdate">
        <EAthropometricsSlide :profile="slide.profile" :editable="slide.editable" :tdate="slide.tdate" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
