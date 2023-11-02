<script setup lang="ts">
import { SColoredItem } from 'shared/ui/SColoredItem';
export interface EDietItemProps {
  title: string;
  firstCategory: string[];
  secondCategory: string[];
  thirdCategory: string[];
}
defineProps<EDietItemProps>();
</script>

<template>
  <div>
    <h1 px-6 pt-3>{{ title }}</h1>
    <div grid grid-cols-2 mx-6 my-4 gap-2 v-if="firstCategory.length">
      <SColoredItem v-for="item in firstCategory" label="Категория 1" :text="item" :key="item" bg-primary text-bg />
    </div>
    <div grid grid-cols-2 mx-6 my-4 gap-2 v-if="secondCategory.length">
      <SColoredItem v-for="item in secondCategory" label="Категория 2" :text="item" :key="item" bg="#4844FC" text-bg />
    </div>
    <div grid grid-cols-2 mx-6 my-4 gap-2 v-if="thirdCategory.length">
      <SColoredItem
        v-for="item in thirdCategory"
        label="Категория 3"
        :text="item"
        :key="item"
        bg="#FCD844"
        text-primary
      />
    </div>
  </div>
</template>
