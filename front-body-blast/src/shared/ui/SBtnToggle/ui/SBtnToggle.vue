<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { QBtn, QBtnToggle, QBtnToggleProps } from 'quasar';
import { HTMLAttributes } from 'vue';

export interface SBtnToggleProps extends QBtnToggleProps {}
const props = defineProps<SBtnToggleProps>();
const emit = defineEmits<{
  'update:model-value': [newValue: boolean];
}>();

//modelValue wrapper
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:model-value', value);
  },
});

const toggle = ref<InstanceType<typeof QBtnToggle>>();
const styles = computed(() => {
  const html: HTMLElement | undefined = toggle.value?.$el;
  const elements = html?.querySelectorAll('button');

  if (!elements) return undefined;

  const elemsAsArray = Array.from(elements);
  const widths = elemsAsArray.map((elem) => elem.getBoundingClientRect().width);

  return widths?.map(
    (width, i, a) =>
      ({
        width: `${width}px`,
        marginLeft: `${(i / (a.length - 1)) * 100}%`,
        transform: `translateX(${(-i / (a.length - 1)) * 100}%)`,
      }) as HTMLAttributes['style'],
  );
}); //sryles for moving black elemnt

const currentIndex = computed(() => props.options.findIndex((option) => option.value === value.value));
const currentStyle = computed(() => styles.value?.at(currentIndex.value));
</script>

<template>
  <div relative>
    <QBtnToggle
      ref="toggle"
      class="toggle [&_.q-btn]:(relative z-1 rounded-1rem!) [&_span]:(text-base capitalize)"
      v-bind="$props"
      flat
      w-full
      flex
      justify-between
      rounded-0.75rem
      bg-primary50
      color="primary50"
      toggle-color="primary50"
      text-color="bg"
      toggle-text-color="bg"
      size="1rem"
    />

    <div
      :style="currentStyle"
      absolute
      top-0
      z-0
      h-full
      rounded-0.75rem
      bg-black
      ease-in-out
      class="transition-width,margin,transform-300"
    />
  </div>
</template>

<style scoped lang="scss">
.toggle {
  &:deep([aria-pressed='true']) {
    span {
      font-weight: bold !important;
    }
  }
}
</style>
