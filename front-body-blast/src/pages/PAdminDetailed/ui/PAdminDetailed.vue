<script setup lang="ts">
import moment from 'moment';
import { Component } from 'vue';
import { WAthropometricsSlide } from 'widgets/profile/WAthropometrics';
import { EAthropometricsItem } from 'entities/profile/EAthropometricsItem';
import { EUnitedProfileCard } from 'entities/profile/EUnitedProfileCard';
import { useAdminProfileStore } from 'shared/api/admin';
import { ENUMS } from 'shared/lib/enums';
import { useLoading } from 'shared/lib/loading';
import { SBtn, SBtnToggle } from 'shared/ui/btns';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SPaginationSlider } from 'shared/ui/SPaginationSlider';
import { SStructure } from 'shared/ui/SStructure';
import { SWithHeaderLayout } from 'shared/ui/SWithHeaderLayout';

const id = parseInt(useRoute().params.id as string);
const profileStore = useAdminProfileStore();
useLoading(profileStore.clientProfiles);
if (!profileStore.clientProfiles.state.isSuccess()) profileStore.getUserProfiles();
const me = computed(() => profileStore.clientProfiles.data?.data.at(id) ?? { name: 'Loading...' });

const accessToLearning = ref<boolean>(false);
const diaryInterval = ref<number>(3);

//TODO: fixme↓
interface Slide {
  dateValue: string;
  profile: {
    weight: string | number;
    waist: string | number;
    underbelly: string | number;
    shoulder: string | number;
    hip: string | number;
    hipVolume: string | number;
  };
}
//Simulates infinite collection of slides(api)
class slideGenerator {
  genered = ref<Array<Slide>>([]);

  next = (): Slide => {
    const len = this.genered.value.length;
    return {
      dateValue: moment(this.genered.value.at(-1)?.dateValue)
        .add(-1, 'day')
        .toISOString(),
      profile: {
        weight: len,
        hip: len,
        hipVolume: len,
        shoulder: len,
        underbelly: len,
        waist: len,
      },
    };
  };
  nextN = (count: number = 3) => {
    for (let i = 0; i < count; i++) {
      const n = this.next();
      this.genered.value.push(n);
    }
  };

  constructor() {
    this.nextN();
  }
}

const generator = ref(new slideGenerator());
//current start/end to pick
const indexes = ref<{
  start: number;
  end: number;
}>({
  start: 0,
  end: 3,
});

//anthropometry slides -> pick N from generator
const antSlides = computed<Array<{ is: Component; props: WAthropometricsSlide; key: string }>>(() =>
  generator.value.genered
    .slice(Math.max(0, indexes.value.start - 1), indexes.value.end)
    .map((slide: WAthropometricsSlide) => {
      slide.readonly = true;
      return slide;
    })
    .map((slide) => ({ is: EAthropometricsItem, props: slide, key: slide.dateValue })),
);

//event listeners
const onLast = () => {
  indexes.value.start += 3;
  indexes.value.end += 3;
  if (indexes.value.end >= generator.value.genered.length) generator.value.nextN();
  console.log(generator.value.genered);
};
const onFirst = () => {
  indexes.value.start = Math.max(0, indexes.value.start - 3);
  indexes.value.end = Math.max(3, indexes.value.end - 3);
};
</script>

<template>
  <SStructure h-full>
    <SWithHeaderLayout>
      <template #header>
        <EUnitedProfileCard
          v-bind="$props"
          :header="me?.name"
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
        </SComponentWrapper>

        <SPaginationSlider
          :len="antSlides.length"
          :slides="antSlides"
          :user-select-none="true"
          @first-element="onFirst"
          @last-element="onLast"
        />
      </template>
    </SWithHeaderLayout>
  </SStructure>
</template>
