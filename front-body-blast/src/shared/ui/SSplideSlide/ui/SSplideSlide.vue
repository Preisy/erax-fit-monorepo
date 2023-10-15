<script setup lang="ts">
// import { SwiperSlide } from 'swiper/vue';
import { SplideSlide } from '@splidejs/vue-splide';
</script>
<template>
  <SplideSlide class="slide" transition-300>
    <slot />
  </SplideSlide>
</template>

<style scoped lang="scss">
.slide {
  opacity: 0.5;
  &.is-active {
    opacity: 1;
  }
}
</style>
