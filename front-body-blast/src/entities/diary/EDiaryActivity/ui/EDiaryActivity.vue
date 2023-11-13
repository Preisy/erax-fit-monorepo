<script lang="ts" setup>
import { SInput } from 'shared/ui/SInput';
</script>

<template>
  <div>
    <h1 mb-4>{{ $t('home.diary.activity.activity') }}</h1>
    <SInput mb-2 name="field" :label="$t('home.diary.activity.physical')" />
    <SInput name="field" :label="$t('home.diary.activity.steps')" />
  </div>
</template>
