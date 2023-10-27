<script setup lang="ts">
import { FSearchPanel } from 'features/FSearchPanel';
import { EAdminProfileList } from 'entities/admin/profile';
import { ESelfProfileCard } from 'entities/profile/ESelfProfileCard';
import { useAdminProfileStore } from 'shared/api/admin';
import { SWithHeaderLayout } from 'shared/ui/SWithHeaderLayout';

export interface PAdminProfileProps {}
defineProps<PAdminProfileProps>();

const profileStore = useAdminProfileStore();
profileStore.getUserProfiles();
const state = profileStore.userProfilesFetchState;

const nameFilter = ref<string>('');
const cards = computed(() => {
  let _cards = state.data?.data;
  if (nameFilter.value && _cards)
    _cards = _cards.filter((card) => card.name.toLocaleLowerCase().includes(nameFilter.value.toLocaleLowerCase()));
  return _cards;
});
watch(nameFilter, console.log);
</script>
<template>
  <SWithHeaderLayout>
    <template #header>
      <ESelfProfileCard pt-4rem />
    </template>
    <template #body>
      <FSearchPanel my-1.5rem p-1.5rem v-model:query="nameFilter" />
      <EAdminProfileList :cards="cards!" v-if="state.state.isSuccess()" />

      <!-- TODO: remove this progres, create some from design -->
      <q-circular-progress
        size="50px"
        color="lime"
        class="q-ma-md"
        indeterminate
        absolute
        left="50%"
        translate-x="-50%"
        top="50%"
        rounded
        v-if="state.state.isLoading()"
      />
    </template>
  </SWithHeaderLayout>
</template>
