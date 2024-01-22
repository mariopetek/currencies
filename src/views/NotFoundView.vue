<script>
import ErrorMessage from '@/components/ErrorMessage.vue'
export default {
    components: { ErrorMessage }
}
</script>

<template>
    <h1>404 - Not found</h1>
    <ErrorMessage message="The page you are looking for does not exist." />
</template>

<style scoped>
h1 {
    font-size: 2.2rem;
    margin-bottom: 1rem;
    font-weight: 600;
}
</style>
