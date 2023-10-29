<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useI18n } from 'vue-i18n';
import {
  EBodyParamsSignUpForm,
  ECredentialsSignUpForm,
  EDiseasesSignUpForm,
  EForbiddensSignUpForm,
  EMotivationsSignUpForm,
} from 'entities/client';
import { BodyParams, Diseases, Forbiddens, Motivations, SignUp, useAuthStore } from 'shared/api/auth';
import { SForm, SFormProps } from 'shared/ui/SForm';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';

const authStore = useAuthStore();
const { t } = useI18n();

type RegisterSlides = Array<{
  is: Component;
  formProps: Omit<SFormProps, 'loading'> & { loading: Ref<SFormProps['loading']> } & Pick<
      InstanceType<typeof SForm>,
      'onSubmit'
    >;
}>;

const slides: RegisterSlides = [
  {
    is: ECredentialsSignUpForm,
    formProps: {
      fieldSchema: toTypedSchema(SignUp.validation(t('auth.signUp.credentials.errors.passwordMismatch'))),
      onSubmit: authStore.signUp,
      loading: computed(() => authStore.signUpState.state.isLoading()),
    },
  },
  {
    is: EBodyParamsSignUpForm,
    formProps: {
      fieldSchema: toTypedSchema(BodyParams.validation()),
      onSubmit: authStore.sendBodyParams,
      loading: computed(() => authStore.bodyParamsState.state.isLoading()),
    },
  },
  {
    is: EForbiddensSignUpForm,
    formProps: {
      fieldSchema: toTypedSchema(Forbiddens.validation()),
      onSubmit: authStore.sendForbiddens,
      loading: computed(() => authStore.forbiddensState.state.isLoading()),
    },
  },
  {
    is: EDiseasesSignUpForm,
    formProps: {
      fieldSchema: toTypedSchema(Diseases.validation()),
      onSubmit: authStore.sendBodyParams,
      loading: computed(() => authStore.bodyParamsState.state.isLoading()),
    },
  },
  {
    is: EMotivationsSignUpForm,
    formProps: {
      fieldSchema: toTypedSchema(Motivations.validation()),
      onSubmit: authStore.sendMotivations,
      loading: computed(() => authStore.motivationsState.state.isLoading()),
    },
  },
];
</script>

<template>
  <SStructure relative>
    <SSplide :options="{ direction: 'ttb', height: '28rem', arrows: false }">
      <SSplideSlide v-for="(slide, index) in slides" :key="index">
        {{ slide.formProps }}
        <SForm v-bind="slide.formProps" :loading="slide.formProps.loading.value">
          <component :is="slide.is" />
        </SForm>
      </SSplideSlide>
    </SSplide>
  </SStructure>
</template>
