<script setup lang="ts">
import { EDietItem, ProductsByCategories } from 'entities/diet/EDietItem';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';

export interface WDietNutriotionProps {
  slides: {
    breakfast: ProductsByCategories;
    firstBreak: ProductsByCategories;
    lunch: ProductsByCategories;
    secondBreak: ProductsByCategories;
    dinner: ProductsByCategories;
  };
}
type propsKeys = keyof WDietNutriotionProps['slides'];
const props = defineProps<WDietNutriotionProps>();
const panels = computed((): propsKeys[] => {
  const sl: (keyof WDietNutriotionProps['slides'])[] = ['breakfast', 'firstBreak', 'lunch', 'secondBreak', 'dinner'];
  const cats: (keyof ProductsByCategories)[] = ['firstCategory', 'secondCategory', 'thirdCategory'];
  return sl.filter((slide) => cats.some((cat) => props.slides[slide][cat].length));
});
</script>

<template>
  <SStructure relative>
    <SSplide
      :options="{
        direction: 'ttb',
        height: '28rem',
        fixedHeight: 'auto',
        arrows: false,
        omitEnd: true,
        gap: '2rem',
      }"
      class="[&>ul>li:nth-child(5)]:hidden"
    >
      <SSplideSlide v-for="(panel, index) in panels" :key="index">
        <EDietItem :title="panel" v-bind="slides[panel]" class="mx-0!" />
      </SSplideSlide>
      <SSplideSlide>
        <div p-24 />
      </SSplideSlide>
    </SSplide>
  </SStructure>
</template>
