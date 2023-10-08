<script setup lang='ts'>
import { SCard, SCardProps } from 'shared/ui/SCard';
import { Info } from '../model';
const props = defineProps<{
  info: Info
}>();
const titles = ['Вес', 'Сеты', 'Повторения', 'Отдых', 'Темп'];
const cards = Object.keys(props.info).map<SCardProps>((el, index)=>({title: titles[index], value: props.info[el as keyof Info]}))
</script>
<template>
  <div
    flex
    flex-row
    flex-wrap
    gap-0.5rem
  >
    <SCard
      v-for="card in cards"
      :key="card.title"
      v-bind="card"
    />
  </div>
</template>