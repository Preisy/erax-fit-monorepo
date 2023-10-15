<script setup lang="ts">
import { SCard } from 'shared/ui/SCard';
import { Info } from '../model';
defineProps<{
  info: Info;
}>();
</script>
<template>
  <div flex flex-row flex-wrap gap-0.5rem>
    <SCard title="Вес" :value="`${info.weight} кг`" />
    <SCard title="Сеты" :value="info.sets" />
    <SCard title="Повторения" :value="info.repeats" />
    <SCard title="Отдых" :value="info.rest" />
    <SCard title="Темп" :value="info.temp" />
  </div>
</template>
