<template>
    <div class="spinner"></div>
</template>

<style scoped>
.spinner {
    border: 4px solid var(--color-border);
    border-radius: 50%;
    border-top: 4px solid var(--color-text);
    width: 2.5rem;
    height: 2.5rem;
    animation: spin 1s linear infinite;
    margin: 2rem auto;
}
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
