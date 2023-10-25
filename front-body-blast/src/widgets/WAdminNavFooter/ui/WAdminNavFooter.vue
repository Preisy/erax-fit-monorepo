<script setup lang="ts">
import { ENUMS } from 'shared/lib/enums';
import { SFooterNavLink, SFooterNavLinkProps } from 'shared/ui/SFooterNavLink';
import { SNavbar } from 'shared/ui/SNavbar';

const ADMIN = ENUMS.ROUTES.ADMIN;
const links: SFooterNavLinkProps[] = [
  { imgSrc: 'sym_r_home', title: 'Профиль', href: ADMIN.base + ADMIN.children.PROFILE },
  { imgSrc: 'sym_r_settings', title: 'Промты', href: ADMIN.base + ADMIN.children.PROMPT },
  { imgSrc: 'sym_r_play_arrow', title: 'Обучение', href: ADMIN.base + ADMIN.children.LEARNING },
];
</script>

<template>
  <q-footer fixed bottom-0 left-0 right-0 rounded-t-2rem bg-bg boxshadow-footer class="w-footer">
    <SNavbar px-0.5rem>
      <SFooterNavLink v-for="navlink of links" :key="navlink.imgSrc" v-bind="navlink" />
    </SNavbar>
  </q-footer>
</template>
