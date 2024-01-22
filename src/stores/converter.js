import { defineStore } from 'pinia'

export const useConverterStore = defineStore('converter', {
    state: () => ({
        inputCode: null,
        outputCode: null,
        inputValue: 0,
        outputValue: 0
    }),
    getters: {
        inputCurrencyCode: state => state.inputCode,
        outputCurrencyCode: state => state.outputCode,
        inputCurrencyValue: state => state.inputValue,
        outputCurrencyValue: state => state.outputValue
    },
    actions: {
        setInputCurrencyCode(code) {
            this.inputCode = code
        },
        setOutputCurrencyCode(code) {
            this.outputCode = code
        },
        setInputCurrencyValue(value) {
            this.inputValue = value
        },
        setOutputCurrencyValue(value) {
            this.outputValue = value
        }
    }
})
