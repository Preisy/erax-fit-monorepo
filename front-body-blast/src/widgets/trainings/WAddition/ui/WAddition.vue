<script setup lang="ts">
import { SInput } from 'shared/ui/SInput';
import { SSwiperSlide } from 'shared/ui/SSwiperSlide'

const input = ref();
</script>
<template>
  <SSwiperSlide>
    <h1 mb-1rem>
      Хотите что-то добавить?
    </h1>
    <SInput
      v-model="input"
      placeholder="Введите текст"
    />
  </SSwiperSlide>
</template>
