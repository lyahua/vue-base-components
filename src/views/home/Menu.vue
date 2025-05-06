<template>
    <div style="display: flex; gap: 10px">
        <div v-for="item in router.getRoutes()" :key="item.path">
            <router-link :to="item.path"  v-text='item.meta.title' tag='div' exact-active-class="lightHeight"></router-link>
        </div>
    </div>
</template>

<script setup>
import router from '@/router/index'
console.log('router', router.getRoutes())
</script>

<style lang="css" scoped>

</style>