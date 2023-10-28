<script setup lang="ts">
import { EBodyParamsSignUpForm } from 'entities/auth/EBodyParamsSignUpForm';
import { ECredentialsSignUpForm } from 'entities/auth/ECredentialsSignUpForm';
import { EDiseasesSignUpForm } from 'entities/auth/EDiseasesSignUpForm';
import { EForbiddensSignUpForm } from 'entities/auth/EForbiddensSignUpForm';
import { EMotivationsSignUpForm } from 'entities/auth/EMotivationsSignUpForm';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';
</script>
<template>
  <SStructure relative>
    <SSplide :options="{ direction: 'ttb', height: '25rem', arrows: false }">
      <SSplideSlide>
        <ECredentialsSignUpForm />
      </SSplideSlide>
      <SSplideSlide>
        <EBodyParamsSignUpForm />
      </SSplideSlide>
      <SSplideSlide>
        <EForbiddensSignUpForm />
      </SSplideSlide>
      <SSplideSlide>
        <EDiseasesSignUpForm />
      </SSplideSlide>
      <SSplideSlide>
        <EMotivationsSignUpForm />
      </SSplideSlide>
    </SSplide>
  </SStructure>
</template>
