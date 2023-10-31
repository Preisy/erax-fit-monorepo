<script setup lang="ts">
export interface SFooterNavLinkProps {
  imgSrc: string;
  title: string;
  href: string;
}
const props = defineProps<SFooterNavLinkProps>();
const route = useRoute();
const isActive = computed(() => route.path == props.href);
</script>

<template>
  <div flex-1>
    <router-link :to="{ name: href }">
      <div
        max-w-5rem
        flex
        flex-col
        items-center
        justify-center
        gap-0.5rem
        py-1rem
        text-center
        transition-opacity-300
        :class="{ 'opacity-50': !isActive }"
      >
        <q-icon :name="imgSrc" size="1.5rem" />
        <span>{{ title }}</span>
      </div>
    </router-link>
  </div>
</template>
