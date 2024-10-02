<script setup lang="ts">
import type { Order, Plate } from '@/types'
import PlatesSelector from './PlatesSelector.vue'
import OrderBox from './OrderBox.vue'
import { ref } from 'vue'

const orders = ref<Order[]>([])

function onSubmit(plates: Plate[]) {
  orders.value.push({
    name: String(orders.value.length + 1),
    plates,
  })
}
</script>

<template>
  <main class="m-4 flex flex-col gap-2">
    <PlatesSelector @submit="onSubmit" class="self-start" />
    <hr />
    <ul class="flex flex-wrap gap-2">
      <li v-for="(order, index) in orders" :key="index">
        <OrderBox :order="order" />
      </li>
    </ul>
  </main>
</template>
