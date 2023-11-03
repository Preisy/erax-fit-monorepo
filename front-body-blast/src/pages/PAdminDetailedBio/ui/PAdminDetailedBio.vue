<script setup lang="ts">
import { symRoundedClose } from '@quasar/extras/material-symbols-rounded';
import { toTypedSchema } from '@vee-validate/zod';
import {
  EBodyParamsSignUpForm,
  EDiseasesSignUpForm,
  EForbiddensSignUpForm,
  EMotivationsSignUpForm,
} from 'entities/profile/form';
import { BodyParams, Diseases, Forbiddens, Motivations } from 'shared/api/auth';
import { ENUMS } from 'shared/lib/enums';
import { SBtn } from 'shared/ui/SBtn';
import { SForm, SFormProps } from 'shared/ui/SForm';

const forms: Array<{ is: Component; form: Pick<SFormProps, 'fieldSchema'>; values: Record<string, unknown> }> = [
  {
    is: EBodyParamsSignUpForm,
    form: { fieldSchema: toTypedSchema(BodyParams.validation()) },
    values: {
      age: 20,
      teenAgeWeight: 500,
      weight: 999,
    },
  },
  {
    is: EForbiddensSignUpForm,
    form: { fieldSchema: toTypedSchema(Forbiddens.validation()) },
    values: {
      allergic: 'Some meaningful text',
      diet: 'Another very important text',
      intolerance: 'Intolerance to tolerance',
    },
  },
  {
    is: EDiseasesSignUpForm,
    form: { fieldSchema: toTypedSchema(Diseases.validation()) },
    values: {
      diseasesCVD: 'No',
      diseasesODA: 'No',
      gastrointestinalDiseases: 'No',
      insulinResistance: 'No',
      kidneyDisease: 'No',
    },
  },
  {
    is: EMotivationsSignUpForm,
    form: { fieldSchema: toTypedSchema(Motivations.validation()) },
    values: {
      loadRestrictions: 'Restricted to any intelligence work',
      sportExperience: 'Active 20h per day sleeping',
      targets: 'Become 2m 120kg muscle monster asap',
    },
  },
];
</script>

<template>
  <div px-0.5rem py-1rem>
    <SBtn :icon="symRoundedClose" ml--0.5rem :to="{ name: ENUMS.ROUTES_NAMES.ADMIN_DETAILED }" />
    <div v-for="form in forms" :key="form.is.name" mt-1rem>
      <SForm :readonly="true" :field-schema="form.form.fieldSchema" :init-values="form.values">
        <component :is="form.is" />
      </SForm>
    </div>
  </div>
</template>
