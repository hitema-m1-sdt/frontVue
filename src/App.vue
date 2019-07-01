<template>
  <div id="app">


    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">CEMVS</a>

      <ul class="navbar-nav mr-auto">
      <!-- -->
      </ul>

      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/"><a class="nav-link">Connexion</a></router-link>
        </li>
      </ul>

      <button class="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>


    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>

  </div>
</template>

<script>
import LoginComponent from './components/LoginComponent.vue'


export default {
  name: 'app',
  components: {
    LoginComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
