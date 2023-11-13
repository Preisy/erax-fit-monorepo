<script setup lang="ts">
import { uniqueId } from 'lodash';
import { QTabPanel, QTabPanels } from 'quasar';
import { IListState, IPagination } from 'shared/lib/utils';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';

export interface SPaginationSliderProps {
  count: number; //Count of slides in one page
  state: IListState; //list state, holds data[] with 'loading'/'success'/'error' states
  fetch: (params?: IPagination.Params) => Promise<unknown>; //new page fetch action
  slideComponent: Component; //type of slide component
  userSelectNone?: boolean; //disable userSelect on slide?
}
const props = defineProps<SPaginationSliderProps>();
const emits = defineEmits<{
  lastElement: [];
  firstElement: [];
}>();

//Raw slides data
const slides = computed(() => props.state.data);

//If no slides in state -> fetch some
if (slides.value.length === 0) props.fetch({ page: 1, size: props.count });

//Add key/name to each slide
const slidesWithId = computed(() =>
  slides.value.map((slide: (typeof slides.value)[0] & { name: string }) => {
    slide.name = uniqueId('slide-');
    return slide;
  }),
);

//v-model value with current slide key
const value = ref('slide-1');
const index = computed(() => slidesWithId.value.findIndex((slide) => slide.name === value.value)); //current page index

//onUpdate action(same as ontransition, but calculates if last/if first)
const onUpdate = () => {
  if (index.value === props.count - 1) {
    emits('lastElement');
    props.fetch({ page: props.state.pagination.page + 1, size: props.count });
  }
  if (index.value === 0) {
    emits('firstElement');
    props.fetch({ page: props.state.pagination.page - 1, size: props.count });
  }
};

watch(props.state, (n) => console.log(n));
</script>

<template>
  <SComponentWrapper>
    <QTabPanels swipeable animated class="s-pagination-slider" v-model="value" @update:model-value="onUpdate">
      <QTabPanel v-for="slide in slidesWithId" :key="slide.name" :name="slide.name" class="s-pagination-slide" p-0>
        <component :is="slideComponent" v-bind="slide" :class="{ 'select-none pointer-events-none': userSelectNone }" />
      </QTabPanel>
    </QTabPanels>
  </SComponentWrapper>
</template>
