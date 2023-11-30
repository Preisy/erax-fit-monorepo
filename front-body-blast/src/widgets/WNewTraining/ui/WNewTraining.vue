<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { assign, uniqueId } from 'lodash';
import { useI18n } from 'vue-i18n';
import { FListControls } from 'features/FListControls';
import { FNewTrainingFields } from 'features/FNewTrainingFields';
import { AdminTraining, Exercise, useAdminPromptStore, useAdminTrainingStore, Training } from 'shared/api/admin';
import { useLoading } from 'shared/lib/loading';
import { GetZodInnerType } from 'shared/lib/utils';
import { SInput } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SForm } from 'shared/ui/SForm';

const adminTrainingStore = useAdminTrainingStore();
const { prompts, getPrompts } = useAdminPromptStore();
const { t } = useI18n();

const exercises = ref<Array<InstanceType<typeof SForm>>>();
const trainings = ref<Array<Partial<Exercise & { key: string }>>>([{ key: uniqueId('prompt-') }]);
const onsubmit = (values: GetZodInnerType<typeof AdminTraining.validation>) => {
  exercises.value?.forEach((exerciseForm, index) =>
    exerciseForm.handleSubmit((values: GetZodInnerType<typeof Exercise.validation>) => {
      //TODO: change prompt.type === values.type on something meaningful
      const prompt = prompts.data?.data.find((prompt) => prompt.type === values.type);
      const exercise: Exercise = {
        name: 'DUNNO',
        pace: values.pace,
        photoLink: prompt?.photoLink ?? '',
        videoLink: prompt?.videoLink ?? '',
        repeats: values.repeats,
        restTime: parseInt(values.restTime),
        sets: parseInt(values.sets),
        trainerComment: values.trainerComment,
        weight: parseInt(values.weight),
      };

      assign(trainings.value[index], exercise);
    })(),
  );

  const training: Training = {
    name: 'Dunno',
    comment: 'dunno',
    date: 'dunno', //TODO: fix
    exercises: trainings.value as unknown as Exercise[], //TODO: fix
    loop: parseInt(values.cycle),
    userId: 0, //TODO: fix - pick from querry
  };
  adminTrainingStore.sendTraining(training);
};
const onadd = () => trainings.value.push({ key: uniqueId('prompt-') });
const onremove = (index: number) => trainings.value.splice(index, 1);

useLoading(prompts);
getPrompts({ type: 'string', page: 1, limit: 1000, expanded: false });
</script>

<template>
  <SComponentWrapper h-full flex flex-col gap-y-1rem>
    <h1>{{ $t('admin.prompt.training.training') }}</h1>

    <SForm @submit="onsubmit" :field-schema="toTypedSchema(AdminTraining.validation(t))" p="0!">
      <SInput name="cycle" :label="$t('admin.prompt.training.cycle')" />
      <SForm
        ref="exercises"
        v-for="(training, index) in trainings"
        :key="training.key"
        :field-schema="toTypedSchema(Exercise.validation(t))"
        p="0!"
      >
        <FNewTrainingFields :prompts="prompts.data?.data" />

        <template #submit-btn>
          <FListControls
            :disabled-add="index !== trainings.length - 1"
            :disabled-submit="index !== trainings.length - 1"
            @add="onadd"
            @remove="() => onremove(index)"
            mt-0.5rem
          />
        </template>
      </SForm>
      <!-- disable default submit -->
      <template #submit-btn />
    </SForm>
  </SComponentWrapper>
</template>
