<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { assign, uniqueId } from 'lodash';
import { useI18n } from 'vue-i18n';
import { FListControls } from 'features/FListControls';
import { EAdminPromptThumbnail } from 'entities/EAdminPromptThumbnail';
import { AdminTraining, useAdminPromptStore, useAdminTrainingStore } from 'shared/api/admin';
import { useLoading } from 'shared/lib/loading';
import { SInput, SChooseInput } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SForm } from 'shared/ui/SForm';

const adminTrainingStore = useAdminTrainingStore();
const { prompts, getPrompts } = useAdminPromptStore();
const { t } = useI18n();

const trainings = ref<Array<Partial<AdminTraining & { key: string }>>>([{ key: uniqueId('prompt-') }]);
const onsubmit = (values: object, index: number) => assign(trainings.value[index], values);
const onadd = () => trainings.value.push({ key: uniqueId('prompt-') });
const onremove = (index: number) => trainings.value.splice(index, 1);

useLoading(prompts);
getPrompts();

const promptValue = ref<string>();
const updateValue = (next: string) => (promptValue.value = next);
</script>

<template>
  <SComponentWrapper h-full flex flex-col gap-y-1rem>
    <h1>{{ $t('admin.prompt.training.training') }}</h1>
    <SChooseInput name="cycle" :label="$t('admin.prompt.training.cycle')" :model-value="promptValue">
      <div v-for="prompt in prompts.data" :key="prompt.type" @click="() => updateValue(prompt.type)" mr-0.5rem>
        <EAdminPromptThumbnail :photo="prompt.photo as string" :type="prompt.type" />
      </div>
    </SChooseInput>

    <SForm
      :field-schema="toTypedSchema(AdminTraining.validation(t))"
      p="0!"
      @submit="(values) => onsubmit(values, index)"
      v-for="(training, index) in trainings"
      :key="training.key"
    >
      <SInput name="type" :label="$t('admin.prompt.training.type')" />
      <div grid grid-cols-2 grid-rows-3 gap-0.5rem>
        <SInput name="date" :label="$t('admin.prompt.training.date')" />
        <SInput name="weight" :label="$t('admin.prompt.training.weight')" />
        <SInput name="sets" :label="$t('admin.prompt.training.sets')" />
        <SInput name="repeats" :label="$t('admin.prompt.training.repeats')" />
        <SInput name="restTime" :label="$t('admin.prompt.training.restTime')" />
        <SInput name="pace" :label="$t('admin.prompt.training.pace')" />
      </div>
      <SInput name="commentary" :label="$t('admin.prompt.training.commentary')" />

      <template #submit-btn>
        <FListControls
          :disabled-add="index !== trainings.length - 1"
          @add="onadd"
          mt-0.5rem
          @remove="() => onremove(index)"
        />
        <!--TODO: What if last deleted? Disable deleting? Clear form?-->
      </template>
    </SForm>
  </SComponentWrapper>
</template>
