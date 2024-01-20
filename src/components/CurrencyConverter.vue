<script>
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner.vue'
export default {
    data() {
        return {
            error: null,
            codesLoading: false,
            codes: [],
            ratesLoading: false,
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
    components: { LoadingSpinner }
}
</script>

<template>
    <LoadingSpinner v-if="codesLoading" />
    <div v-else class="container">
        <p v-if="error" class="error">{{ error }}</p>
        <template v-else>
            <div class="subcontainer">
                <div class="inputCurrencySelectionContainer">
                    <label for="inputCurrencySelection"
                        >Choose an input currency</label
                    >
                    <div class="customSelect">
                        <select
                            name="inputCurrencySelection"
                            id="inputCurrencySelection"
                            v-model="inputCurrencyCode"
                            @change="getRates"
                        >
                            <option
                                v-for="code in codes"
                                :key="code[0]"
                                :value="code[0]"
                            >
                                {{ code[0] }}, {{ code[1] }}
                            </option>
                        </select>
                        <span class="arrow"></span>
                    </div>
                </div>
                <div class="inputCurrencyInputContainer">
                    <label for="inputCurrencyInput"
                        >Enter value to convert</label
                    >
                    <input
                        type="number"
                        v-model="inputCurrencyValue"
                        @change="calculateOutputCurrencyValue"
                        name="inputCurrencyInput"
                        id="inputCurrencyInput"
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
                    <div class="customSelect">
                        <select
                            name="outputCurrencySelection"
                            id="outputCurrencySelection"
                            v-model="outputCurrencyCode"
                            @change="calculateOutputCurrencyValue"
                        >
                            <option
                                v-for="code in codes"
                                :key="code[0]"
                                :value="code[0]"
                            >
                                {{ code[0] }}, {{ code[1] }}
                            </option>
                        </select>
                        <span class="arrow"></span>
                    </div>
                </div>
                <div class="outputCurrencyInputContainer">
                    <label for="outputCurrencyInput">Output value</label>
                    <input
                        type="number"
                        :value="calculateOutputCurrencyValue()"
                        id="outputCurrencyInput"
                        name="outputCurrencyInput"
                        disabled
                    />
                </div>
            </div>
        </template>
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
    width: fit-content;
}
.customSelect {
    position: relative;
}
.arrow {
    position: absolute;
    top: 0;
    right: 0;
    width: 3rem;
    height: 100%;
    pointer-events: none;
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    border: 1px solid var(--color-border);
    --arrow-size: 0.4rem;
}
.arrow::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-left: var(--arrow-size) solid transparent;
    border-right: var(--arrow-size) solid transparent;
    border-top: var(--arrow-size) solid var(--color-text);
}
select {
    appearance: none;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background-color: var(--color-background-mute);
    padding: 0.5rem 3.5rem 0.5rem 0.5rem;
    font-size: 1rem;
    font-family: inherit;
    color: var(--color-text);
    width: 100%;
    transition: background-color 0.2s ease-in-out;
}
select:hover {
    cursor: pointer;
    background-color: var(--color-background-soft);
}
select:focus {
    border-color: var(--color-brand);
    outline: 2px solid var(--color-brand);
}
.error {
    color: var(--color-error);
    font-size: 0.875rem;
    margin-top: 0.5rem;
}
</style>
