<template>
  <div class="bg-white p-4 rounded shadow mb-2 flex justify-between items-center">
    <div>
      <h3 class="font-semibold text-lg">{{ subscription.name }}</h3>
      <p>Precio: {{ subscription.price }} {{ subscription.currency }}</p>
      <p>Frecuencia: {{ subscription.frequency }}</p>
      <p>Fecha de pago: {{ subscription.pay_date }}</p>
    </div>
    <div class="flex gap-2">
      <button
        @click="$emit('edit', subscription)"
        class="bg-blue-500 text-white px-2 py-1 rounded"
      >
        Editar
      </button>
      <button
        @click="$emit('delete', subscription.id)"
        class="bg-red-500 text-white px-2 py-1 rounded"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ subscription: any }>();
const emit = defineEmits<{ (e: "edit"): void; (e: "delete"): void }>();
</script>
