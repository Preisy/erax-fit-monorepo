<script setup lang="ts">
import { WAdminNavFooter } from 'widgets/WAdminNavFooter';
import { WFooter } from 'widgets/WFooter';
</script>

<template>
  <q-layout view="hHh lpr fFf" px-0.5rem>
    <q-page-container h-screen>
      <RouterView />
    </q-page-container>
    <WFooter v-if="$route.path.includes('home')" />
    <WAdminNavFooter v-if="$route.path.includes('admin')" />
  </q-layout>
</template>
