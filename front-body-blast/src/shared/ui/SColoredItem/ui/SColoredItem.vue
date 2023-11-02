<script setup lang="ts">
export interface SColoredItemProps {
  label: string;
  text: string;
}
defineProps<SColoredItemProps>();
</script>

<template>
  <div relative rounded-4 bg-primary px-6 py-4 text-center>
    <p ellipsis absolute w-full left="1/2" scale="3/4" translate-x="-1/2" translate-y="-1/3">{{ label }}</p>
    <p pt-2 font-600>{{ text }}</p>
  </div>
</template>
