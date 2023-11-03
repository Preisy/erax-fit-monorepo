<script setup lang="ts">
import { QTabPanels, QTabPanel } from 'quasar';
import { FDietNutrition } from 'features/diet/FDietNutrition';
import { EDietHeader } from 'entities/diet/EDietHeader';
import { EDietItem } from 'entities/diet/EDietItem';

const panel = ref('nutrition');
const props = {
  cereals: {
    firstCategory: [{ name: 'Овсянка' }, { name: 'Булгур' }],
    secondCategory: [{ name: 'Гречка' }, { name: 'Рис' }],
    thirdCategory: [{ name: 'Полба' }, { name: 'Перловка' }, { name: 'Пшенка' }, { name: 'Киноа' }],
  },
  vegetables: {
    firstCategory: [{ name: 'Огурец' }, { name: 'Булгур' }],
    secondCategory: [{ name: 'Гречка' }, { name: 'Рис' }],
    thirdCategory: [{ name: 'Полба' }, { name: 'Перловка' }, { name: 'Пшенка' }, { name: 'Киноа' }],
  },
  fruitsAndBerries: {
    firstCategory: [{ name: 'Яблоко' }, { name: 'Булгур' }],
    secondCategory: [],
    thirdCategory: [{ name: 'Полба' }, { name: 'Перловка' }, { name: 'Пшенка' }, { name: 'Киноа' }],
  },
};

const nutrition = {
  breakfast: {
    firstCategory: [
      { name: 'яблоко', quantity: '100гр' },
      { name: 'string', quantity: 'string' },
    ],
    secondCategory: [
      { name: 'string', quantity: 'string' },
      { name: 'string', quantity: 'string' },
    ],
    thirdCategory: [
      { name: 'string', quantity: 'string' },
      { name: 'string', quantity: 'string' },
      { name: 'string', quantity: 'string' },
      { name: 'string', quantity: 'string' },
    ],
  },
  firstBreak: {
    firstCategory: [],
    secondCategory: [
      { name: 'string', quantity: 'string' },
      { name: 'string', quantity: 'string' },
    ],
    thirdCategory: [],
  },
  lunch: {
    firstCategory: [
      { name: 'string', quantity: 'string' },
      { name: 'string', quantity: 'string' },
    ],
    secondCategory: [],
    thirdCategory: [
      { name: 'string', quantity: 'string' },
      { name: 'string', quantity: 'string' },
      { name: 'string', quantity: 'string' },
      { name: 'string', quantity: 'string' },
    ],
  },
  secondBreak: {
    firstCategory: [
      { name: 'string', quantity: 'string' },
      { name: 'string', quantity: 'string' },
    ],
    secondCategory: [
      { name: 'string', quantity: 'string' },
      { name: 'string', quantity: 'string' },
    ],
    thirdCategory: [],
  },
  dinner: {
    firstCategory: [{ name: 'string', quantity: 'string' }],
    secondCategory: [],
    thirdCategory: [
      { name: 'string', quantity: 'string' },
      { name: 'string', quantity: 'string' },
    ],
  },
};

const pages: (keyof typeof props)[] = ['cereals', 'vegetables', 'fruitsAndBerries'];
</script>

<template>
  <div class="h-full">
    <EDietHeader v-model="panel" :pages="['nutrition', ...pages]" pt-2 />
    <q-tab-panels
      v-model="panel"
      animated
      swipeable
      infinite
      static
      mx--2
      class="[&_.q-tab-panel]:(p-2)"
      h-full
      :class="{ '[&_.scroll]:overflow-visible': panel === 'nutrition' }"
    >
      <q-tab-panel name="nutrition">
        <FDietNutrition :slides="nutrition" />
      </q-tab-panel>
      <q-tab-panel v-for="page in pages" :name="page" :key="page">
        <EDietItem :title="page" v-bind="props[page]" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
