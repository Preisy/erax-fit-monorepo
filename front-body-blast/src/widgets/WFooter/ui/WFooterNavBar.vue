<script setup lang="ts">
import {
  symRoundedAccountCircle,
  symRoundedEdit,
  symRoundedExercise,
  symRoundedRestaurant,
} from '@quasar/extras/material-symbols-rounded';
import { useI18n } from 'vue-i18n';
import { SNavbar } from 'shared/ui/SNavbar';
import FooterNavLink, { FooterNavLinkProps } from './FooterNavLink.vue';

const { t } = useI18n();

const links: FooterNavLinkProps[] = [
  { imgSrc: symRoundedExercise, title: t('dashboard.footer.links.trainings'), href: '#' },
  { imgSrc: symRoundedAccountCircle, title: t('dashboard.footer.links.profile'), href: '#' },
  { imgSrc: symRoundedEdit, title: t('dashboard.footer.links.diary'), href: '#' },
  { imgSrc: symRoundedRestaurant, title: t('dashboard.footer.links.diet'), href: '#' },
];
</script>

<template>
  <q-footer fixed bottom-0 left-0 right-0 rounded-t-2rem bg-bg boxshadow-footer class="w-footer">
    <SNavbar px-0.5rem>
      <FooterNavLink v-for="navlink of links" :key="navlink.imgSrc" v-bind="navlink" />
    </SNavbar>
  </q-footer>
</template>
