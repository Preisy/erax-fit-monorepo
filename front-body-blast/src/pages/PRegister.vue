<script setup lang="ts">
import { z } from 'zod';
import { WRegisterSlide, WRegisterSlideProps } from 'widgets/register/WRegisterSlide';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';

const slides: WRegisterSlideProps[] = [
  {
    fields: [
      {
        name: 'name',
        rule: z.string(),
        sInputOptions: { label: 'Имя и фамилия' },
      },
      {
        name: 'email',
        rule: z.string(),
        sInputOptions: { label: 'Почта' },
      },
      {
        name: 'password',
        rule: z.string(),
        sInputOptions: { label: 'Пароль', type: 'password' },
      },
      {
        name: 'passwordRepeat',
        rule: z.string(),
        sInputOptions: { label: 'Повторите пароль', type: 'password' },
      },
    ],
    action: (values: Record<string, unknown>) => console.log(values),
  },
  {
    fields: [
      {
        name: 'age',
        rule: z.string(),
        sInputOptions: { label: 'Возраст', mask: '###' },
      },
      {
        name: 'weight',
        rule: z.string(),
        sInputOptions: { label: 'Вес и рост', mask: '###/###' },
      },
      {
        name: 'teenager_weight',
        rule: z.string(),
        sInputOptions: { label: 'Вес в подростковом возрасте', mask: '###' },
      },
    ],
    action: (values: Record<string, unknown>) => console.log(values),
  },
  {
    fields: [
      {
        name: 'nutritions_forbidden',
        rule: z.string(),
        sInputOptions: { label: 'Запреты в питании' },
      },
      {
        name: 'alergics',
        rule: z.string(),
        sInputOptions: { label: 'Алергия' },
      },
      {
        name: 'intolerances',
        rule: z.string(),
        sInputOptions: { label: 'Непереносимость продуктов' },
      },
    ],
    action: (values: Record<string, unknown>) => console.log(values),
  },
  {
    fields: [
      {
        name: 'gastrointestinal_diseases',
        rule: z.string(),
        sInputOptions: { label: 'Заболевания ЖКТ' },
      },
      {
        name: 'insulin_resistance',
        rule: z.string(),
        sInputOptions: { label: 'Инсулинорезистентность' },
      },
      {
        name: 'kidney_disease',
        rule: z.string(),
        sInputOptions: { label: 'Заболевание почек' },
      },
      {
        name: 'CVD_disease',
        rule: z.string(),
        sInputOptions: { label: 'Заболевание ССС' },
      },
      {
        name: 'ODA_disease',
        rule: z.string(),
        sInputOptions: { label: 'Заболевание ОДП' },
      },
    ],
    action: (values: Record<string, unknown>) => console.log(values),
  },
  {
    fields: [
      {
        name: 'load_restrictions',
        rule: z.string(),
        sInputOptions: { label: 'Запреты в нагрузке' },
      },
      {
        name: 'sports_experience',
        rule: z.string(),
        sInputOptions: { label: 'Спортивный опыт' },
      },
      {
        name: 'targets',
        rule: z.string(),
        sInputOptions: { label: 'Цели' },
      },
    ],
    action: (values: Record<string, unknown>) => console.log(values),
  },
];
const h = (fields: WRegisterSlideProps['fields']) => fields.reduce((prev, current) => prev + current.name, '');
</script>
<template>
  <SStructure>
    <SSplide :options="{ direction: 'ttb', height: '25rem', arrows: false }">
      <SSplideSlide v-for="slide in slides" :key="h(slide.fields)">
        <WRegisterSlide :fields="slide.fields" :action="slide.action" />
      </SSplideSlide>
    </SSplide>
  </SStructure>
</template>
