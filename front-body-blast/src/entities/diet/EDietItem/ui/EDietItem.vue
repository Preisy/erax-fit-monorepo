<script setup lang="ts">
import { SInput } from 'shared/ui/SInput';
export interface Product {
  name: string;
  quantity?: string;
}
export interface ProductsByCategories {
  firstCategory: Product[];
  secondCategory: Product[];
  thirdCategory: Product[];
}
export interface EDietItemProps extends ProductsByCategories {
  title: string;
}
defineProps<EDietItemProps>();

const colorsBg = ['accent', 'primary', 'secondary'];
const colorsText = ['positive', 'positive', 'primary'];

const cats: (keyof ProductsByCategories)[] = ['firstCategory', 'secondCategory', 'thirdCategory'];
</script>

<template>
  <div mx-6>
    <h1 pt-3>{{ $t(`home.diet.${title}`) }}</h1>
    <div grid grid-cols-2 my-4 gap-2 v-for="(category, ind) in cats" :key="category">
      <SInput
        v-for="item in $props[category]"
        :model-value="item.quantity || item.name"
        :key="item.name"
        :name="item.name"
        :label="item.quantity ? item.name : `${$t(`home.diet.category`)} ${ind + 1}`"
        readonly
        centered
        :color="colorsText[ind]"
        :active-color="colorsText[ind]"
        :active-bg-color="colorsBg[ind]"
      />
    </div>
  </div>
</template>
