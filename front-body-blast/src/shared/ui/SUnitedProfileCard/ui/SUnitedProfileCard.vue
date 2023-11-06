<script setup lang="ts">
import { SBtn } from 'shared/ui/btns';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';

export interface SUnitedProfileCardProps {
  header: string;
  describe: string;
  dark?: boolean;
}
defineProps<SUnitedProfileCardProps>();
</script>

<template>
  <SComponentWrapper class="s-united-profile-card" :class="{ ' bg-primary text-bg': dark }">
    <div mb-1rem>
      <h1>{{ header }}</h1>
      <p>{{ describe }}</p>
    </div>
    <div>
      <slot name="action" />
      <div v-if="!$slots.action" flex justify-between>
        <SBtn icon="sym_r_edit" bg="bg!" />
        <SBtn icon="sym_r_logout" />
      </div>
    </div>
  </SComponentWrapper>
</template>
