<script setup lang="ts">
import { ENUMS } from 'shared/lib/enums';
import { SBtn } from 'shared/ui/SBtn';
import { SUnitedProfileCard } from 'shared/ui/SUnitedProfileCard';

export interface UserProfileCardProps {
  id: string | number;
  name: string;
}
const props = defineProps<UserProfileCardProps>();
const link = `${ENUMS.ROUTES.ADMIN.base}${ENUMS.ROUTES.ADMIN.children.PROFILE}/${props.id}`;
</script>
<template>
  <SUnitedProfileCard :header="name" :describe="$t('admin.profile.list.describe')">
    <template #action>
      <div flex flex-row justify-between>
        <SBtn icon="sym_r_help" bg="bg!" :to="link" />
        <SBtn icon="sym_r_delete" />
      </div>
    </template>
  </SUnitedProfileCard>
</template>
