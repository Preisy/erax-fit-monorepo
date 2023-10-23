<script setup lang="ts">
import { TouchSwipeValue } from 'quasar';
import { SNavList, RouteRecord } from 'shared/ui/SNavList';

type SwipeEventData = Parameters<Exclude<TouchSwipeValue, undefined>>['0'];

const router = useRouter();
const routes: Array<RouteRecord> = [
  {
    path: '/login',
    name: 'Вход',
  },
  {
    path: '/register',
    name: 'Регистрация',
  },
];

const e = ({ direction }: SwipeEventData) => {
  console.log(direction);
  switch (direction) {
    case 'right':
      router.push(routes.at(0)!.path);
      break;
    case 'left':
      router.push(routes.at(1)!.path);
      break;
  }
};
</script>

<template>
  <q-layout view="hHh lpr fFf" px-0.5rem v-touch-swipe.horizontal.capture="e">
    <q-page-container>
      <SNavList :routes="routes" pb-1rem pt-0.5rem />

      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition as string" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>
