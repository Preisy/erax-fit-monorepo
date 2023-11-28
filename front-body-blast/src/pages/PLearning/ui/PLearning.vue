<script setup lang="ts">
import { WVideo } from 'widgets/learning/WVideo';
import { useLearningStore } from 'shared/api/learning';
const learningStore = useLearningStore();
const videos = computed(() => learningStore.videos.data || []);
learningStore.getVideos();
</script>

<template>
  <div>
    <WVideo v-for="video in videos" v-bind="video" :key="video.title" />
  </div>
</template>
