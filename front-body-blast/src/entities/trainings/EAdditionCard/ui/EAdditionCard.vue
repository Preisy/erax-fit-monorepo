<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Addition } from 'shared/api/training';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';
import { useLocalAdditionStore } from '../store';

const validationSchema = toTypedSchema(Addition.validation());
const additionStore = useLocalAdditionStore();
const state = additionStore.requestState;
</script>
<template>
  <div>
    <h1 mb-1rem>{{ $t('dashboard.trainings.addition.title') }}</h1>
    <SForm :action="additionStore.sendRequest" :field-schema="validationSchema" :loading="state.state.isLoading()">
      <SInput name="message" :placeholder="$t('dashboard.trainings.addition.input')" />
    </SForm>
  </div>
</template>
