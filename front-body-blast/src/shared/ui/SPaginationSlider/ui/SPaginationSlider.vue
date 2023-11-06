<script setup lang="ts" generic="T extends { is: Component; props: object; key: string }">
import { QTabPanel, QTabPanels } from 'quasar';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';

export interface SPaginationSliderProps<SlideType> {
  slides: Array<SlideType>;
  len: number;
  userSelectNone?: boolean;
}
const props = defineProps<SPaginationSliderProps<T>>();
const emits = defineEmits<{
  lastElement: [];
  firstElement: [];
}>();

const value = ref(props.slides[0].key);
const index = computed(() => props.slides.findIndex((slide) => slide.key === value.value));
const onUpdate = () => {
  if (index.value === props.len - 1) {
    emits('lastElement');
  }
  if (index.value === 0) {
    emits('firstElement');
  }
};
</script>

<template>
  <SComponentWrapper>
    <QTabPanels swipeable animated class="s-pagination-slider" v-model="value" @update:model-value="onUpdate">
      <QTabPanel v-for="slide in slides" :key="slide.key" :name="slide.key" class="s-pagination-slide" p-0>
        <component :is="slide.is" v-bind="slide.props" :class="{ 'select-none pointer-events-none': userSelectNone }" />
      </QTabPanel>
    </QTabPanels>
  </SComponentWrapper>
</template>
