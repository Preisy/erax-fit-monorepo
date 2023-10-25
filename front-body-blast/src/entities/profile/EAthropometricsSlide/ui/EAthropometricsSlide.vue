<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { QIcon, QDate, date } from 'quasar';
import { Athropometrics } from 'shared/api/profile';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

export interface IEAthropometricsSlide {
  editable: boolean;
  tdate: string;
  panel: string;
  weight?: number;
  waist?: number;
  underbelly?: number;
  shoulder?: number;
  hip?: number;
  hipVolume?: number;
  dates: string[];
}
const fields = {
  weight: 'Вес',
  waist: 'Талия',
  underbelly: 'Низ живота',
  shoulder: 'Плечо',
  hip: 'Бедро',
  hipVolume: 'Объем бедер',
};
const today = date.formatDate(Date.now(), 'DD.MM');
const getDate = (td: string) => {
  return td != today ? td : 'Сегодня';
};
const props = defineProps<IEAthropometricsSlide>();
const emit = defineEmits<{
  (e: 'update:panel', newValue: string): void;
}>();
const showDateModal = ref(false);
const tdate = ref(props.tdate);

watch(tdate, (newDate: string) => {
  if (tdate !== undefined) {
    tdate.value = newDate;
    showDateModal.value = false;
    setTimeout(() => {
      emit('update:panel', newDate);
    }, 0);
  }
});
const schema = toTypedSchema(Athropometrics.validation());
</script>

<template>
  <div mt-7 flex items-center justify-center gap-2 @click="showDateModal = true">
    <p text-center font-800>{{ getDate(tdate) }}</p>
    <q-icon name="calendar_month" text-black />
  </div>
  <q-date
    absolute
    left="1/2"
    top="1/2"
    translate-x="-1/2"
    translate-y="-1/2"
    z-100
    v-model="tdate"
    v-if="showDateModal"
    mask="DD.MM"
    :options="dates"
  />

  <SForm v-if="editable" :action="() => {}" :field-schema="schema" class="[&>div]:(grid grid-cols-2 mt-8 gap-2)">
    <SInput v-for="(value, key) in fields" :key="key" :name="key" :label="value" :value="weight" centered />
  </SForm>

  <div v-else grid grid-cols-2 mt-8 gap-2>
    <div
      class="relative rounded-1rem bg-primary px-6 py-4 text-center text-bg"
      v-for="(value, key) in fields"
      :key="key"
    >
      <p class="ellipsis absolute left-1/2 scale-3/4 -translate-x-1/2 -translate-y-1/3">{{ value }}</p>
      <p class="pt-2 font-600">{{ $.props[key] || '-' }}</p>
    </div>
  </div>
</template>
