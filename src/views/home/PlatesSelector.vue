<script setup lang="ts">
import type { Plate } from '@/types'
import AutoComplete, { type AutoCompleteCompleteEvent } from 'primevue/autocomplete'
import { computed, ref, useTemplateRef, watch } from 'vue'

const emit = defineEmits<{
  submit: [plates: Plate[]]
}>()

const allSuggestions: Plate[] = [
  { name: 'Empanadas', time: 3 * 60 * 1000 },
  { name: 'Milanesas', time: 5 * 60 * 1000 },
  { name: 'Asado', time: 10 * 60 * 1000 },
  { name: 'Pizza', time: 15 * 60 * 1000 },
  { name: 'Tarta', time: 20 * 60 * 1000 },
  { name: 'Ensalada', time: 25 * 60 * 1000 },
  { name: 'Sushi', time: 30 * 60 * 1000 },
  { name: 'Hamburguesa', time: 35 * 60 * 1000 },
  { name: 'Pasta', time: 40 * 60 * 1000 },
  { name: 'Pollo', time: 45 * 60 * 1000 },
  { name: 'Pescado', time: 50 * 60 * 1000 },
  { name: 'Sopa', time: 55 * 60 * 1000 },
  { name: 'Tacos', time: 60 * 60 * 1000 },
  { name: 'Choripan', time: 65 * 60 * 1000 },
  { name: 'Lomito', time: 70 * 60 * 1000 },
  { name: 'Papas', time: 90 * 60 * 1000 },
]

const model = ref<Plate[]>([])

const notSelectedSuggestions = computed(() => {
  return allSuggestions.filter((suggestion) => {
    return !model.value.includes(suggestion)
  })
})

const suggestions = ref(notSelectedSuggestions.value)

const filterSuggestions = (event: AutoCompleteCompleteEvent) => {
  const query = event.query.toLowerCase()
  suggestions.value = notSelectedSuggestions.value.filter((suggestion) => {
    return suggestion.name.toLowerCase().includes(query)
  })
}

const autoCompleteRef = useTemplateRef('autoComplete')

watch(
  autoCompleteRef,
  (autoComplete) => {
    if (!autoComplete) return
    const _onEnterKey = autoComplete.onEnterKey
    autoComplete.onEnterKey = function onEnterKey(event: KeyboardEvent) {
      if (!this.overlayVisible) {
        if (this.modelValue.length === 0) return
        emit('submit', model.value)
        model.value = []
        return
      }

      _onEnterKey(event)
    }

    const _onArrowDownKey = autoComplete.onArrowDownKey
    autoComplete.onArrowDownKey = function onArrowDownKey(event: KeyboardEvent) {
      if (!this.overlayVisible) {
        this.show()
        return
      }

      _onArrowDownKey(event)
    }
  },
  { once: true },
)
</script>

<template>
  <AutoComplete
    ref="autoComplete"
    :suggestions
    @complete="filterSuggestions"
    option-label="name"
    v-model="model"
    multiple
    :delay="0"
    placeholder="Plato"
    :min-length="0"
    auto-option-focus
    complete-on-focus
    :pt="{ input: { autofocus: true } }"
  />
</template>
