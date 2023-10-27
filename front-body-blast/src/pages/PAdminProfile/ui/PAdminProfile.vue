<script setup lang="ts">
import { pick } from 'lodash';
import { FSearchPanel } from 'features/FSearchPanel';
import { EAdminProfileList } from 'entities/admin/profile';
import { ESelfProfileCard } from 'entities/profile/ESelfProfileCard';
import { useAdminProfileStore } from 'shared/api/admin';
import { SWithHeaderLayout } from 'shared/ui/SWithHeaderLayout';

export interface PAdminProfileProps {}
defineProps<PAdminProfileProps>();

const profileStore = useAdminProfileStore();
profileStore.getUserProfiles();
const cards = computed(() => profileStore.userProfilesFetchState.data?.data.map((el) => pick(el, 'name')));
</script>
<template>
  <SWithHeaderLayout>
    <template #header>
      <ESelfProfileCard pt-4rem />
    </template>
    <template #body>
      <FSearchPanel my-1.5rem p-1.5rem />
      <EAdminProfileList :cards="cards!" />
    </template>
  </SWithHeaderLayout>
</template>
