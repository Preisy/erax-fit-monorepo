<script setup lang="ts">
import { EClientProfileCard } from 'entities/admin/profile';
import { useAdminProfileStore } from 'shared/api/admin';
import { SBtnToggle } from 'shared/ui/SBtnToggle';
import { SWithHeaderLayout } from 'shared/ui/SWithHeaderLayout';

const id = parseInt(useRoute().params.id as string);
const profileStore = useAdminProfileStore();
if (!profileStore.clientProfiles.state.isSuccess()) profileStore.getUserProfiles();
const me = computed(() => profileStore.clientProfiles.data?.data.at(id) ?? { name: 'Loading...' });

const accessToLearning = ref<boolean>(false);
const diaryInterval = ref<number>(3);
</script>

<template>
  <SWithHeaderLayout>
    <template #header>
      <EClientProfileCard :name="me?.name" dark mx--0.5rem px-2rem pt-4rem />
    </template>
    <template #body>
      <div px-1.5rem>
        <div py-1.5rem>
          <!-- Access to learning section -->
          <p mb-0.5rem>{{ $t('admin.detailed.accessTitle') }}</p>
          <SBtnToggle
            v-model="accessToLearning"
            :options="[
              { value: false, label: $t('admin.detailed.accessToggle.disable') },
              { value: true, label: $t('admin.detailed.accessToggle.enable') },
            ]"
          />
          <p mb-0.5rem mt-1rem>{{ $t('admin.detailed.anthropometryTitle') }}</p>
          <SBtnToggle
            v-model="diaryInterval"
            :options="[
              { value: 3, label: '3' },
              { value: 7, label: '7' },
              { value: 10, label: '10' },
              { value: 14, label: '14' },
              { value: 20, label: '20' },
            ]"
          />
        </div>
      </div>
    </template>
  </SWithHeaderLayout>
</template>
