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

const firstSlide = ref();
const lastSlide = ref();

const displaySlides = computed(
  () => [firstSlide.value, ...slidesWithId.value, lastSlide.value] as typeof slidesWithId.value,
);

//v-model value with current slide key
const value = ref('slide-1');
const index = computed(() => slidesWithId.value.filter((v) => !!v).findIndex((slide) => slide.name === value.value)); //current page index
const lock = ref();

//onUpdate action(same as ontransition, but calculates if last/if first)
const onUpdate = async (next: string, prev: string) => {
  const nextIndex = displaySlides.value.findIndex((s) => s?.name === next);
  const prevIndex = displaySlides.value.findIndex((s) => s?.name === prev);
  const delta = nextIndex - prevIndex;
  const dir: 'left' | 'right' = delta > 0 ? 'right' : 'left';

  if (index.value === props.count - 1 && dir === 'right') {
    emits('lastElement');
    console.log('last');
    firstSlide.value = slidesWithId.value.at(-1);
    lock.value = value.value;
    await props.fetch({ page: props.state.pagination.page + 1, size: props.count });
    value.value = lock.value;
  }
  if (index.value === 0 && dir === 'left') {
    emits('firstElement');
    console.log('first');
    lastSlide.value = slidesWithId.value.at(0);
    const newPage = Math.max(1, props.state.pagination.page - 1);
    lock.value = value.value;
    await props.fetch({ page: newPage, size: props.count });
    value.value = lock.value;
  }
};
</script>

<template>
  <SComponentWrapper>
    <QTabPanels swipeable animated class="s-pagination-slider" v-model="value" @transition="onUpdate">
      <template v-for="slide in displaySlides">
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
