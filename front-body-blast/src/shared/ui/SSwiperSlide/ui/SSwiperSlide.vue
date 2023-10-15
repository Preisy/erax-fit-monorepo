<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue';
</script>
<template>
  <swiper-slide class="slide" transition-300>
    <slot />
  </swiper-slide>
</template>

<style scoped lang="scss">
.slide {
  opacity: 0.5;
  &.swiper-slide-active {
    opacity: 1;
  }
}
</style>
