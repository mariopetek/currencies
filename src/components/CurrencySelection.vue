<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        currencyCode: {
            type: String,
            required: true
        },
        codes: {
            type: Array,
            required: true
        }
    },
    computed: {
        value: {
            get() {
                return this.currencyCode
            },
            set(value) {
                this.$emit('update:currencyCode', value)
            }
        }
    },
    emits: ['changeHandler', 'update:currencyCode'],
    methods: {
        changeHandler() {
            this.$emit('changeHandler')
        }
    }
}
</script>

<template>
    <div class="customSelect">
        <select :name="name" :id="id" v-model="value" @change="changeHandler">
            <option v-for="code in codes" :key="code[0]" :value="code[0]">
                {{ code[0] }}, {{ code[1] }}
            </option>
        </select>
        <span class="arrow"></span>
    </div>
</template>

<style scoped>
.customSelect {
    position: relative;
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
.arrow {
    position: absolute;
    top: 0;
    right: 0;
    width: 3rem;
    height: 100%;
    pointer-events: none;
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
</style>
