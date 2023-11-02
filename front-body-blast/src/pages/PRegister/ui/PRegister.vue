<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useI18n } from 'vue-i18n';
import {
  EBodyParamsSignUpForm,
  ECredentialsSignUpForm,
  EDiseasesSignUpForm,
  EForbiddensSignUpForm,
  EMotivationsSignUpForm,
} from 'entities/profile';
import { BodyParams, Diseases, Forbiddens, Motivations, Credentials, useAuthStore } from 'shared/api/auth';
import { SBtn } from 'shared/ui/SBtn';
import { SForm, SFormProps } from 'shared/ui/SForm';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';

const authStore = useAuthStore();
const { t } = useI18n();

type RegisterSlides = Array<{
  is: Component;
  formProps: Omit<SFormProps, 'loading'> & { loading?: Ref<SFormProps['loading']> } & Pick<
      InstanceType<typeof SForm>,
      'onSubmit'
    >;
}>;

const slides: RegisterSlides = [
  {
    is: ECredentialsSignUpForm,
    formProps: {
      fieldSchema: toTypedSchema(Credentials.validation(t('auth.signUp.credentials.errors.passwordMismatch'))),
      onSubmit: authStore.applyCredentials,
    },
  },
  {
    is: EBodyParamsSignUpForm,
    formProps: {
      fieldSchema: toTypedSchema(BodyParams.validation()),
      onSubmit: authStore.applyBodyParams,
    },
  },
  {
    is: EForbiddensSignUpForm,
    formProps: {
      fieldSchema: toTypedSchema(Forbiddens.validation()),
      onSubmit: authStore.applyForbiddens,
    },
  },
  {
    is: EDiseasesSignUpForm,
    formProps: {
      fieldSchema: toTypedSchema(Diseases.validation()),
      onSubmit: authStore.applyDiseases,
    },
  },
  {
    is: EMotivationsSignUpForm,
    formProps: {
      fieldSchema: toTypedSchema(Motivations.validation()),
      onSubmit: (data) => {
        authStore.applyMotivations(data);
        submitBtnsExceptLast.value.forEach((btn) => btn.click());
        authStore.signUp();
      },
    },
  },
];

const submitBtns = ref<Array<InstanceType<typeof SBtn>>>([]);
const submitForms = ref<Array<InstanceType<typeof SForm>>>([]);
const submitBtnsExceptLast = computed(() => submitBtns.value.slice(0, -1));
</script>

<template>
  <SStructure relative>
    <SSplide :options="{ direction: 'ttb', height: '28rem', arrows: false }">
      <SSplideSlide v-for="(slide, index) in slides" :key="index">
        <SForm v-bind="slide.formProps" :loading="false" ref="submitForms">
          <component :is="slide.is" />
          <template #submit-btn>
            <SBtn
              ref="submitBtns"
              icon="done"
              type="submit"
              @click="(event) => submitForms[index].handleSubmit(slides[index].formProps.onSubmit!)(event)"
              mt-0.5rem
              self-end
            />
          </template>
        </SForm>
      </SSplideSlide>
    </SSplide>
  </SStructure>
</template>
