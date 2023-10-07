<script setup lang="ts">
import { SNavbar } from 'shared/ui/SNavbar';
import * as icons from '../assets';
import FooterNavLink, { FooterNavLinkProps } from './FooterNavLink.vue';

const links: FooterNavLinkProps[] = [
  { imgSrc: icons.exercise, title: 'Тренировки', href: '#' },
  { imgSrc: icons.profile, title: 'Профиль', href: '#' },
  { imgSrc: icons.diary, title: 'Дневник', href: '#' },
  { imgSrc: icons.diet, title: 'Питание', href: '#' },
];
</script>

<template>
  <div
    fixed
    bottom-0
    left-0
    right-0
    rounded-t-2rem
    bg-bg
    boxshadow-footer
    class="w-footer"
  >
    <SNavbar px-0.5rem>
      <FooterNavLink
        v-for="navlink of links"
        :key="navlink.imgSrc"
        v-bind="navlink"
      />
    </SNavbar>
  </div>
</template>
