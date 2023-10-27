<script setup lang="ts">
import { SInput } from 'shared/ui/SInput';

const input = ref();
</script>
<template>
  <div>
    <h1 mb-1rem>{{ $t('dashboard.trainings.addition.title') }}</h1>
    <SInput v-model="input" :placeholder="$t('dashboard.trainings.addition.input')" />
  </div>
</template>
