<script setup lang="ts">
import { SBtn } from 'shared/ui/SBtn';
import { SInput } from 'shared/ui/SInput';
</script>

<template>
  <div grid grid-cols-2 mt-8 gap-2>
    <SInput name="weight" label="Вес" centered />
    <SInput name="waist" label="Талия" centered />
    <SInput name="underbelly" label="Низ живота" centered />
    <SInput name="shoulder" label="Плечо" centered />
    <SInput name="hip" label="Бедро" centered />
    <SInput name="hipVolume" label="Обьем бедер" centered />
  </div>
  <div mt-2 flex justify-end>
    <SBtn icon="done" />
  </div>
</template>

<!-- .q-field--dense.q-field--float .q-field__label -->
<!--  -->
