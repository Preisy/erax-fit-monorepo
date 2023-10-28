<script setup lang="ts">
import { Splide } from '@splidejs/vue-splide';
export interface SSwiperProps {
  options: InstanceType<typeof Splide>['$props']['options'];
}
defineProps<SSwiperProps>();
</script>
<template>
  <Splide :options="{ ...options, arrows: false }" class="splide">
    <slot />
  </Splide>
</template>
<style scoped lang="scss">
.splide {
  &:deep(.splide__track) {
    --uno: overflow-visible;
  }
  &:deep(.splide__pagination) {
    all: unset;
    --uno: fixed top-7.5rem right-15px flex flex-col;
  }
  &:deep(.splide__pagination__page) {
    opacity: opacity-100;
  }
  &:deep(.splide__pagination__page.is-active) {
    --uno: bg-primary;
  }
}
</style>
