<script setup lang="ts">
import { SCard } from 'shared/ui/SCard';
import { Info } from '../model';
defineProps<{
  info: Info;
}>();
</script>
<template>
  <div flex flex-row flex-wrap gap-0.5rem>
    <SCard :title="$t('dashboard.trainings.infoBlock.weight')" :value="`${info.weight} кг`" />
    <SCard :title="$t('dashboard.trainings.infoBlock.sets')" :value="info.sets" />
    <SCard :title="$t('dashboard.trainings.infoBlock.repeats')" :value="info.repeats" />
    <SCard :title="$t('dashboard.trainings.infoBlock.rest')" :value="info.rest" />
    <SCard :title="$t('dashboard.trainings.infoBlock.temp')" :value="info.temp" />
  </div>
</template>
