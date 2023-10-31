<script setup lang="ts">
import { RouterLinkProps } from 'vue-router';
import { ENUMS } from 'shared/lib/enums';
import { SBtn } from 'shared/ui/SBtn';
import { SUnitedProfileCard, SUnitedProfileCardProps } from 'shared/ui/SUnitedProfileCard';

export interface UserProfileCardProps extends Omit<SUnitedProfileCardProps, 'header' | 'describe'> {
  id?: string | number;
  isOpen?: boolean;
  name: string;
}
const props = defineProps<UserProfileCardProps>();
const link: RouterLinkProps = { to: { name: ENUMS.ROUTES_NAMES.ADMIN_DETAILED, params: { id: props.id } } };
// if(props.isOpen) link.to = { name: ENUMS.ROUTES_NAMES.  };
</script>

<template>
  <SUnitedProfileCard v-bind="$props" :header="name" :describe="$t('admin.profile.list.describe')">
    <template #action>
      <div flex flex-row justify-between>
        <SBtn icon="sym_r_help" bg="bg!" :to="link.to" />
        <SBtn icon="sym_r_delete" />
      </div>
    </template>
  </SUnitedProfileCard>
</template>
