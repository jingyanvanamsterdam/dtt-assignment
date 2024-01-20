<template>
  <router-link :to="route" class="go-back">
    <img src="../assets/images/ic_back_grey@3x.png" />
    <p>{{ showString }}</p>
  </router-link>
</template>

<script>
export default {
  name: 'GoBack',
  props: ['route', 'showString'],
}
</script>

<style>
.go-back {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 0em;
  margin-bottom: 1em;
}

.go-back img {
  width: 16px;
  height: auto;
  margin-right: 5px;
}

.go-back p {
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  margin: 0em;
}

@media screen and (max-width: 576px) {
  .go-back p {
    font-size: 12px;
  }

  .go-back img {
    width: 12px;
  }
}
</style>