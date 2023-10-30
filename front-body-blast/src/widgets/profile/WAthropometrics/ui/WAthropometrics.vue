<script setup lang="ts">
import { date, QTabPanels, QTabPanel } from 'quasar';
import { EAthropometricsSlide, EAthropometricsSlideProps } from 'entities/profile/EAthropometricsSlide';
import { SCalendar } from 'shared/ui/SCalendar';
const today = date.formatDate(Date.now(), 'YYYY/MM/DD');
const panel = ref(today);

export interface WAthropometrics {
  slides: EAthropometricsSlideProps[];
}

const props = defineProps<WAthropometrics>();
const dates = props.slides.map((it) => it.dateValue);
</script>

<template>
  <div h-full>
    <SCalendar v-model="panel" :options="dates" />
    <q-tab-panels v-model="panel" animated swipeable infinite static mx--2 class="[&_.q-tab-panel]:(p-2)" h-full>
      <q-tab-panel v-for="slide in slides" :name="slide.dateValue" :key="slide.dateValue">
        <EAthropometricsSlide :profile="slide.profile" :editable="slide.editable" :date-value="slide.dateValue" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
