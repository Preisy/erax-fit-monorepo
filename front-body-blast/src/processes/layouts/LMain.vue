<script setup lang="ts">
import PTraining from 'pages/PTraining.vue';
import { WFooter } from 'widgets/WFooter';
</script>

<template>
  <q-layout
    view="hHh lpr fFf"
    px-0.5rem
  >
    <q-page-container>
      <PTraining />
    </q-page-container>
    <WFooter />
  </q-layout>
</template>
