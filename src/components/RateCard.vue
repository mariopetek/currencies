<script>
export default {
    props: {
        code1: {
            type: String,
            required: true
        },
        code2: {
            type: String,
            required: true
        },
        rate: {
            type: Number,
            required: true
        },
        currencySymbol: {
            type: String,
            required: true
        }
    },
    computed: {
        codesFormatted() {
            return this.code1 + '/' + this.code2
        },
        rateFormatted() {
            return this.rate + ' ' + this.currencySymbol
        }
    }
}
</script>

<template>
    <div class="container">
        <h3>{{ codesFormatted }}</h3>
        <p>{{ rateFormatted }}</p>
    </div>
</template>

<style scoped>
.container {
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background-color: var(--color-background-soft);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
h3 {
    font-size: 1.125rem;
    font-weight: 600;
}
</style>
