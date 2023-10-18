import { defineStore } from 'pinia';

interface FFormHandle {
  submit: (e?: Event | undefined) => Promise<void | undefined>;
}

export const useRegisterPageState = defineStore('register-page-state', () => {
  const currentSlide = ref<number>(0);
  const formHandles = ref<Array<FFormHandle>>([]);
  const currentForm = computed(() =>
    formHandles.value ? (currentSlide.value !== undefined ? formHandles.value.at(currentSlide.value) : null) : null,
  );

  return { formHandles, currentSlide, currentForm };
});
