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
                    !this.converterStore.inputCurrencyCode ||
                    !this.converterStore.outputCurrencyCode
                ) {
                    this.converterStore.setInputCurrencyCode(this.codes[0][0])
                    this.converterStore.setOutputCurrencyCode(this.codes[0][0])
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
                        this.converterStore.inputCurrencyCode
                    }`
                )
                this.rates = ratesData['conversion_rates']
                this.calculateOutputCurrencyValue()
            } catch (error) {
                this.error = 'Error fetching data. Please try again.'
                console.error(this.error)
            } finally {
                this.ratesLoading = false
            }
        },
        handleInputCurrencyValueChange(event) {
            this.converterStore.setInputCurrencyValue(event.target.value)
            this.calculateOutputCurrencyValue()
        },
        handleOutputCurrencyCodeChange(event) {
            this.converterStore.setOutputCurrencyCode(event)
            this.calculateOutputCurrencyValue()
        },
        calculateOutputCurrencyValue() {
            this.converterStore.setOutputCurrencyValue(
                Number(this.converterStore.inputCurrencyValue) *
                    this.rates[this.converterStore.outputCurrencyCode]
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
            <div class="inputCurrencySelectionContainer">
                <label for="inputCurrencySelection"
                    >Choose an input currency</label
                >
                <CurrencySelection
                    name="inputCurrencySelection"
                    id="inputCurrencySelection"
                    :codes="codes"
                    :currencyCode="converterStore.inputCurrencyCode"
                    @change-handler="getRates"
                    @update:currency-code="
                        converterStore.setInputCurrencyCode($event)
                    "
                />
            </div>
            <div class="inputCurrencyInputContainer">
                <label for="inputCurrencyInput">Value to convert</label>
                <input
                    type="number"
                    :value="converterStore.inputCurrencyValue"
                    @input="handleInputCurrencyValueChange($event)"
                    id="inputCurrencyInput"
                    name="inputCurrencyInput"
                    placeholder="Enter amount"
                    :disabled="ratesLoading"
                />
            </div>
        </div>
        <LineSeparator />
        <div class="subcontainer">
            <div class="outputCurrencySelectionContainer">
                <label for="outputCurrencySelection"
                    >Choose an output currency</label
                >
                <CurrencySelection
                    name="outputCurrencySelection"
                    id="outputCurrencySelection"
                    :codes="codes"
                    :currencyCode="converterStore.outputCurrencyCode"
                    @change-handler="calculateOutputCurrencyValue"
                    @update:currency-code="
                        handleOutputCurrencyCodeChange($event)
                    "
                />
            </div>
            <div class="outputCurrencyInputContainer">
                <label for="outputCurrencyInput">Output value</label>
                <input
                    type="text"
                    :value="
                        converterStore.inputCurrencyValue !== ''
                            ? converterStore.outputCurrencyValue
                            : ''
                    "
                    id="outputCurrencyInput"
                    name="outputCurrencyInput"
                    placeholder="Conversion result"
                    disabled
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
.inputCurrencySelectionContainer,
.inputCurrencyInputContainer,
.outputCurrencySelectionContainer,
.outputCurrencyInputContainer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
label {
    font-weight: 600;
    font-size: 1.125rem;
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
