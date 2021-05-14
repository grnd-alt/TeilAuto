<template>
  
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <TopBar @navChange ="navChanged" :active="2" :navs="['Developer','Projects','Contact']"/>
    <router-view/>
    <!-- <fileupload/> -->
  </div>
  
</template>

<script>
// import fileupload from './components/fileupload.vue';
import TopBar from './components/topBar.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
export default {
  name: 'App',
  components: {
    // fileupload,
    TopBar,
  },
  methods:{
    navChanged:function(changedto){
      window.location.href = changedto;
      alert("changed to: "+changedto);
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
