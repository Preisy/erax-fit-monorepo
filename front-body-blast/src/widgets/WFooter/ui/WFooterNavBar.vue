<script setup lang="ts">
import {
  symRoundedAccountCircle,
  symRoundedEdit,
  symRoundedExercise,
  symRoundedRestaurant,
} from '@quasar/extras/material-symbols-rounded';
import { useI18n } from 'vue-i18n';
import { ENUMS } from 'shared/lib/enums';
import { SNavbar } from 'shared/ui/SNavbar';
import FooterNavLink, { FooterNavLinkProps } from './FooterNavLink.vue';

const { t } = useI18n();
const HOME = ENUMS.ROUTES.HOME;
const links: FooterNavLinkProps[] = [
  {
    imgSrc: symRoundedExercise,
    title: t('dashboard.footer.links.trainings'),
    href: HOME.base + HOME.children.TRAINING,
  },
  {
    imgSrc: symRoundedAccountCircle,
    title: t('dashboard.footer.links.profile'),
    href: HOME.base + HOME.children.PROFILE,
  },
  {
    imgSrc: symRoundedEdit,
    title: t('dashboard.footer.links.diary'),
    href: HOME.base + HOME.children.DIARY,
  },
  {
    imgSrc: symRoundedRestaurant,
    title: t('dashboard.footer.links.diet'),
    href: HOME.base + HOME.children.DIET,
  },
];
</script>

<template>
  <q-footer fixed bottom-0 left-0 right-0 rounded-t-2rem bg-bg boxshadow-footer class="w-footer">
    <SNavbar px-0.5rem>
      <FooterNavLink v-for="navlink of links" :key="navlink.imgSrc" v-bind="navlink" />
    </SNavbar>
  </q-footer>
</template>
