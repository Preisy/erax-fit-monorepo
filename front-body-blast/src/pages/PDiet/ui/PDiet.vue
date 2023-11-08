<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { QTabPanel } from 'quasar';
import { WDietHeader } from 'widgets/diet/WDietHeader';
import { WDietNutrition } from 'widgets/diet/WDietNutrition';
import { EDietItem } from 'entities/diet/EDietItem';
import { Diet, productsApi, nutritionApi } from 'shared/api/diet';
import { STabPanels } from 'shared/ui/STabPanels';
const panel = ref('nutrition');

const products = productsApi.reduce((acc: Diet.DietItem[], rec) => {
  const index = acc.findIndex((it) => it.name === rec.type);
  if (index === -1) acc.push({ name: rec.type, mealItems: [rec] });
  else acc[index].mealItems.push(rec);
  return acc;
}, []);

const pages = products.map((it) => it.name);

const nutrition = nutritionApi;
// const products = ref<Diet.DietItem[]>();
// const panel = ref('nutrition');
// const result = response.data.reduce((acc: Diet.DietItem[], rec) => {
//   const index = acc.findIndex((it) => it.name === rec.type);
//   if (index === -1) acc.push({ name: rec.type, mealItems: [rec] });
//   else acc[index].mealItems.push(rec);
//   return acc;
// }, []);

// ProductsService.getProducts().then(({ data }) => {
//   if (data)
//     products.value = data.reduce((acc: Diet.DietItem[], rec) => {
//       const index = acc.findIndex((it) => it.name === rec.type);
//       if (index === -1) acc.push({ name: rec.type, mealItems: [rec] });
//       else acc[index].mealItems.push(rec);
//       return acc;
//     }, []);
// });

// const pages = computed(() => products.value?.map((it) => it.name));
// const pages: (keyof typeof props)[] = ['cereals', 'vegetables', 'fruitsAndBerries'];
</script>

<template>
  <div class="h-full">
    <WDietHeader v-model="panel" :pages="['nutrition', ...pages]" pt-4 />

    <STabPanels v-model="panel" keep-alive>
      <q-tab-panel name="nutrition" overflow-hidden>
        <WDietNutrition v-bind="nutrition" />
      </q-tab-panel>
      <q-tab-panel v-for="product in products" :name="product.name" :key="product.name">
        <EDietItem v-bind="product" />
      </q-tab-panel>
    </STabPanels>
  </div>
</template>
