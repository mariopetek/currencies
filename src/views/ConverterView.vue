<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import axios from 'axios'
export default {
    data() {
        return {
            isLoading: false,
            data: [],
            error: null
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            this.isLoading = true
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/latest/USD`
                )
                this.data = response.data
            } catch (error) {
                console.error('Error fetching data:', error)
                this.error = 'Error fetching data. Please try again.'
            } finally {
                this.isLoading = false
            }
        }
    },
    components: { LoadingSpinner }
}
</script>

<template>
    <LoadingSpinner v-if="isLoading" />
    <template v-else>
        <h1>Currency converter</h1>
        <p v-if="error">{{ error }}</p>
        {{ data }}
    </template>
</template>

<style scoped></style>
