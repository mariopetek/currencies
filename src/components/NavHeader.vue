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
            <ul>
                <li>
                    <RouterLink to="/" active-class="active"
                        >Converter</RouterLink
                    >
                </li>
                <li>
                    <RouterLink to="/rates" active-class="active"
                        >Rates</RouterLink
                    >
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    background-color: var(--color-heading);
    border-bottom: 1px solid var(--color-border);
    padding: 0.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    gap: 3rem;
    position: sticky;
    top: 0;
}
.logoContainer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 100%;
}
.logoContainer > img {
    height: 100%;
}
.logoContainer > h2 {
    font-weight: 600;
}
ul {
    display: flex;
    gap: 0.85rem;
    list-style-type: none;
}
a {
    text-decoration: none;
    font-weight: 500;
    color: var(--color-text);
    padding: 0.85rem 1rem;
    transition: color 0.2s ease-in-out;
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
