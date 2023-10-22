<script setup lang="ts">
import { EBodyParamsRegisterForm } from 'entities/logout/EBodyParamsRegisterForm';
import { ECredentialsRegisterForm } from 'entities/logout/ECredentialsRegisterForm';
import { EDiseasesRegisterForm } from 'entities/logout/EDiseasesRegisterForm';
import { EForbiddensRegisterForm } from 'entities/logout/EForbiddensRegisterForm';
import { EOtherRegisterForm } from 'entities/logout/EOtherRegisterForm';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';
</script>
<template>
  <SStructure relative>
    <SSplide :options="{ direction: 'ttb', height: '25rem', arrows: false }">
      <!-- <WRegisterSlide :fields="slide.fields" :action="slide.action" :index="index" /> -->
      <SSplideSlide>
        <ECredentialsRegisterForm />
      </SSplideSlide>
      <SSplideSlide>
        <EBodyParamsRegisterForm />
      </SSplideSlide>
      <SSplideSlide>
        <EForbiddensRegisterForm />
      </SSplideSlide>
      <SSplideSlide>
        <EDiseasesRegisterForm />
      </SSplideSlide>
      <SSplideSlide>
        <EOtherRegisterForm />
      </SSplideSlide>
    </SSplide>
  </SStructure>
</template>
