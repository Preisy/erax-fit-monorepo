<script setup lang='ts'>
export interface SCardProps{
  title: string;
  value: string;
}
defineProps<SCardProps>()
</script>
<template>
  <div
    flex
    flex-col
    items-center
    gap-0.5rem
    rounded-1rem
    bg-primary
    px-1.25rem
    py-1rem
    text-bg 
  >
    <p class="title">
      {{ title }}
    </p>
    <h2 class="value">
      {{ value }}
    </h2>
  </div>
</template>