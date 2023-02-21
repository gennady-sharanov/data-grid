<template>
  <div class="container">
    <b-nav class="nav">
      <b-nav-item active>
        <router-link to='/'>Data grid</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/elements">Elements</router-link>
      </b-nav-item>
    </b-nav>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
  };
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.nav {
  margin-bottom: 20px;
}
</style>
