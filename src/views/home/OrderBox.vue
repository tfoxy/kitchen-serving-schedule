<script setup lang="ts">
import type { Order } from '@/types'
import PlateTime from './PlateTime.vue'

defineProps<{
  order: Order
}>()
</script>

<template>
  <div class="px-3 py-2 bg-zinc-200 rounded-lg">
    <h2>Orden {{ order.name }}</h2>
    <ul>
      <li v-for="plate in order.plates" :key="plate.name">
        <PlateTime :plate />
      </li>
    </ul>
  </div>
</template>
