<template>
  <div id="app">


    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">CEMVS</a>

      <ul class="navbar-nav mr-auto">
      <!-- -->
      </ul>

      <ul class="navbar-nav">

        <li class="nav-item" v-if="$auth.check()">

          <router-link to="/" >
            <a class="nav-link">{{ this.$auth.user.email }}</a>
          </router-link>
        </li>

        <li class="nav-item"  v-if="$auth.check()">


          <a href="#" class="nav-link"
             v-on:click="$auth.logout()">Déconnexion
          </a>

        </li>

        <li class="nav-item" v-else>

          <router-link to="/">
            <a class="nav-link">Connexion</a>
          </router-link>
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


export default {
  name: 'app',
  components: {

  },
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
