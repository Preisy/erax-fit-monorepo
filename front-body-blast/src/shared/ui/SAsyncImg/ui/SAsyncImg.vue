<script setup lang="ts">
import { QImg, QImgProps } from 'quasar';
import { useAdminFileStore } from 'shared/api/admin';

export interface SAsyncImgProps {
  src: string;
}
const props = defineProps<SAsyncImgProps>();
const { getFileByName } = useAdminFileStore();

const link = ref<QImgProps['src']>(undefined);
onMounted(async () => {
  const data = await getFileByName({ filename: props.src });
  link.value = data.data ? URL.createObjectURL(data.data) : undefined;
});
</script>

<template>
  <QImg :src="link" rounded-1rem />
</template>
