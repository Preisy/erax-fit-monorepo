<script setup lang="ts">
import { date, QTabPanel } from 'quasar';
import { EDiaryActivity } from 'entities/diary/EDiaryActivity';
import { EDiarySelfControlItem } from 'entities/diary/EDiarySelfControlItem';
import { SCalendar } from 'shared/ui/SCalendar';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';
import { STabPanels } from 'shared/ui/STabPanels';
const today = date.formatDate(Date.now(), 'YYYY/MM/DD');
const panel = ref(today);
export interface EDiaryItemProps {}

export interface WDiarySlide extends EDiaryItemProps {
  dateValue: string;
}
export interface WDiary {
  slides: WDiarySlide[];
}

const props = defineProps<WDiary>();
const dates = props.slides.map((it) => it.dateValue);
</script>

<template>
  <div h-full>
    <SCalendar v-model="panel" :options="dates" />
    <STabPanels v-model="panel">
      <q-tab-panel v-for="slide in slides" :name="slide.dateValue" :key="slide.dateValue">
        <SStructure relative>
          <SSplide
            :options="{
              direction: 'ttb',
              height: '15rem',
              fixedHeight: 'auto',
              arrows: false,
              omitEnd: true,
              gap: '2rem',
            }"
            class="[&>ul>li:nth-last-child(2)]:hidden!"
          >
            <SSplideSlide>
              <EDiarySelfControlItem />
            </SSplideSlide>

            <SSplideSlide>
              <EDiaryActivity />
            </SSplideSlide>
            <SSplideSlide>
              <div />
            </SSplideSlide>
          </SSplide>
        </SStructure>
      </q-tab-panel>
    </STabPanels>
  </div>
</template>
