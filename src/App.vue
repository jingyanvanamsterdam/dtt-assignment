<template>
  <nav>
    <img class="logo" src="./assets/images/img_logo_dtt@3x.png"/>
    <router-link class="nav-home" to="/">
      <p>Houses</p>
    </router-link> 
    <router-link to="/about">
      <p>About</p>
    </router-link>
  </nav>
  <div class="container">
    <router-view />
  </div>
  
</template>


