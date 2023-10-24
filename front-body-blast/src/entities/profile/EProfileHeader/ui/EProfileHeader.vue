<script setup lang="ts">
import { SBtn } from 'shared/ui/SBtn';
</script>

<template>
  <div m="[-0.5rem]" mb-0 border bg-primary p-6 text-bg>
    <h1 mb-0>Имя пользователя</h1>
    <p>Ученик</p>
    <div mt-4 flex justify-between>
      <SBtn icon="edit" class="bg-bg!" />
      <SBtn icon="sym_r_move_item" />
    </div>
  </div>
</template>
