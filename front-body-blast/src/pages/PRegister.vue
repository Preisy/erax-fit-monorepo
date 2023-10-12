<script setup lang="ts">
import { z } from 'zod';
import { WRegisterSlide, WRegisterSlideProps } from 'widgets/register/WRegisterSlide';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';

const slides: WRegisterSlideProps[] = [
  {
    fields:[
      {
        name: 'name',
        rule: z.string(),
        sInputOptions: { label: 'Имя и фамилия' }
      },
      {
        name: 'email',
        rule: z.string(),
        sInputOptions: { label: 'Почта' }
      },
      {
        name: 'password',
        rule: z.string(),
        sInputOptions:{ label: 'Пароль', type:'password' }
      },
      {
        name: 'passwordRepeat',
        rule: z.string(),
        sInputOptions:{ label: 'Повторите пароль', type:'password' }
      },
    ],
    action: (values: Record<string, unknown>)=>console.log(values)
  },
  {
    fields:[
      {
        name: 'name',
        rule: z.string(),
      },
      {
        name: 'email',
        rule: z.string(),
      },
      {
        name: 'password',
        rule: z.string(),
        sInputOptions:{ type:'password' }
      },
      {
        name: 'passwordRepeat',
        rule: z.string(),
        sInputOptions:{ type:'password' }
      },
    ],
    action: (values: Record<string, unknown>)=>console.log(values)
  },
  {
    fields:[
      {
        name: 'name',
        rule: z.string(),
      },
      {
        name: 'email',
        rule: z.string(),
      },
      {
        name: 'password',
        rule: z.string(),
        sInputOptions:{ type:'password' }
      },
      {
        name: 'passwordRepeat',
        rule: z.string(),
        sInputOptions:{ type:'password' }
      },
    ],
    action: (values: Record<string, unknown>)=>console.log(values)
  },
  {
    fields:[
      {
        name: 'name',
        rule: z.string(),
      },
      {
        name: 'email',
        rule: z.string(),
      },
      {
        name: 'password',
        rule: z.string(),
        sInputOptions:{ type:'password' }
      },
      {
        name: 'passwordRepeat',
        rule: z.string(),
        sInputOptions:{ type:'password' }
      },
    ],
    action: (values: Record<string, unknown>)=>console.log(values)
  },
  {
    fields:[
      {
        name: 'name',
        rule: z.string(),
      },
      {
        name: 'email',
        rule: z.string(),
      },
      {
        name: 'password',
        rule: z.string(),
        sInputOptions:{ type:'password' }
      },
      {
        name: 'passwordRepeat',
        rule: z.string(),
        sInputOptions:{ type:'password' }
      },
    ],
    action: (values: Record<string, unknown>)=>console.log(values)
  },
]
const h = (fields: WRegisterSlideProps['fields'])=>fields.reduce((prev, current)=>prev+current.name, '');
</script>
<template>
  <SStructure>
    <SSplide :options="{direction:'ttb', height: '20rem', arrows: false}">
      <SSplideSlide
        v-for="slide in slides"
        :key="h(slide.fields)"
      >
        <WRegisterSlide
          :fields="slide.fields"
          :action="slide.action"
        />
      </SSplideSlide>
    </SSplide>
  </SStructure>
</template>
