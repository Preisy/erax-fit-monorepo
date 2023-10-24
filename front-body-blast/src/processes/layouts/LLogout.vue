<script setup lang="ts">
import { TouchSwipeValue } from 'quasar';
import { ENUMS } from 'shared/lib/enums';
import { SNavList, RouteRecord } from 'shared/ui/SNavList';

type SwipeEventData = Parameters<Exclude<TouchSwipeValue, undefined>>['0'];

const router = useRouter();
const LOGOUT = ENUMS.ROUTES.LOGOUT;
const routes: Array<RouteRecord> = [
  {
    path: '/' + LOGOUT.children.LOGIN,
    name: 'Вход',
  },
  {
    path: '/' + LOGOUT.children.REGISTER,
    name: 'Регистрация',
  },
];

const e = ({ direction }: SwipeEventData) => {
  if (!direction) return;
  const map = {
    right: () => router.push(routes.at(0)!.path),
    left: () => router.push(routes.at(1)!.path),
  } as const;
  map[direction as keyof typeof map]();
};
</script>

<template>
  <q-layout view="hHh lpr fFf" px-0.5rem v-touch-swipe.horizontal.capture="e">
    <q-page-container>
      <SNavList :routes="routes" pb-40px pt-40px />

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
