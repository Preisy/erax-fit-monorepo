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
    --uno: absolute top-1.5rem right--18px flex flex-col text-0;
  }
  &:deep(.splide__pagination__page) {
    --uno: opacity-100 w-6px h-6px m-0 mb-4px;
  }
  &:deep(.splide__pagination__page.is-active) {
    --uno: bg-primary scale-100;
  }
}
</style>
