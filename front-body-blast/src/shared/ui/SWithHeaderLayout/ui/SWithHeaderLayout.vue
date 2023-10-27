<script setup lang="ts"></script>
<template>
  <div h-full flex flex-col>
    <div>
      <slot name="header"></slot>
    </div>
    <div h-full overflow-y-scroll>
      <slot name="body"></slot>
    </div>
  </div>
</template>
