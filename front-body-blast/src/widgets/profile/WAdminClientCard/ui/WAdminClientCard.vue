<script setup lang="ts">
import { RouterLinkProps } from 'vue-router';
import { EUnitedProfileCard, EUnitedProfileCardProps } from 'entities/profile/EUnitedProfileCard';
import { SBtn } from 'shared/ui/btns';

export interface UserProfileCardProps extends Omit<EUnitedProfileCardProps, 'header' | 'describe'> {
  name: string;
  to: RouterLinkProps['to'];
}
defineProps<UserProfileCardProps>();
</script>

<template>
  <EUnitedProfileCard v-bind="$props" :header="name" :describe="$t('admin.profile.list.describe')">
    <template #action>
      <div flex flex-row justify-between>
        <SBtn icon="sym_r_help" bg="bg!" :to="to" />
        <SBtn icon="sym_r_delete" />
      </div>
    </template>
  </EUnitedProfileCard>
</template>
