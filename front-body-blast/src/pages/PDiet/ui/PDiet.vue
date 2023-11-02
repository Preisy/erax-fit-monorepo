<script setup lang="ts">
import { QTabPanels, QTabPanel } from 'quasar';
import { EDietHeader } from 'entities/diet/EDietHeader';
import { EDietItem } from 'entities/diet/EDietItem';
import { SColoredItem } from 'shared/ui/SColoredItem';

const panel = ref('nutrition');
const props = {
  cereals: {
    firstCategory: ['Овсянка', 'Булгур'],
    secondCategory: ['Гречка', 'Рис'],
    thirdCategory: ['Полба', 'Перловка', 'Пшенка', 'Киноа'],
  },
  vegetables: {
    firstCategory: ['Огурец', 'Булгур'],
    secondCategory: ['Гречка', 'Рис'],
    thirdCategory: ['Полба', 'Перловка', 'Пшенка', 'Киноа'],
  },
  fruitsAndBerries: {
    firstCategory: ['Яблоко', 'Булгур'],
    secondCategory: [],
    thirdCategory: ['Полба', 'Перловка', 'Пшенка', 'Киноа'],
  },
};
const pages = ['nutrition', 'cereals', 'vegetables', 'fruitsAndBerries'];
const pages2: (keyof typeof props)[] = ['cereals', 'vegetables', 'fruitsAndBerries'];
</script>

<template>
  <div h-full>
    <EDietHeader v-model="panel" :pages="pages" pt-2 />
    <q-tab-panels v-model="panel" animated swipeable infinite static mx--2 class="[&_.q-tab-panel]:(p-2)" h-full>
      <q-tab-panel name="nutrition">
        <h1 px-6 pt-3>Nutrition</h1>
        <div grid grid-cols-2 mx-6 my-4 gap-2>
          <SColoredItem label="категория 1" text="гречка" bg-primary text-bg />
        </div>
      </q-tab-panel>
      <q-tab-panel v-for="page in pages2" :name="page" :key="page">
        <EDietItem :title="page" v-bind="props[page]" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
