<script setup lang="ts">
import { EClientProfileCard } from 'entities/admin/profile';
import { useAdminProfileStore } from 'shared/api/admin';
import { SBtn } from 'shared/ui/SBtn';
import { SWithHeaderLayout } from 'shared/ui/SWithHeaderLayout';

const id = parseInt(useRoute().params.id as string);
const profileStore = useAdminProfileStore();
if (!profileStore.clientProfiles.state.isSuccess()) profileStore.getUserProfiles();
const me = computed(() => profileStore.clientProfiles.data?.data.at(id) ?? { name: 'Loading...' });

const active = ref(false);
</script>

<template>
  <SWithHeaderLayout>
    <template #header>
      <EClientProfileCard :name="me?.name" dark mx--0.5rem px-2rem pt-4rem />
    </template>
    <template #body>
      <div px-1.5rem>
        {{ $route.params }}

        <!-- Access to learning section -->
        <div class="s-btn-toggle" flex justify-between>
          <SBtn :color="!active ? 'primary' : 'primary50'" @click="active = false">
            <p capitalize :class="{ 'fw-bold': !active }">Запрещён</p>
          </SBtn>
          <SBtn :color="active ? 'primary' : 'primary50'" @click="active = true">
            <p capitalize :class="{ 'fw-bold': active }">Разрешен</p>
          </SBtn>
        </div>
      </div>
    </template>
  </SWithHeaderLayout>
</template>
