<script setup lang="ts">
import { RouterLinkProps } from 'vue-router';
import { SBtn } from 'shared/ui/btns';
import { SUnitedProfileCard, SUnitedProfileCardProps } from 'shared/ui/SUnitedProfileCard';

export interface UserProfileCardProps extends Omit<SUnitedProfileCardProps, 'header' | 'describe'> {
  name: string;
  to: RouterLinkProps['to'];
}
defineProps<UserProfileCardProps>();
</script>

<template>
  <SUnitedProfileCard v-bind="$props" :header="name" :describe="$t('admin.profile.list.describe')">
    <template #action>
      <div flex flex-row justify-between>
        <SBtn icon="sym_r_help" bg="bg!" :to="to" />
        <SBtn icon="sym_r_delete" />
      </div>
    </template>
  </SUnitedProfileCard>
</template>
