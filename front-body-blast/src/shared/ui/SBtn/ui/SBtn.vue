<script setup lang="ts">
export interface SBtnProps {
  action?(event?: Event): void;
}
defineProps<SBtnProps>();
</script>
<template>
  <q-btn @click="action" rounded-1rem bg-secondary p-1rem text-0 text-primary>
    <slot />
  </q-btn>
</template>
