<script setup lang="ts">
export interface FooterNavLinkProps {
  imgSrc: string;
  title: string;
}
defineProps<FooterNavLinkProps>();
</script>

<template>
  <a text-center>
    <q-img
      :src="imgSrc"
      text-md
    />
    <p>{{ title }}</p>
  </a>
</template>
