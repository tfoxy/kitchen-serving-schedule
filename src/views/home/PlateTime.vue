<script setup lang="ts">
import type { Plate } from '@/types'
import { useNow } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  plate: Plate
}>()

const end = ref(Date.now())

const { now, resume, pause } = useNow({ controls: true, interval: 1000 })

watch(
  () => props.plate,
  (plate) => {
    end.value = Date.now() + plate.time
    resume()
  },
  { immediate: true },
)

const countdown = computed(() => {
  return Math.max(0, end.value - now.value.getTime())
})

const formattedCountdown = computed(() => {
  const roundedValue = Math.round(countdown.value / 1000)
  const minutes = Math.floor(roundedValue / 60)
  const seconds = Math.floor(roundedValue) % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

watch(
  countdown,
  (countdown) => {
    if (countdown === 0) {
      pause()
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>{{ plate.name }}: {{ formattedCountdown }}</div>
</template>
