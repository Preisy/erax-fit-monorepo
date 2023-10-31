<script setup lang="ts"></script>

<template>
  <div h-full flex flex-col>
    <div bg-primary>
      <slot name="header" />
    </div>
    <div h-full overflow-y-scroll>
      <slot name="body" />
    </div>
  </div>
</template>
