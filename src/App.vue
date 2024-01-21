<script setup>
import { RouterView } from 'vue-router'
import NavHeader from './components/NavHeader.vue'
</script>

<template>
    <NavHeader />
    <div class="container">
        <RouterView />
    </div>
</template>

<style scoped>
.container {
    flex: 1;
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
}
</style>
