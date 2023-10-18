<script setup lang="ts">
import { TouchSwipeValue } from 'quasar';
import { SBtn } from 'shared/ui/SBtn';
import { SNavList } from 'shared/ui/SNavList';

type SwipeEventData = Parameters<Exclude<TouchSwipeValue, undefined>>['0'];

const router = useRouter();
const e = ({ direction }: SwipeEventData) => {
  console.log(direction);
  switch (direction) {
    case 'right':
      router.push('/login');
      break;
    case 'left':
      router.push('/register');
      break;
  }
};

const click = () => console.log('a');
const index = computed(() => (router.currentRoute.value.path === '/login' ? 0 : 1));
const routes = ['Вход', 'Регистрация'];
</script>

<template>
  <q-layout view="hHh lpr fFf" px-0.5rem v-touch-swipe="e">
    <q-page-container>
      <SNavList :list="routes" :index="index" />
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition as string" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
      <div fixed bottom-1rem w-full flex justify-between>
        <SBtn boxshadow-btn>
          <p fw-800 normal-case>Забыли пароль?</p>
        </SBtn>
        <SBtn :action="click" type="submit" right-15px boxshadow-btn>
          <q-icon name="done" />
        </SBtn>
      </div>
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
$time: 0.3s;
$translate: 100%;
.slide-left-enter-active {
  transition: all $time ease-out;
}
.slide-left-leave-active {
  transition: all $time ease-in;
}
.slide-left-enter-from {
  transform: translateX($translate);
}
.slide-left-leave-to {
  transform: translateX(-$translate);
  opacity: 0.5;
}

.slide-right-enter-active {
  transition: all $time ease-out;
}
.slide-right-leave-active {
  transition: all $time ease-in;
}
.slide-right-enter-from {
  transform: translateX(-$translate);
}
.slide-right-leave-to {
  transform: translateX($translate);
  opacity: 0.5;
}
</style>
