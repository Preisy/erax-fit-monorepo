<script setup lang="ts">
import { SBtn } from 'shared/ui/Btns';
export interface EProfileHeaderProps {
  userName: string;
}
defineProps<EProfileHeaderProps>();
</script>

<template>
  <div m--2 mb-0 border bg-primary p-6 text-bg>
    <h1 mb-0>{{ userName }}</h1>
    <p>{{ $t('home.profile.header.student') }}</p>
    <div mt-4 flex justify-between>
      <SBtn icon="edit" class="bg-bg!" />
      <SBtn icon="sym_r_move_item" />
    </div>
  </div>
</template>
