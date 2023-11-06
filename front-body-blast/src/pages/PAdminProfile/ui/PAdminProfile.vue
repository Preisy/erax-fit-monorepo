<script setup lang="ts">
import { FSearchPanel } from 'features/FSearchPanel';
import { EClientProfileCard } from 'entities/admin/profile';
import { useAdminProfileStore } from 'shared/api/admin';
import { ENUMS } from 'shared/lib/enums';
import { SStructure } from 'shared/ui/SStructure';
import { SUnitedProfileCard } from 'shared/ui/SUnitedProfileCard';
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
  <SStructure>
    <SWithHeaderLayout>
      <template #header>
        <SUnitedProfileCard header="Андрей Ерхатин" describe="Администратор" dark mx--0.5rem px-2rem pt-4rem />
      </template>
      <template #body>
        <FSearchPanel my-1.5rem v-model:query="nameFilter" />

        <div v-if="clientProfiles.state.isSuccess() || cards?.length">
          <EClientProfileCard
            v-for="user in cards"
            :key="user.name"
            :name="user.name"
            :to="{ name: ENUMS.ROUTES_NAMES.ADMIN_DETAILED, params: { id: user.id } }"
          />
        </div>

        <!-- TODO: remove this progres, create some from design -->
        <div flex justify-center>
          <q-circular-progress
            size="50px"
            color="lime"
            class="q-ma-md"
            indeterminate
            rounded
            v-if="clientProfiles.state.isLoading()"
          />
        </div>
      </template>
    </SWithHeaderLayout>
  </SStructure>
</template>
