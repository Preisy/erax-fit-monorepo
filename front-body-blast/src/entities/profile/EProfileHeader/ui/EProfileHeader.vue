<script setup lang="ts">
import { SBtn } from 'shared/ui/SBtn';
export interface EProfileHeaderProps {
  userName: string;
}
defineProps<EProfileHeaderProps>();
</script>

<template>
  <div m="[-0.5rem]" mb-0 border bg-primary p-6 text-bg>
    <h1 mb-0>{{ userName }}</h1>
    <p>Ученик</p>
    <div mt-4 flex justify-between>
      <SBtn icon="edit" class="bg-bg!" />
      <SBtn icon="sym_r_move_item" />
    </div>
  </div>
</template>
