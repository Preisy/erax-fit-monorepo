<script setup lang='ts'>
import { QInputProps } from 'quasar';
export interface SInputProps extends QInputProps {}
defineProps<SInputProps>();
</script>
<template>
  <div
    class="s_input"
    overflow-hidden
  >
    <q-input
      v-bind="{...$props}"
      standout
    />
  </div>
</template>

<style scoped lang='scss'>
.s_input{
  &:deep(.q-field__control){
    --uno: rounded-1rem bg-primary/50;
  }
  &:deep(.q-field--highlighted .q-field__control){
    --uno: bg-primary;
  }
}
</style>