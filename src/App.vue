<template>
  <nav>
    <div>
      <img class="logo" src="../public/images/img_logo_dtt@3x.png"/>
    </div>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <div class="container">
    <router-view />
  </div>
  
</template>


