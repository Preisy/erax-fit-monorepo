<script setup lang="ts">
export interface RouteRecord {
  name: string;
  label: string;
}
const props = defineProps<{
  routes: RouteRecord[];
}>();
const router = useRouter();

const index = computed(() => props.routes.findIndex((route) => route.name === router.currentRoute.value.name));
console.log(props.routes);
</script>
<template>
  <div relative z-1 flex justify-center gap-8px>
    <router-link
      v-for="(el, i) in routes"
      :key="el.name"
      :to="routes[i].name"
      :class="{ 'opacity-100!': index === i }"
      fw-800
      opacity-20
      transition-opacity-300
    >
      {{ el.label }}
    </router-link>
  </div>
</template>
