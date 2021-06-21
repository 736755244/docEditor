<template>
    <div class="app-wrapper">
        <sliderbar class="sidebar-container"/>
        <div class="main-container">
            <navbar/>
            <app-main/>
        </div>
    </div>
</template>

<script>
    import { Navbar, Sliderbar, AppMain } from './components'

    export default {
        name: 'Layout',
        components: {
            Navbar,
            Sliderbar,
            AppMain
        },
        computed: {
        },
        methods: {
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        &.mobile.openSidebar{
            position: fixed;
            top: 0;
        }
    } 
</style>
