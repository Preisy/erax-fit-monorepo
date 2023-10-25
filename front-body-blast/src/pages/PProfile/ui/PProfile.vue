<script setup lang="ts">
import { date } from 'quasar';
import { WAthropometrics } from 'widgets/profile/WAthropometrics';
import { EProfileHeader } from 'entities/profile/EProfileHeader';
const today = date.formatDate(Date.now(), 'DD.MM');
const props = [
  { editable: false, weight: 10, tdate: '12.10' },
  { editable: false, weight: 10, tdate: '22.10' },
  { editable: true, weight: 10, tdate: today },
];
</script>
<template>
  <EProfileHeader />
  <WAthropometrics :slides="props" />
</template>
