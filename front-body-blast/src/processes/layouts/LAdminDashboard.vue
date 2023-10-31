<script setup lang="ts">
import { WAdminFooterNavBar } from 'widgets/WAdminFooterNavBar';
import LDashboard from './LDashboard.vue';
</script>

<template>
  <LDashboard>
    <template #footer>
      <WAdminFooterNavBar />
    </template>
  </LDashboard>
</template>
