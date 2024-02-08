<script>
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner.vue'
import CurrencySelection from './CurrencySelection.vue'
import { useConverterStore } from '@/stores/converter'
import ErrorMessage from './ErrorMessage.vue'
import LineSeparator from './LineSeparator.vue'

export default {
    data() {
        return {
            error: null,
            codesLoading: true,
            codes: [],
            ratesLoading: true,
            rates: {},
            converterStore: useConverterStore()
        }
    },
    mounted() {
        this.getSupportedCodes()
    },
    methods: {
        async getSupportedCodes() {
            this.codesLoading = true
            try {
                const { data: codesData } = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/codes`
                )
                this.codes = codesData['supported_codes']
                if (
                    !this.converterStore.firstCurrencyCode ||
                    !this.converterStore.secondCurrencyCode
                ) {
                    this.converterStore.setFirstCurrencyCode(this.codes[0][0])
                    this.converterStore.setSecondCurrencyCode(this.codes[0][0])
                }
                await this.getRates()
            } catch (error) {
                this.error = 'Error fetching data. Please try again.'
                console.error(this.error)
            } finally {
                this.codesLoading = false
            }
        },
        async getRates() {
            this.ratesLoading = true
            try {
                const { data: ratesData } = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/latest/${
                        this.converterStore.firstCurrencyCode
                    }`
                )
                this.rates = ratesData['conversion_rates']
                this.calculateSecondCurrencyValue()
            } catch (error) {
                this.error = 'Error fetching data. Please try again.'
                console.error(this.error)
            } finally {
                this.ratesLoading = false
            }
        },
        handleFirstCurrencyValueChange(event) {
            this.converterStore.setFirstCurrencyValue(event.target.value)
            this.calculateSecondCurrencyValue()
        },
        handleSecondCurrencyValueChange(event) {
            this.converterStore.setSecondCurrencyValue(event.target.value)
            this.calculateFirstCurrencyValue()
        },
        calculateFirstCurrencyValue() {
            this.converterStore.secondCurrencyValue === ''
                ? this.converterStore.setFirstCurrencyValue('')
                : this.converterStore.setFirstCurrencyValue(
                      Number(this.converterStore.secondCurrencyValue) /
                          this.rates[this.converterStore.secondCurrencyCode]
                  )
        },
        calculateSecondCurrencyValue() {
            this.converterStore.firstCurrencyValue === ''
                ? this.converterStore.setSecondCurrencyValue('')
                : this.converterStore.setSecondCurrencyValue(
                      Number(this.converterStore.firstCurrencyValue) *
                          this.rates[this.converterStore.secondCurrencyCode]
                  )
        }
    },
    components: {
        LoadingSpinner,
        CurrencySelection,
        ErrorMessage,
        LineSeparator
    }
}
</script>

<template>
    <LoadingSpinner v-if="codesLoading" />
    <ErrorMessage v-else-if="error" :message="error" />
    <div v-else class="container">
        <div class="subcontainer">
            <h2>Input currency</h2>
            <div class="currencySelectionContainer">
                <CurrencySelection
                    :codes="codes"
                    :currencyCode="converterStore.firstCurrencyCode"
                    @change-handler="getRates"
                    @update:currency-code="
                        converterStore.setFirstCurrencyCode($event)
                    "
                    name="firstCurrencyCode"
                />
            </div>
            <div class="currencyInputContainer">
                <input
                    type="number"
                    :value="converterStore.firstCurrencyValue"
                    @input="handleFirstCurrencyValueChange($event)"
                    placeholder="Amount in selected input currency"
                    :disabled="ratesLoading"
                    name="firstCurrencyValue"
                    title="Enter amount"
                />
            </div>
        </div>
        <LineSeparator />
        <div class="subcontainer">
            <h2>Output currency</h2>
            <div class="currencySelectionContainer">
                <CurrencySelection
                    :codes="codes"
                    :currencyCode="converterStore.secondCurrencyCode"
                    @change-handler="calculateSecondCurrencyValue"
                    @update:currency-code="
                        converterStore.setSecondCurrencyCode($event)
                    "
                    name="secondCurrencyCode"
                />
            </div>
            <div class="currencyInputContainer">
                <input
                    type="number"
                    :value="converterStore.secondCurrencyValue"
                    @input="handleSecondCurrencyValueChange($event)"
                    placeholder="Amount in selected output currency"
                    :disabled="ratesLoading"
                    name="secondCurrencyValue"
                    title="Enter amount"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    padding: 2rem;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
}
.subcontainer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
h2 {
    font-weight: 600;
    font-size: 1.5rem;
}
.currencySelectionContainer,
.currencyInputContainer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
}
input {
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background-color: var(--color-background-mute);
    padding: 0.5rem;
    font-size: 1rem;
    font-family: inherit;
    color: var(--color-text);
    transition: background-color 0.2s ease-in-out;
}
input::placeholder {
    opacity: 0.6;
}
input:hover {
    background-color: var(--color-background-soft);
}
input:focus {
    background-color: var(--color-background-soft);
    border-color: var(--color-brand);
    outline: 2px solid var(--color-brand);
}
input:disabled {
    border: 1px solid var(--color-background-soft);
    background-color: var(--color-background-soft);
}
</style>
