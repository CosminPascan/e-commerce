<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
    <v-app>
        <NavBar />
        <router-view />
    </v-app>
</template>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
</style>

