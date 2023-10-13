<script setup lang="ts">
export interface FooterNavLinkProps {
  imgSrc: string;
  title: string;
  href: string;
}
const props = defineProps<FooterNavLinkProps>();
const route = useRoute();
const isActive = computed(()=>route.path == props.href);
</script>

<template>
  <div
    flex-1
  >
    <router-link :to="href">
      <div
        :href="href"
        max-w-5rem
        flex
        flex-col
        items-center
        justify-center
        gap-0.5rem
        py-1rem
        text-center
        transition-opacity-300
        :class="{'opacity-50': !isActive}"
      >
        <q-img
          :src="imgSrc"
          pointer-events-none
          w-1.5rem
          select-none
        />
        <span>{{ title }}</span>
      </div>
    </router-link>
  </div>
</template>
