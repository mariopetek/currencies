<script>
import CurrencyConverter from '@/components/CurrencyConverter.vue'

export default {
    components: { CurrencyConverter }
}
</script>

<template>
    <h1>Currency converter</h1>
    <CurrencyConverter />
</template>

<style scoped>
h1 {
    color: var(--color-text);
    font-size: 2.2rem;
    margin-bottom: 1rem;
    font-weight: 600;
}
</style>
