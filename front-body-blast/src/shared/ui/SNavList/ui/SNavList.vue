<script setup lang="ts">
export interface RouteRecord {
  path: string;
  name: string;
}
const props = defineProps<{
  routes: RouteRecord[];
}>();
const router = useRouter();

const index = computed(() => props.routes.findIndex((route) => route.path === router.currentRoute.value.path));
</script>
<template>
  <div flex justify-center gap-8px>
    <router-link
      v-for="(el, i) in routes"
      :key="el.path"
      :to="routes[i].path"
      :class="{ 'opacity-100!': index === i }"
      fw-800
      opacity-20
      transition-opacity-300
    >
      {{ el.name }}
    </router-link>
  </div>
</template>
