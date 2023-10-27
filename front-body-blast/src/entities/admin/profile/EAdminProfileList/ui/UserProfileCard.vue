<script setup lang="ts">
import { SBtn } from 'shared/ui/SBtn';
import { SUnitedProfileCard } from 'shared/ui/SUnitedProfileCard';

export interface UserProfileCardProps {
  name: string;
}
defineProps<UserProfileCardProps>();
</script>
<template>
  <SUnitedProfileCard :header="name" :describe="$t('admin.profile.list.describe')">
    <template #action>
      <div flex flex-row justify-between>
        <SBtn icon="sym_r_help" bg="bg!" />
        <SBtn icon="sym_r_delete" />
      </div>
    </template>
  </SUnitedProfileCard>
</template>
