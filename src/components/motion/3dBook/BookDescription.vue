<template>
  <p :class="cn('select-none text-xs/relaxed', $props.class)">
    <slot />
  </p>
</template>

<script lang='ts' setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../../lib/utils.ts'

interface BookDescriptionProps {
  class?: HTMLAttributes['class'];
}

defineProps<BookDescriptionProps>()
</script>
