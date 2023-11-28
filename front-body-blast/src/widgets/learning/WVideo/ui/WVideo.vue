<script setup lang="ts">
import { Learning } from 'shared/api/learning';
import { SBtn } from 'shared/ui/SBtn';

const video = ref<HTMLVideoElement | null>(null);
const isPlaying = ref(false);
const toggleFullscreenAndControls = () => {
  if (video.value) {
    video.value.requestFullscreen();
  }
};
const play = () => {
  if (video.value) {
    video.value.play();
    isPlaying.value = true;
  }
};
const pause = () => {
  if (video.value) {
    video.value.pause();
    isPlaying.value = false;
  }
};
const togglePlay = () => {
  if (isPlaying.value) {
    pause();
  } else {
    play();
  }
};

const handleFullscreenChange = () => {
  if (video.value) {
    video.value.controls = !video.value.controls;
  }
};

onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
});

defineProps<Learning.Video>();

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
});
</script>

<template>
  <div w-full p-6>
    <h2 mb-4>{{ title }}</h2>
    <div>
      <video width="480" w-full border-rounded-4 @click="toggleFullscreenAndControls" ref="video">
        <source :src="link" type="video/mp4" />
        Your browser doesn't support HTML5 video tag.
      </video>
      <SBtn :icon="isPlaying ? 'pause' : 'play_arrow'" ml-2 mt--8 @click="togglePlay" />
    </div>
  </div>
</template>
