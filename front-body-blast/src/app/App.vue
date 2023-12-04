<script setup lang="ts">
import 'virtual:uno.css';
const $q = useQuasar();

$q.screen.setSizes({ sm: 450, md: 900, lg: 1280, xl: 1440 });
</script>

<template>
  <router-view />
</template>
