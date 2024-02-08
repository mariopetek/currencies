import { defineStore } from 'pinia'

export const useConverterStore = defineStore('converter', {
    state: () => ({
        firstCode: null,
        secondCode: null,
        firstValue: 0,
        secondValue: 0
    }),
    getters: {
        firstCurrencyCode: state => state.firstCode,
        secondCurrencyCode: state => state.secondCode,
        firstCurrencyValue: state => state.firstValue,
        secondCurrencyValue: state => state.secondValue
    },
    actions: {
        setFirstCurrencyCode(code) {
            this.firstCode = code
        },
        setSecondCurrencyCode(code) {
            this.secondCode = code
        },
        setFirstCurrencyValue(value) {
            this.firstValue = value
        },
        setSecondCurrencyValue(value) {
            this.secondValue = value
        }
    }
})
