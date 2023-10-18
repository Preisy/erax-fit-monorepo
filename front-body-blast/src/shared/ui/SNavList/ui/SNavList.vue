<script setup lang="ts">
defineProps<{
  list: string[];
  index: number;
}>();
const emit = defineEmits<{
  (e: 'update:index', newValue: number): void;
}>();

const onclick = (num: number) => {
  console.log(num);
  emit('update:index', num);
};
</script>
<template>
  <div flex justify-center gap-8px>
    <p v-for="(el, i) in list" :key="el" @click="onclick(i)" :class="{ active: index === i }" fw-800>
      {{ el }}
    </p>
  </div>
</template>
<style scoped lang="scss">
p {
  --uno: opacity-20 transition-opacity-300;
}
.active {
  --uno: opacity-100;
}
</style>
