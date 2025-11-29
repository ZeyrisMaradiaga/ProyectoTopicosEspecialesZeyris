<template>
  <div class="p-4 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-4">SubTracker</h1>

    <!-- Gasto total -->
    <div class="bg-gray-100 p-4 rounded mb-4">
      <h2 class="text-xl font-semibold">Gasto total mensual estimado: {{ totalMensual.toFixed(2) }} HNL</h2>
    </div>

    <!-- Formulario -->
    <SubscriptionForm @saved="refreshList" :editData="editData" />

    <!-- Lista de suscripciones -->
    <SubscriptionList
      :editData.sync="editData"
      :refreshList="refreshList"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import SubscriptionList from "./components/SubscriptionList.vue";
import SubscriptionForm from "./components/SubscriptionForm.vue";
import { useApi } from "./composables/useApi";

const editData = ref(null);
const { subscriptions, fetchSubscriptions } = useApi();

// Función para refrescar lista desde el form
const refreshList = async () => {
  await fetchSubscriptions();
  editData.value = null;
};

// Cálculo de total mensual con normalización
const totalMensual = computed(() => {
  const USD_TO_HNL = 26;
  let total = 0;

  subscriptions.value.forEach((sub: any) => {
    let price = sub.price;
    if (sub.currency === "USD") price *= USD_TO_HNL;

    if (sub.frequency === "Anual") price = price / 12;

    total += price;
  });

  return total;
});
</script>

<style>
/* Si usas Tailwind, podés eliminar este style y usar clases */
</style>



