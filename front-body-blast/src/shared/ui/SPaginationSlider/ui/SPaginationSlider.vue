<script setup lang="ts">
import { uniqueId } from 'lodash';
import { QTabPanel, QTabPanels, TouchSwipeValue } from 'quasar';
import { useLoading } from 'shared/lib/loading';
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

useLoading(props.state);
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
const index = ref(0); //current page index
const lock = ref(false);
const value = computed(() => (!lock.value ? slidesWithId.value.at(index.value)?.name : ''));

//onUpdate action(same as ontransition, but calculates if last/if first)
const onUpdate = async (event: Parameters<Exclude<TouchSwipeValue, undefined>>['0']) => {
  if (lock.value) return;

  // Directions are inverted. If swipe right -> get 'left'
  const delta = event.direction === 'right' ? -1 : 1;
  index.value += delta;

  if (index.value === props.count) {
    emits('lastElement');
    console.log('last');

    lock.value = true;
    await props.fetch({ page: props.state.pagination.page + 1, size: props.count });
    lock.value = false;

    index.value = 0;
    // value.value = slidesWithId.value.at(index.value)?.name ?? `slide-${parseInt(value.value.split('-')[1]) + 1}`;
  }

  if (index.value === -1) {
    emits('firstElement');
    console.log('first');

    const newPage = Math.max(1, props.state.pagination.page - 1);
    lock.value = true;
    await props.fetch({ page: newPage, size: props.count });
    lock.value = false;

    index.value = props.count - 1;
    // value.value = slidesWithId.value.at(index.value)?.name ?? `slide-${parseInt(value.value.split('-')[1]) - 1}`;
  }
};
</script>

<template>
  <SComponentWrapper>
    <QTabPanels swipeable animated class="s-pagination-slider" v-model="value" v-touch-swipe.horizontal="onUpdate">
      <template v-for="slide in slidesWithId">
        <QTabPanel v-if="slide" :key="slide.name" :name="slide.name" class="s-pagination-slide" p-0>
          <component
            :is="slideComponent"
            v-bind="slide"
            :class="{ 'select-none pointer-events-none': userSelectNone }"
          />
        </QTabPanel>
      </template>
    </QTabPanels>
  </SComponentWrapper>
</template>
