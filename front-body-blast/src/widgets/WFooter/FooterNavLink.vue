<script setup lang="ts">
defineProps<{
  icon: string;
  title: string;
}>();
</script>

<template>
  <a text-center>
    <q-icon :name="icon" />
    <p>{{ title }}</p>
  </a>
</template>
