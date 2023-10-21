<script setup lang="ts">
export interface FooterNavLinkProps {
  imgSrc: string;
  title: string;
  href: string;
}
defineProps<FooterNavLinkProps>();
</script>

<template>
  <q-route-tab exact :to="href" exact-active-class="opacity-100!" opacity-50 transition-opacity-300>
    <div max-w-5rem flex flex-1 flex-col items-center justify-center gap-0.5rem py-1rem text-center>
      <q-img :src="imgSrc" pointer-events-none w-1.5rem select-none />
      <span normal-case text-primary>{{ title }}</span>
    </div>
  </q-route-tab>
</template>
