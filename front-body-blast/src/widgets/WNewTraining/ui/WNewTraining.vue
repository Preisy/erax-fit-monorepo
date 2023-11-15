<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { assign, uniqueId } from 'lodash';
import { useI18n } from 'vue-i18n';
import { FListControls } from 'features/FListControls';
import { AdminTraining, useAdminTrainingStore } from 'shared/api/admin';
import { SInput } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SForm } from 'shared/ui/SForm';

const adminTrainingStore = useAdminTrainingStore();
const { t } = useI18n();

const trainings = ref<Array<Partial<AdminTraining & { key: string }>>>([{ key: uniqueId('prompt-') }]);
const onsubmit = (values: object, index: number) => assign(trainings.value[index], values);
const onadd = () => trainings.value.push({ key: uniqueId('prompt-') });
const onremove = (index: number) => trainings.value.splice(index, 1);
</script>

<template>
  <SComponentWrapper h-full flex flex-col gap-y-1rem>
    <h1>Тренировка</h1>
    <SInput name="cycle" label="Цикл" />

    <SForm
      :field-schema="toTypedSchema(AdminTraining.validation(t))"
      p="0!"
      @submit="(values) => onsubmit(values, index)"
      v-for="(training, index) in trainings"
      :key="training.key"
    >
      <SInput name="type" label="Тип" />
      <div grid grid-cols-2 grid-rows-3 gap-0.5rem>
        <SInput name="date" label="Дата" />
        <SInput name="weight" label="Вес" />
        <SInput name="sets" label="Сеты" />
        <SInput name="repeats" label="Повторения" />
        <SInput name="restTime" label="Время отдыха" />
        <SInput name="pace" label="Темп" />
      </div>
      <SInput name="commentary" label="Примечания" />

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
