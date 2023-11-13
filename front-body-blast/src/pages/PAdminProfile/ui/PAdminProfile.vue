<script setup lang="ts">
import { FSearchPanel } from 'features/FSearchPanel';
import { EUnitedProfileCard } from 'entities/profile/EUnitedProfileCard';
import { useAdminProfileStore } from 'shared/api/admin';
import { ENUMS } from 'shared/lib/enums';
import { useLoading } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SStructure } from 'shared/ui/SStructure';
import { SWithHeaderLayout } from 'shared/ui/SWithHeaderLayout';

export interface PAdminProfileProps {}
defineProps<PAdminProfileProps>();

const profileStore = useAdminProfileStore();
const { clientProfiles } = profileStore;
useLoading(clientProfiles);
profileStore.getUserProfiles();

const nameFilter = ref<string>('');
const cards = computed(
  () =>
    clientProfiles.data?.data.filter((card) =>
      card.name.toLocaleLowerCase().includes(nameFilter.value.toLocaleLowerCase()),
    ),
);

const edit = () => {
  console.log('onedit click');
};
const logout = () => {
  console.log('logout click');
};
</script>

<template>
  <SStructure h-full>
    <SWithHeaderLayout>
      <template #header>
        <EUnitedProfileCard
          header="Андрей Ерхатин"
          :describe="$t('home.profile.header.admin')"
          dark
          mx--0.5rem
          px-2rem
          pt-4rem
        >
          <template #action>
            <SBtn icon="sym_r_edit" @click="edit" bg="bg!" />
            <SBtn icon="sym_r_logout" @click="logout" float-right />
          </template>
        </EUnitedProfileCard>
      </template>
      <template #body>
        <FSearchPanel v-model:query="nameFilter" />

        <div v-if="clientProfiles.state.isSuccess() || cards?.length">
          <EUnitedProfileCard
            v-for="user in cards"
            v-bind="$props"
            :key="user.name"
            :header="user.name"
            :describe="$t('home.profile.header.student')"
          >
            <template #action>
              <div flex flex-row justify-between>
                <SBtn
                  icon="sym_r_help"
                  bg="bg!"
                  :to="{ name: ENUMS.ROUTES_NAMES.ADMIN_DETAILED, params: { id: user.id } }"
                />
                <SBtn icon="sym_r_delete" />
              </div>
            </template>
          </EUnitedProfileCard>
        </div>

        <SNoResultsScreen v-else />
      </template>
    </SWithHeaderLayout>
  </SStructure>
</template>
