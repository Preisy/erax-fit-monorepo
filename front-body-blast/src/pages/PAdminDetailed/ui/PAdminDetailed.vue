<script setup lang="ts">
import { date } from 'quasar';
import { WAthropometrics } from 'widgets/profile/WAthropometrics';
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

const antSlides = [
  {
    readonly: true,
    dateValue: '2023/10/12',
    profile: { weight: 10, waist: 10, underbelly: 10, shoulder: 10, hip: 10, hipVolume: 10 },
  },
  {
    readonly: true,
    dateValue: '2023/10/22',
    profile: { weight: 12, waist: 12, underbelly: 12, shoulder: 12, hip: 12, hipVolume: 12 },
  },
  {
    readonly: false,
    dateValue: date.formatDate(Date.now(), 'YYYY/MM/DD'),
    profile: { weight: 15, waist: 15, underbelly: 15, shoulder: 15, hip: 15, hipVolume: 15 },
  },
];
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

        <WAthropometrics :slides="antSlides" />
      </div>
    </template>
  </SWithHeaderLayout>
</template>
