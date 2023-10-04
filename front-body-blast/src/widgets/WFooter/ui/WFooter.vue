<script setup lang="ts">
import { SNavbar } from 'shared/ui/SNavbar';
import * as icons from '../assets'
import FooterNavLink, { FooterNavLinkProps } from './FooterNavLink.vue';

const links: FooterNavLinkProps[] = [
  { imgSrc: icons.exercise, title: 'Тренировки' },
  { imgSrc: icons.profile, title: 'Профиль' },
  { imgSrc: icons.diary, title: 'Дневник' },
  { imgSrc: icons.diet, title: 'Питание' },
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
    <SNavbar>
      <FooterNavLink
        v-for="navlink of links"
        :key="navlink.imgSrc"
        v-bind="navlink"
      />
    </SNavbar>
  </div>
</template>
