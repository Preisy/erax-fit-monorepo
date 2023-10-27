<script setup lang="ts">
import { SBtn } from 'shared/ui/SBtn';

export interface SUnitedProfileCardProps {
  header: string;
  describe: string;
}
defineProps<SUnitedProfileCardProps>();
</script>
<template>
  <div class="s-united-profile-card" p-1.5rem>
    <div mb-1rem>
      <h1>{{ header }}</h1>
      <p>{{ describe }}</p>
    </div>
    <div>
      <slot name="action"></slot>
      <div v-if="!$slots.action" flex justify-between>
        <SBtn icon="sym_r_edit" bg="bg!" />
        <SBtn icon="sym_r_logout" />
      </div>
    </div>
  </div>
</template>
