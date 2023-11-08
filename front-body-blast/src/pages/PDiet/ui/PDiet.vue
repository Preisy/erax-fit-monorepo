<script setup lang="ts">
import { QTabPanel } from 'quasar';
import { WDietHeader } from 'widgets/diet/WDietHeader';
import { WDietNutrition } from 'widgets/diet/WDietNutrition';
import { EDietItem } from 'entities/diet/EDietItem';
import { STabPanels } from 'shared/ui/STabPanels';

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
    <WDietHeader v-model="panel" :pages="['nutrition', ...pages]" pt-4 />
    <STabPanels v-model="panel" keep-alive>
      <q-tab-panel name="nutrition" overflow-hidden>
        <WDietNutrition :slides="nutrition" />
      </q-tab-panel>
      <q-tab-panel v-for="page in pages" :name="page" :key="page">
        <EDietItem :title="page" v-bind="props[page]" />
      </q-tab-panel>
    </STabPanels>
  </div>
</template>
