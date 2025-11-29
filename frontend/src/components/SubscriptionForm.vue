<template>
  <form @submit.prevent="submitForm" class="bg-gray-100 p-4 rounded mb-4">
    <div class="mb-2">
      <input v-model="sub.name" placeholder="Nombre" class="border p-1 w-full" />
    </div>
    <div class="mb-2">
      <input v-model.number="sub.price" placeholder="Precio" type="number" class="border p-1 w-full" />
    </div>
    <div class="mb-2 flex gap-2">
      <select v-model="sub.currency" class="border p-1 flex-1">
        <option value="USD">USD</option>
        <option value="HNL">HNL</option>
      </select>
      <select v-model="sub.frequency" class="border p-1 flex-1">
        <option value="Mensual">Mensual</option>
        <option value="Anual">Anual</option>
      </select>
    </div>
    <div class="mb-2">
      <input v-model="sub.pay_date" type="date" class="border p-1 w-full" />
    </div>
    <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
      {{ sub.id ? "Actualizar" : "Agregar" }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { useApi } from "../composables/useApi";

const props = defineProps<{ editData?: any }>();

const emit = defineEmits<{ (e: "saved"): void }>();

const { createSubscription, updateSubscription } = useApi();

const sub = reactive({
  id: props.editData?.id || null,
  name: props.editData?.name || "",
  price: props.editData?.price || 0,
  currency: props.editData?.currency || "USD",
  frequency: props.editData?.frequency || "Mensual",
  pay_date: props.editData?.pay_date || "",
});

// Actualizar el form si cambian los datos para editar
watch(() => props.editData, (newVal) => {
  if (newVal) {
    sub.id = newVal.id;
    sub.name = newVal.name;
    sub.price = newVal.price;
    sub.currency = newVal.currency;
    sub.frequency = newVal.frequency;
    sub.pay_date = newVal.pay_date;
  } else {
    sub.id = null;
    sub.name = "";
    sub.price = 0;
    sub.currency = "USD";
    sub.frequency = "Mensual";
    sub.pay_date = "";
  }
});

const submitForm = async () => {
  if (sub.id) {
    await updateSubscription(sub.id, sub);
  } else {
    await createSubscription(sub);
  }
  emit("saved");
};
</script>


