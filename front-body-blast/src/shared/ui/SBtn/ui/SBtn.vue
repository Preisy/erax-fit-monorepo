<script setup lang="ts">
export interface SBtnProps {
  action?(): void;
}
defineProps<SBtnProps>();
</script>
<template>
  <q-btn
    @click="action"
    rounded-1rem
    bg-secondary
    p-1rem
    text-base
    text-primary
  >
    <slot />
  </q-btn>
</template>
