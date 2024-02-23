<script setup lang="ts">
import { format } from '@formkit/tempo'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const props = defineProps<{
  modelValue?: Date
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', payload: typeof props.modelValue): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button :variant="'outline'" :class="cn(
        'w-full justify-start text-left font-normal grid grid-cols-[auto_minmax(0,1fr)]',
        !modelValue && 'text-muted-foreground',
      )">
        <CalendarIcon class="me-2 h-4 w-4 shrink-0" />
        <span class="truncate">{{ modelValue ? format(modelValue, { date: 'short', time: 'short' }) : "Pick a date"
        }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="modelValue" mode="datetime" />
    </PopoverContent>
  </Popover>
</template>
