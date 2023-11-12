<script setup lang="ts">
import { WAdminClientCard } from 'widgets/profile/WAdminClientCard';
import { FSearchPanel } from 'features/FSearchPanel';
import { EUnitedProfileCard } from 'entities/profile/EUnitedProfileCard';
import { useAdminProfileStore } from 'shared/api/admin';
import { ENUMS } from 'shared/lib/enums';
import { SStructure } from 'shared/ui/SStructure';
import { SWithHeaderLayout } from 'shared/ui/SWithHeaderLayout';

export interface PAdminProfileProps {}
defineProps<PAdminProfileProps>();

const profileStore = useAdminProfileStore();
profileStore.getUserProfiles();
const { clientProfiles } = profileStore;

const nameFilter = ref<string>('');
const cards = computed(() => {
  let _cards = clientProfiles.data?.data;
  if (nameFilter.value && _cards)
    _cards = _cards.filter((card) => card.name.toLocaleLowerCase().includes(nameFilter.value.toLocaleLowerCase()));
  return _cards;
});
</script>

<template>
  <SStructure h-full>
    <SWithHeaderLayout>
      <template #header>
        <EUnitedProfileCard header="Андрей Ерхатин" describe="Администратор" dark mx--0.5rem px-2rem pt-4rem />
      </template>
      <template #body>
        <FSearchPanel my-1.5rem v-model:query="nameFilter" />

        <div v-if="clientProfiles.state.isSuccess() || cards?.length">
          <WAdminClientCard
            v-for="user in cards"
            :key="user.name"
            :name="user.name"
            :to="{ name: ENUMS.ROUTES_NAMES.ADMIN_DETAILED, params: { id: user.id } }"
          />
        </div>
      </template>
    </SWithHeaderLayout>
  </SStructure>
</template>
