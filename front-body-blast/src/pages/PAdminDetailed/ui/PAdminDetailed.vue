<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { merge } from 'lodash';
import moment from 'moment';
import { useI18n } from 'vue-i18n';
import { EAthropometricsItem } from 'entities/profile/EAthropometricsItem';
import { EUnitedProfileCard } from 'entities/profile/EUnitedProfileCard';
import { useAdminProfileStore } from 'shared/api/admin';
import { Anthropometry, useProfileStore } from 'shared/api/profile';
import { ENUMS } from 'shared/lib/enums';
import { useLoading } from 'shared/lib/loading';
import { SBtn, SBtnToggle } from 'shared/ui/btns';
import { SCalendar } from 'shared/ui/SCalendar';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SPaginationSlider } from 'shared/ui/SPaginationSlider';
import { SStructure } from 'shared/ui/SStructure';
import { SWithHeaderLayout } from 'shared/ui/SWithHeaderLayout';

const { t } = useI18n();
const id = parseInt(useRoute().params.id as string); //Current user id

const adminProfileStore = useAdminProfileStore();
useLoading(adminProfileStore.clientProfiles);

//if already have data in store -> don't need to fetch
//otherwise, if no data -> fetch some
if (!adminProfileStore.clientProfiles.state.isSuccess())
  adminProfileStore.getUserProfiles({ page: 1, limit: 1000, expanded: false });

const currentUser = computed(() => adminProfileStore.clientProfiles.data?.find((client) => client.id === id));
const currentUserName = computed(() => `${currentUser.value?.firstName} ${currentUser.value?.lastName}`);

const canWatchVideo = computed(() => currentUser.value?.canWatchVideo);
const anthrpJobPeriod = computed(() => currentUser.value?.anthrpJobPeriod);
const updateCanWatchVideo = (newValue: boolean) => {
  if (!currentUser.value) return;
  currentUser.value.canWatchVideo = newValue;
  adminProfileStore.patchUserProfile(currentUser.value);
};
const updateAnthrpJobPeriod = (newValue: number) => {
  if (!currentUser.value) return;
  currentUser.value.anthrpJobPeriod = newValue;
  adminProfileStore.patchUserProfile(currentUser.value);
};

const date = ref<string>(new Date().toISOString());
const canWatchVideoOptions = [
  { value: false, label: t('admin.detailed.accessToggle.disable') },
  { value: true, label: t('admin.detailed.accessToggle.enable') },
];
const anthrpJobPeriodOptions = [
  { value: 3, label: '3' },
  { value: 7, label: '7' },
  { value: 10, label: '10' },
  { value: 14, label: '14' },
];

const profileStore = useProfileStore();
const { anthropometry, getAnthropometry } = profileStore;

const index = ref(0);
const lock = computed(() => anthropometry.state.isLoading());
const slides = computed(
  () =>
    anthropometry.data?.data
      .filter((slide) => slide.userId === id)
      .map((slide) => merge(slide, { name: slide.id.toString() })) ?? null,
);

//TODO: need the big think
const update = () =>
  getAnthropometry({
    from: moment(date.value).subtract(1, 'M').toISOString(),
    to: moment(date.value).add(1, 'd').toISOString(),
  });
useLoading(anthropometry);
if (!slides.value) update();
</script>

<template>
  <SStructure h-full>
    <SWithHeaderLayout>
      <template #header>
        <EUnitedProfileCard
          v-bind="$props"
          :header="currentUserName ?? 'Loading...'"
          :describe="$t('home.profile.header.student')"
          dark
          mx--0.5rem
          px-2rem
          pt-4rem
        >
          <template #action>
            <div flex flex-row justify-between>
              <SBtn icon="sym_r_help" bg="bg!" :to="{ name: ENUMS.ROUTES_NAMES.ADMIN_DETAILED_BIO }" />
              <SBtn icon="sym_r_delete" />
            </div>
          </template>
        </EUnitedProfileCard>
      </template>
      <template #body>
        <SComponentWrapper py-1.5rem>
          <!-- Access to learning section -->
          <p mb-0.5rem>{{ $t('admin.detailed.accessTitle') }}</p>
          <SBtnToggle
            :model-value="canWatchVideo"
            @update:model-value="updateCanWatchVideo"
            :options="canWatchVideoOptions"
          />
          <p mb-0.5rem mt-1rem>{{ $t('admin.detailed.anthropometryTitle') }}</p>
          <SBtnToggle
            :model-value="anthrpJobPeriod"
            @update:model-value="updateAnthrpJobPeriod"
            :options="anthrpJobPeriodOptions"
          />
        </SComponentWrapper>

        <div>
          <SCalendar v-model="date" />
          <SPaginationSlider
            :slides="slides"
            :lock="lock"
            v-model="index"
            @first-element="update"
            @last-element="update"
          >
            <EAthropometricsItem
              v-if="slides"
              :profile="slides[index]"
              p="0!"
              readonly
              pointer-events-none
              select-none
            />
          </SPaginationSlider>
        </div>
      </template>
    </SWithHeaderLayout>
  </SStructure>
</template>
