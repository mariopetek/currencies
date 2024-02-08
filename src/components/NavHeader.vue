<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <header>
        <div class="logoContainer">
            <img src="../assets/logo.svg" alt="Currencies logo" />
            <h2>Currencies</h2>
        </div>
        <nav>
            <RouterLink to="/" active-class="active" title="Currency converter"
                >Converter</RouterLink
            >
            <RouterLink
                to="/rates"
                active-class="active"
                title="Conversion rates"
                >Rates</RouterLink
            >
        </nav>
    </header>
</template>

<style scoped>
header {
    --header-height: 3rem;
    background-color: var(--color-heading);
    border-bottom: 1px solid var(--color-border);
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--header-height);
    gap: 3rem;
    position: sticky;
    top: 0;
    z-index: 1;
}
.logoContainer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 100%;
    padding: 0.6rem;
}
.logoContainer > img {
    height: 100%;
}
.logoContainer > h2 {
    font-weight: 600;
}
nav {
    display: flex;
}
a {
    text-decoration: none;
    font-weight: 500;
    color: var(--color-text);
    padding: 0 1rem;
    transition: color 0.2s ease-in-out;
    line-height: var(--header-height);
}
a:hover {
    color: var(--color-brand);
}
.active {
    transition: none;
    color: var(--color-brand);
    border-bottom: 1px solid var(--color-brand);
}
</style>
