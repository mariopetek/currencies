<script>
import ErrorMessage from '@/components/ErrorMessage.vue'
import LineSeparator from '@/components/LineSeparator.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import RateCard from '@/components/RateCard.vue'
import axios from 'axios'

export default {
    data() {
        return {
            mostPopular: ['USD', 'EUR', 'JPY', 'GBP', 'AUD'],
            isLoading: true,
            error: null,
            rates: {}
        }
    },
    mounted() {
        this.getMostPopularRates()
    },
    methods: {
        async getMostPopularRates() {
            this.isLoading = true
            try {
                for (const code of this.mostPopular) {
                    const { data: ratesData } = await axios.get(
                        `${import.meta.env.VITE_API_BASE_URL}/latest/${code}`
                    )
                    this.rates[code] = ratesData
                }
            } catch (error) {
                this.error = 'Error fetching data. Please try again.'
                console.error(this.error)
            } finally {
                this.isLoading = false
            }
        },
        getCurrencySymbol(currency) {
            return (0)
                .toLocaleString('en-US', {
                    style: 'currency',
                    currency,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                })
                .replace(/\d/g, '')
                .trim()
        },
        formatTimeUpdated(code) {
            const date = new Date(this.rates[code]['time_last_update_utc'])
            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            })
        }
    },
    components: { LoadingSpinner, RateCard, ErrorMessage, LineSeparator }
}
</script>

<template>
    <h1>Conversion rates</h1>
    <LoadingSpinner v-if="isLoading" />
    <ErrorMessage v-else-if="error" :message="error" />
    <template v-else>
        <p class="info">
            Conversion rates for the 5 most traded currencies in the world.
        </p>
        <div v-for="code1 in mostPopular" :key="code1" class="container">
            <LineSeparator />
            <h2>{{ code1 }} {{ getCurrencySymbol(code1) }}</h2>
            <p>Last updated: {{ formatTimeUpdated(code1) }}</p>
            <div class="subcontainer">
                <RateCard
                    v-for="code2 in mostPopular.filter(code => code !== code1)"
                    :key="code1 + '/' + code2"
                    :code1="code1"
                    :code2="code2"
                    :rate="rates[code1]['conversion_rates'][code2]"
                    :currencySymbol="getCurrencySymbol(code2)"
                />
            </div>
        </div>
    </template>
</template>

<style scoped>
h1 {
    font-size: 2.2rem;
    margin-bottom: 1rem;
    font-weight: 600;
}
.info {
    font-size: 1.125rem;
    margin-bottom: 1rem;
}
h2 {
    font-weight: 700;
    color: var(--color-brand);
}
.container {
    display: flex;
    flex-direction: column;
}
.subcontainer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: 1rem;
    margin: 0.85rem 0;
}
</style>
