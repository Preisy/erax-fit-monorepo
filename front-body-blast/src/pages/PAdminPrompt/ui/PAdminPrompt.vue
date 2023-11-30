<script setup lang="ts">
import { symRoundedDelete, symRoundedEdit, symRoundedPlayArrow } from '@quasar/extras/material-symbols-rounded';
import { QTab, QTabs, QTabProps, QTabPanels, QTabPanel } from 'quasar';
import { useI18n } from 'vue-i18n';
import { WPromptCreation } from 'widgets/WPromptCreation';
import { useAdminPromptStore } from 'shared/api/admin';
import { useLoading } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SAsyncImg } from 'shared/ui/SAsyncImg';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SStructure } from 'shared/ui/SStructure';

const { t } = useI18n();
const routes: QTabProps[] = [
  { name: 'new', label: t('admin.prompt.nav.new') },
  { name: 'all', label: t('admin.prompt.nav.all') },
];
const currentRoute = ref(routes[0].name);
const { prompts, getPrompts } = useAdminPromptStore();

if (!prompts.state.isSuccess()) getPrompts({ page: 1, limit: 1000, expanded: false, type: 'string' });
useLoading(prompts);
</script>

<template>
  <SStructure h-full>
    <q-tabs
      content-class="gap-x-0.5rem justify-center"
      v-model="currentRoute"
      active-class="opacity-100!"
      absolute
      left-0
      right-0
      top-0
      z-1
    >
      <q-tab
        v-for="route in routes"
        :key="route.name"
        :name="route.name"
        :label="route.label"
        :ripple="false"
        flex="none!"
        p-0
        normal-case
        opacity-20
        transition-opacity-300
        class="[&_.q-tab\_\_indicator]:display-none [&_.q-tab\_\_label]:fw-bold!"
      />
    </q-tabs>

    <QTabPanels v-model="currentRoute" animated swipeable h-full pt-3rem>
      <!-- Add prompt -->
      <QTabPanel :name="routes[0].name" h-full overflow-hidden p="0!">
        <SProxyScroll h-full>
          <WPromptCreation />
        </SProxyScroll>
      </QTabPanel>

      <!-- All prompts -->
      <QTabPanel :name="routes[1].name" p="0!">
        <SProxyScroll h-full v-if="prompts.data" overflow-hidden>
          <SComponentWrapper v-for="(prompt, index) in prompts.data.data" :key="index">
            <SAsyncImg :src="prompt.photoLink" rounded-1rem />
            <div mx-5px mt--1rem flex flex-row gap-x-0.5rem>
              <SBtn :icon="symRoundedPlayArrow" bg="bg!" />
              <SBtn :icon="symRoundedEdit" bg="bg!" />
              <SBtn :icon="symRoundedDelete" ml-auto />
            </div>
          </SComponentWrapper>
        </SProxyScroll>
        <SNoResultsScreen v-else />
      </QTabPanel>
    </QTabPanels>
  </SStructure>
</template>
