<script setup lang="ts">
import { FForm, FFormProps } from 'features/FForm';

export interface WRegisterSlideProps extends FFormProps {}

defineProps<WRegisterSlideProps>();
</script>
<template>
  <div py-1.5rem>
    <FForm :action="action" :fields="fields" />
  </div>
</template>
