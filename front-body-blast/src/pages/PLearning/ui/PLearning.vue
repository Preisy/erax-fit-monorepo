<script setup lang="ts">
import { WVideo } from 'widgets/learning/WVideo';
const props = {
  title: 'Мышцы груди',
  links: ['https://v3.cdnpk.net/videvo_files/video/free/2013-08/large_watermarked/hd0983_preview.mp4'],
  poster: '',
};
</script>

<template>
  <div>
    <WVideo v-bind="props" />
  </div>
</template>
