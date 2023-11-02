<script setup lang="ts">
import { QIcon, QDate, date, QDateProps } from 'quasar';

const today = date.formatDate(Date.now(), 'YYYY/MM/DD');
const showDateModal = ref(false);

export interface SCalendarProps extends QDateProps {}

const props = defineProps<SCalendarProps>();

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: string): void;
}>();

const dateValue = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    showDateModal.value = false;
    if (!value) return;
    return emit('update:modelValue', value);
  },
});
//TODO: get from locale from browser
const getDate = (td: string) => {
  if (props.defaultView == 'Months') return new Date(td).toLocaleString('ru-RU', { month: 'long' });
  return td != today ? td.split('/').reverse().slice(0, 2).join('.') : 'Сегодня';
};
</script>

<template>
  <div>
    <div mt-7 flex items-center justify-center gap-2 @click="showDateModal = true">
      <p text-center font-800>{{ getDate(dateValue) }}</p>
      <q-icon name="calendar_month" text-black />
    </div>
    <q-popup-proxy cover v-if="showDateModal">
      <q-date
        v-bind="$props"
        absolute
        left="1/2"
        top="1/2"
        translate-x="-1/2"
        translate-y="-1/2"
        z-100
        v-model="dateValue"
      />
    </q-popup-proxy>
  </div>
</template>
