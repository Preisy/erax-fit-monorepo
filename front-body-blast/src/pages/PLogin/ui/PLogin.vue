<script setup lang="ts">
import { ELoginForm } from 'entities/auth/ELoginForm';
import { SStructure } from 'shared/ui/SStructure';
</script>

<template>
  <SStructure relative mt--6.5rem h-screen flex items-center justify-center>
    <ELoginForm w-full />
  </SStructure>
</template>
