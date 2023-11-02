<script setup lang="ts">
import { QTabPanels, QTabPanel } from 'quasar';
import { EDietHeader } from 'entities/diet/EDietHeader';

const pages = ['nutrition', 'cereals', 'vegetables', 'fruitsAndBerries'];
const panel = ref('nutrition');
</script>

<template>
  <div h-full>
    <EDietHeader v-model="panel" :pages="pages" pt-2 />
    <q-tab-panels v-model="panel" animated swipeable infinite static mx--2 class="[&_.q-tab-panel]:(p-2)" h-full>
      <q-tab-panel v-for="page in pages" :name="page" :key="page">
        <h1 px-6 pt-3>{{ page }}</h1>
        <div grid grid-cols-2 mx-6 my-4 gap-2>
          <div relative rounded-4 bg-primary px-6 py-4 text-center text-bg>
            <p ellipsis absolute left="1/2" scale="3/4" translate-x="-1/2" translate-y="-1/3">Категория1</p>
            <p pt-2 font-600>Гречка</p>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
