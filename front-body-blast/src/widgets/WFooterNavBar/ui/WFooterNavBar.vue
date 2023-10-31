<script setup lang="ts">
import {
  symRoundedAccountCircle,
  symRoundedEdit,
  symRoundedExercise,
  symRoundedRestaurant,
} from '@quasar/extras/material-symbols-rounded';
import { useI18n } from 'vue-i18n';
import { ENUMS } from 'shared/lib/enums';
import FooterNavLink, { FooterNavLinkProps } from './FooterNavLink.vue';

const { t } = useI18n();
const HOME = ENUMS.ROUTES.HOME;
const links: FooterNavLinkProps[] = [
  {
    imgSrc: symRoundedExercise,
    title: t('dashboard.footer.links.trainings'),
    href: HOME.BASE + HOME.CHILDREN.TRAINING,
  },
  {
    imgSrc: symRoundedAccountCircle,
    title: t('dashboard.footer.links.profile'),
    href: HOME.BASE + HOME.CHILDREN.PROFILE,
  },
  {
    imgSrc: symRoundedEdit,
    title: t('dashboard.footer.links.diary'),
    href: HOME.BASE + HOME.CHILDREN.DIARY,
  },
  {
    imgSrc: symRoundedRestaurant,
    title: t('dashboard.footer.links.diet'),
    href: HOME.BASE + HOME.CHILDREN.DIET,
  },
];
</script>

<template>
  <q-footer fixed bottom-0 left-0 right-0 rounded-t-2rem bg-bg boxshadow-footer class="w-footer">
    <q-tabs px-0.rem flex flex-row justify-between>
      <FooterNavLink v-for="navlink of links" :key="navlink.imgSrc" v-bind="navlink" />
    </q-tabs>
  </q-footer>
</template>
