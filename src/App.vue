<template>
  <nav>
    <img class="logo" src="./assets/images/img_logo_dtt@3x.png" />
    <router-link class="nav-home" to="/">
      <p>Houses</p>
    </router-link>
    <router-link class="about" to="/about">
      <p>About</p>
    </router-link>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>

<style>
/*nav bar style*/
.navbar-default {
  margin: 0 !important;
}

nav {
  width: 100%;
  height: 2em;
  padding: 1em 0em;
  display: flex;
  align-items: center;
  justify-content: left;
  top: 0;
  position: fixed;
  z-index: 1000;
  background-color: #FFFFFF;
}

.logo {
  height: 100%;
  width: auto;
  margin-right: 5%;
  margin-left: 15%;
}

nav a p {
  font-weight: 500;
  color: #C3C3C3;
  font-size: 1em;
  margin: 0px;
}

nav a.router-link-active p {
  font-weight: bold;
  color: #000000;
  font-size: 1em;
}

a:-webkit-any-link {
  color: #000000 !important;
  cursor: pointer;
  text-decoration: none;
}

.nav-home {
  margin-right: 5%;
}

.home-box,
.about-box,
.hd,
.form-box {
  margin-top: 7em;
  margin-left: 15%;
  margin-right: 15%;
}

@media screen and (max-width: 576px) {
  .navbar-default {
    margin: 0 !important;
  }

  .logo {
    margin-left: 1.5em;
  }

  .home-box,
  .about-box,
  .hd,
  .form-box {
    margin-top: 5.5em;
    margin-left: 1.5em;
    margin-right: 1.5em;
  }
}
</style>
