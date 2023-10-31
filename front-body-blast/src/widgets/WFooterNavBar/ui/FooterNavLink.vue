<script setup lang="ts">
export interface FooterNavLinkProps {
  imgSrc: string;
  title: string;
  href: string;
}
defineProps<FooterNavLinkProps>();
</script>

<template>
  <q-route-tab
    :ripple="false"
    exact
    :to="href"
    exact-active-class="opacity-100! [&_span]:fw-800!"
    opacity-20
    transition-opacity-300
  >
    <div max-w-5rem flex flex-1 flex-col items-center justify-center gap-0.5rem py-1rem text-center>
      <q-icon :name="imgSrc" text-md text-primary size="50px" />
      <span normal-case text-primary>{{ title }}</span>
    </div>
  </q-route-tab>
</template>
