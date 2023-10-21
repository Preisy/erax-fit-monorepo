<script setup lang="ts">
import { ENUMS } from 'shared/lib/enums';
import { SNavbar } from 'shared/ui/SNavbar';
import * as icons from '../assets';
import FooterNavLink, { FooterNavLinkProps } from './FooterNavLink.vue';

const HOME = ENUMS.ROUTES.HOME;
const links: FooterNavLinkProps[] = [
  { imgSrc: icons.exercise, title: 'Тренировки', href: HOME.base + HOME.children.TRAINING },
  { imgSrc: icons.profile, title: 'Профиль', href: HOME.base + HOME.children.PROFILE },
  { imgSrc: icons.diary, title: 'Дневник', href: HOME.base + HOME.children.DIARY },
  { imgSrc: icons.diet, title: 'Питание', href: HOME.base + HOME.children.DIET },
];
</script>

<template>
  <q-footer fixed bottom-0 left-0 right-0 rounded-t-2rem bg-bg boxshadow-footer class="w-footer">
    <SNavbar px-0.5rem>
      <FooterNavLink v-for="navlink of links" :key="navlink.imgSrc" v-bind="navlink" />
    </SNavbar>
  </q-footer>
</template>
