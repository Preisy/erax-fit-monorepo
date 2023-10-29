<script setup lang="ts">
import { WFooterNavBar } from 'widgets/WFooter';
</script>

<template>
  <q-layout view="hHh lpr fFf" px-0.5rem>
    <q-page-container h-screen>
      <RouterView />
    </q-page-container>
    <WFooterNavBar />
  </q-layout>
</template>
