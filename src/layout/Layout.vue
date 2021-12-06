<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Weather Forecast</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click="$router.push({name: 'Home'})">Home</b-nav-item>
          <b-nav-item @click="$router.push({name: 'About'})">About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-nav>
        <b-nav-item>{{ time | moment('MMMM Do YYYY h:mm:ss')}}</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>

export default {
  data () {
    return {
      time: Date.now(),
      intervalID: null
    }
  },
  created() {
   this.intervalID =  setInterval(() => this.time = Date.now(), 1000);
  },
  beforeDestroy() {
    if (this.intervalID) clearInterval(this.intervalID)
  }
}
</script>

<style lang="scss">
#btn-nav{
  margin-left: 15px;
  background-color: black;
}
</style>