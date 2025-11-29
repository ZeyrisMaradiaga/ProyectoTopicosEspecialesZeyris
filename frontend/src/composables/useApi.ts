// src/composables/useApi.ts
import { ref } from "vue";

const API_URL = "http://localhost:3000/subscriptions";

export function useApi() {
  const subscriptions = ref([]);

  const fetchSubscriptions = async () => {
    const res = await fetch(API_URL);
    subscriptions.value = await res.json();
  };

  const createSubscription = async (sub: any) => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sub),
    });
    await fetchSubscriptions();
  };

  const updateSubscription = async (id: number, sub: any) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sub),
    });
    await fetchSubscriptions();
  };

  const deleteSubscription = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    await fetchSubscriptions();
  };

  return { subscriptions, fetchSubscriptions, createSubscription, updateSubscription, deleteSubscription };
}
