<script setup lang='ts'>
import { SInput } from 'shared/ui/SInput';
const input = ref();
</script>
<template>
  <div>
    <h1 mb-1rem>
      Хотите что-то добавить?
    </h1>
    <SInput
      v-model="input"
      placeholder="Введите текст"
    />
  </div>
</template>