<script setup lang="ts">
import UserProfileCard, { UserProfileCardProps } from './UserProfileCard.vue';

export interface EAdminProfileListProps {
  cards: Array<UserProfileCardProps>;
}
defineProps<EAdminProfileListProps>();
</script>
<template>
  <div>
    <UserProfileCard v-for="user in cards" :key="user.name" :name="user.name" />
  </div>
</template>
