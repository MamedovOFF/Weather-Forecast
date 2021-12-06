<template>
  <div id="app">
    <layout></layout>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Layout from '@/layout/Layout'
import Footer from '@/views/Footer'
export default {
  name: 'App',
  components: {
    Layout, Footer
  }
}
</script>

<style lang="scss">

</style>
