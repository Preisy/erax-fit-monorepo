<script setup lang="ts">
export interface RouteRecord {
  path: string;
  name: string;
}
const props = defineProps<{
  routes: RouteRecord[];
}>();
const router = useRouter();

const onclick = (num: number) => {
  console.log(num);
  router.push(props.routes[num].path);
};
const index = computed(() => props.routes.findIndex((route) => route.path === router.currentRoute.value.path));
</script>
<template>
  <div flex justify-center gap-8px>
    <p
      v-for="(el, i) in routes"
      :key="el.path"
      @click="onclick(i)"
      :class="{ 'opacity-100': index === i }"
      fw-800
      opacity-20
      transition-opacity-300
    >
      {{ el.name }}
    </p>
  </div>
</template>
