<script setup lang="ts">
import { QBtnProps } from 'quasar';

export interface SBtnProps extends QBtnProps {}
defineProps<SBtnProps>();
</script>
<template>
  <q-btn v-bind="$props" rounded-1rem bg-secondary p-1rem text-0 text-primary>
    <slot />
  </q-btn>
</template>
