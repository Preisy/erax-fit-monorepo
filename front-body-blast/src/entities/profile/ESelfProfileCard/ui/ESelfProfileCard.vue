<script setup lang="ts">
import { SUnitedProfileCard } from 'shared/ui/SUnitedProfileCard';

const header = ref('Андрей Ерхатин');
const describe = ref('Администратор');
</script>
<template>
  <SUnitedProfileCard :header="header" :describe="describe" mx--0.5rem bg-primary px-2rem text-bg />
</template>
