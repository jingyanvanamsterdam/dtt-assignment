<template>
  <router-link :to="route">
    <div class="hd-heading">
      <img src="../assets/images/ic_back_grey@3x.png">
      <p>{{ showString }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'GoBack',
  props: ['route', 'showString'],
}
</script>

<style>
.hd-heading {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 30px;
}

.hd-heading img {
  width: 16px;
  height: auto;
  margin-right: 5px;
}

.hd-heading p {
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}
</style>