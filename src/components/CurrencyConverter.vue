<script>
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner.vue'
import CurrencySelection from './CurrencySelection.vue'

export default {
    data() {
        return {
            error: null,
            codesLoading: true,
            codes: [],
            ratesLoading: true,
            rates: {},
            inputCurrencyCode: null,
            outputCurrencyCode: null,
            inputCurrencyValue: 0,
            outputCurrencyValue: 0
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
                this.inputCurrencyCode = this.codes[0][0]
                this.outputCurrencyCode = this.codes[0][0]
                await this.getRates()
            } catch (error) {
                console.error('Error fetching data:', error)
                this.error = 'Error fetching data. Please try again.'
            } finally {
                this.codesLoading = false
            }
        },
        async getRates() {
            this.ratesLoading = true
            try {
                const { data: ratesData } = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/latest/${
                        this.inputCurrencyCode
                    }`
                )
                this.rates = ratesData['conversion_rates']
                this.calculateOutputCurrencyValue()
            } catch (error) {
                console.error('Error fetching data:', error)
                this.error = 'Error fetching data. Please try again.'
            } finally {
                this.ratesLoading = false
            }
        },
        calculateOutputCurrencyValue() {
            this.outputCurrencyValue =
                this.inputCurrencyValue * this.rates[this.outputCurrencyCode]
            return this.outputCurrencyValue
        }
    },
    components: { LoadingSpinner, CurrencySelection }
}
</script>

<template>
    <LoadingSpinner v-if="codesLoading" />
    <p v-else-if="error" class="error">{{ error }}</p>
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
                    :currencyCode="inputCurrencyCode"
                    @change-handler="getRates"
                    @update:currency-code="inputCurrencyCode = $event"
                />
            </div>
            <div class="inputCurrencyInputContainer">
                <label for="inputCurrencyInput">Value to convert</label>
                <input
                    type="number"
                    v-model="inputCurrencyValue"
                    @change="calculateOutputCurrencyValue"
                    id="inputCurrencyInput"
                    name="inputCurrencyInput"
                    placeholder="Enter amount"
                    :disabled="ratesLoading"
                />
            </div>
        </div>
        <div class="separator"></div>
        <div class="subcontainer">
            <div class="outputCurrencySelectionContainer">
                <label for="outputCurrencySelection"
                    >Choose an output currency</label
                >
                <CurrencySelection
                    name="outputCurrencySelection"
                    id="outputCurrencySelection"
                    :codes="codes"
                    :currencyCode="outputCurrencyCode"
                    @change-handler="calculateOutputCurrencyValue"
                    @update:currency-code="outputCurrencyCode = $event"
                />
            </div>
            <div class="outputCurrencyInputContainer">
                <label for="outputCurrencyInput">Output value</label>
                <input
                    type="text"
                    :value="
                        inputCurrencyValue !== ''
                            ? calculateOutputCurrencyValue()
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
.outputCurrencySelectionContainer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.inputCurrencyInputContainer,
.outputCurrencyInputContainer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.separator {
    height: 1px;
    background-color: var(--color-border);
    margin: 1rem 0;
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
.error {
    color: var(--color-error);
    font-size: 1.5rem;
    text-align: center;
    padding: 1rem;
}
</style>
