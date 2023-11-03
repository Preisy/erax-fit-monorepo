<script setup lang="ts">
import { SColoredItem } from 'shared/ui/SColoredItem';
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
</script>

<template>
  <div mx-6>
    <h1 pt-3>{{ $t(`home.diet.${title}`) }}</h1>
    <div grid grid-cols-2 my-4 gap-2 v-if="firstCategory.length">
      <SColoredItem
        v-for="item in firstCategory"
        :label="item.quantity ? item.name : 'Категория 1'"
        :text="item.quantity || item.name"
        :key="item.name"
        bg-primary
        text-bg
      />
    </div>
    <div grid grid-cols-2 my-4 gap-2 v-if="secondCategory.length">
      <SColoredItem
        v-for="item in secondCategory"
        :label="item.quantity ? item.name : 'Категория 2'"
        :text="item.quantity || item.name"
        :key="item.name"
        bg="#4844FC"
        text-bg
      />
    </div>
    <div grid grid-cols-2 my-4 gap-2 v-if="thirdCategory.length">
      <SColoredItem
        v-for="item in thirdCategory"
        :label="item.quantity ? item.name : 'Категория 3'"
        :text="item.quantity || item.name"
        :key="item.name"
        bg="#FCD844"
        text-primary
      />
    </div>
  </div>
</template>
