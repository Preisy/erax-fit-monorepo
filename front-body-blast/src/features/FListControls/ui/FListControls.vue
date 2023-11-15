<script setup lang="ts">
import { symRoundedAdd, symRoundedDelete, symRoundedDone } from '@quasar/extras/material-symbols-rounded';
import { SBtn } from 'shared/ui/btns';

withDefaults(
  defineProps<{
    disabledAdd?: boolean;
    disabledRemove?: boolean;
    disabledSubmit?: boolean;
  }>(),
  { disabledAdd: false, disabledApply: false, disabledRemove: false },
);

defineEmits<{
  add: [];
  remove: [];
  submit: [];
}>();
</script>

<template>
  <div flex flex-row gap-x-0.5rem>
    <SBtn v-if="!disabledAdd" @click="$emit('add')" :icon="symRoundedAdd" bg="bg!" />
    <SBtn v-if="!disabledRemove" @click="$emit('remove')" :icon="symRoundedDelete" bg="bg!" ml-auto />
    <SBtn v-if="!disabledSubmit" @click="$emit('submit')" :icon="symRoundedDone" type="submit" />
  </div>
</template>
