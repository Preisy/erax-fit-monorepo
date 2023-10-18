<script setup lang="ts">
import { Splide } from '@splidejs/vue-splide';
export interface SSwiperProps {
  options: InstanceType<typeof Splide>['$props']['options'];
}
defineProps<SSwiperProps>();
defineEmits(Splide.emits!);
const splide = ref();
</script>
<template>
  <Splide
    ref="splide"
    @splide:moved="(e, newValue, prevValue, destValue) => $emit('splide:moved', { e, newValue, prevValue, destValue })"
    :options="{ ...options, arrows: false }"
    class="splide"
  >
    <slot />
    <template #f>
      <slot name="pagination" />
    </template>
  </Splide>
</template>
<style scoped lang="scss">
.splide {
  &:deep(.splide__track) {
    --uno: overflow-visible;
  }
  &:deep(.splide__pagination) {
    all: unset;
    --uno: absolute top-7.5rem right--20px flex flex-col;
  }
  &:deep(.splide__pagination__page) {
    opacity: opacity-100;
  }
  &:deep(.splide__pagination__page.is-active) {
    --uno: bg-primary;
  }
}
</style>
