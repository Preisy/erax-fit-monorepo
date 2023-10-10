<script setup lang="ts">
import { Pagination } from 'swiper/modules';
import { Swiper } from 'swiper/vue';

const isEnd = ref(false);

const end = ()=>{
  nextTick(()=>isEnd.value = true);
}
</script>
<template>
  <Swiper
    :slides-per-view="1.5"
    :space-between="8"
    :pagination="{
      clickable: true,
    }"
    :modules="[Pagination]"
    direction="vertical"
    @active-index-change="isEnd = false"
    @reach-end="end"

    :class="{'reached_end': isEnd}"
    class="swiper"

    relative
  >
    <template
      #wrapper-start
    >
      <slot />
    </template>
  </Swiper>
</template>
<style scoped lang='scss'>
.swiper{
  &:deep(.swiper-pagination){
    --uno: fixed top-7.5rem right-15px;
  }
  &:deep(.swiper-pagination-bullet-active){
    --uno: bg-primary;
  }
}
.reached_end{
  &:deep(.swiper-wrapper){
    transform: translate3d(0px, calc(-136vh + 1rem), 0px) !important;
  }
}
</style>