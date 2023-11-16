<script setup lang="ts">
import { useFloating } from '@floating-ui/vue';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SInput, SInputProps } from '../..';

export interface SChooseInputProps extends SInputProps {}
defineProps<SChooseInputProps>();

const anchor = ref();
const float = ref();
const content = ref<HTMLElement>();
const contentHeight = computed(() => content.value?.getBoundingClientRect().height + 'px');

const { floatingStyles } = useFloating(anchor, float, {
  placement: 'top-start',
});
const isOpen = ref(false);
const togglePopup = () => (isOpen.value = !isOpen.value);
</script>

<template>
  <div class="s-choose-input" relative w-full>
    <SProxyScroll
      @click="isOpen = false"
      v-if="isOpen"
      class="popup"
      ref="float"
      :style="{ ...floatingStyles, height: contentHeight }"
      right-0
      overflow-hidden
      rounded-0.75rem
      bg-primary
    >
      <div ref="content" flex rounded-0.75rem>
        <slot />
      </div>
    </SProxyScroll>
    <div @click="togglePopup">
      <SInput v-bind="$props" ref="anchor" readonly :model-value="modelValue" />
    </div>
  </div>
</template>
