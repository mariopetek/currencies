<script>
export default {
    props: {
        message: {
            type: String,
            required: true
        }
    }
}
</script>

<template>
    <div class="errorContainer">
        <div class="iconContainer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                    d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
                />
            </svg>
        </div>
        <div class="messageContainer">
            <p>Error: {{ message }}</p>
        </div>
    </div>
</template>

<style scoped>
.errorContainer {
    display: flex;
    border-radius: var(--border-radius);
    max-width: 25rem;
    margin: 1rem auto;
}
.iconContainer {
    background-color: var(--color-error);
    border: 1px solid var(--color-error);
    border-radius: var(--border-radius) 0 0 var(--border-radius);
    padding: 0.85rem;
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.messageContainer {
    background-color: var(--color-background-soft);
    border: 1px solid var(--color-error);
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    padding: 0.85rem;
    width: 80%;
    display: flex;
    align-items: center;
}
.messageContainer > p {
    color: var(--color-text);
}
svg {
    width: 2rem;
    height: 2rem;
    fill: var(--color-text);
}
</style>
