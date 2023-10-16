<script setup lang="ts">
// eslint-disable-next-line boundaries/element-types
import { useRegisterPageState } from 'pages/PRegister';
import { FForm, FFormProps } from 'features/FForm';

export interface WRegisterSlideProps extends FFormProps {
  index: number;
}
const props = defineProps<WRegisterSlideProps>();
const form = ref<InstanceType<typeof FForm>>();
const registerState = useRegisterPageState();
onMounted(() => {
  if (!form.value) return;
  registerState.formHandles[props.index] = {
    submit: form.value.onSubmit,
  };
});
</script>
<template>
  <div py-1.5rem>
    <FForm ref="form" :action="action" :fields="fields" />
  </div>
</template>
