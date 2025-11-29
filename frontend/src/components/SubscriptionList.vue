<template>
  <div>
    <SubscriptionCard
      v-for="sub in subscriptions"
      :key="sub.id"
      :subscription="sub"
      @edit="editSub"
      @delete="deleteSub"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import SubscriptionCard from "./SubscriptionCard.vue";
import { useApi } from "../composables/useApi";

const props = defineProps<{ editData?: any; refreshList?: () => void }>();

const { subscriptions, fetchSubscriptions, deleteSubscription } = useApi();
const editData = ref(props.editData || null);

onMounted(() => {
  fetchSubscriptions();
});

watch(() => props.editData, (newVal) => {
  editData.value = newVal;
});

const editSub = (sub: any) => {
  editData.value = sub;
};

const deleteSub = async (id: number) => {
  await deleteSubscription(id);
  props.refreshList && props.refreshList();
};
</script>



