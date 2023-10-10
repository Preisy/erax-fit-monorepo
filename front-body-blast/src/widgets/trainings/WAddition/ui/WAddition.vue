<script setup lang="ts">
import { z } from 'zod';
import { FForm, FieldsSchema } from 'features/FForm';
import { SSwiperSlide } from 'shared/ui/SSwiperSlide'

const action = (values: Record<string, unknown>)=>{
  console.log(values);
}
const fields: FieldsSchema = [
  {
    name: 'addition', 
    rule: z.string(), 
    title: 'addition', 
    sInputOptions:{ placeholder:'Введите текст' }
  }
]
</script>
<template>
  <SSwiperSlide>
    <h1 mb-1rem>
      Хотите что-то добавить?
    </h1>
    <FForm
      :fields="fields"
      :action="action"
    />
  </SSwiperSlide>
</template>
