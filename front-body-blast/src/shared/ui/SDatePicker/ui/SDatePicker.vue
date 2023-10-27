<script setup lang="ts">
import { QIcon, QDate, date } from 'quasar';

const today = date.formatDate(Date.now(), 'DD.MM');

export interface SDatePickerProps {
  panel: string;
  dates: string[];
}

const props = defineProps<SDatePickerProps>();
const tpanel = computed({
  get() {
    return props.panel;
  },
  set(value: string) {
    return emit('update:panel', value);
  },
});

const emit = defineEmits<{
  (e: 'update:panel', newValue: string): void;
}>();

const showDateModal = ref(false);

watch(tpanel, (newDate: string) => {
  if (tpanel !== undefined) {
    tpanel.value = newDate;
    showDateModal.value = false;
    nextTick(() => (tpanel.value = newDate));
  }
});

const getDate = (td: string) => {
  return td != today ? td : 'Сегодня';
};
</script>

<template>
  <div mt-7 flex items-center justify-center gap-2 @click="showDateModal = true">
    <p text-center font-800>{{ getDate(tpanel) }}</p>
    <q-icon name="calendar_month" text-black />
  </div>
  <q-date
    absolute
    left="1/2"
    top="1/2"
    translate-x="-1/2"
    translate-y="-1/2"
    z-100
    v-model="tpanel"
    v-if="showDateModal"
    mask="DD.MM"
    :options="dates"
  />
</template>
