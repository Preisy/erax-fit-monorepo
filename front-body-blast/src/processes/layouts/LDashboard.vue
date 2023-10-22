<script setup lang="ts">
import { WFooter } from 'widgets/WFooter';
</script>

<template>
  <q-layout view="hHh lpr fFf" px-0.5rem>
    <q-page-container h-screen>
      <RouterView />
    </q-page-container>
    <WFooter />
  </q-layout>
</template>
