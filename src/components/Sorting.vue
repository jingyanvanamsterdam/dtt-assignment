<template>
  <div class="filter">
    <button class="price-filter" @click="sortByPrice">Price</button>
    <button class="size-filter" @click="sortBySize">Size</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Sorting',
  methods: {
    ...mapMutations('housesModule',['sortByPrice', 'sortBySize'])
  }
}
</script>

<style>
.filter {
  display: flex;
  align-items: center;
}

.price-filter,
.size-filter {
  background-color: #C3C3C3;
  border: none;
  color: #FFFFFF;
  width: 7em;
  height: 100%;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
}

.price-filter {
  border-bottom-left-radius: 0.5em;
  border-top-left-radius: 0.5em;
}

.size-filter {
  border-bottom-right-radius: 0.5em;
  border-top-right-radius: 0.5em;
}

.price-filter:hover,
.size-filter:hover,
.price-filter:focus,
.size-filter:focus {
  background-color: #EB5440;
}

@media screen and (max-width: 576px) {

  .price-filter,
  .size-filter {
    font-size: 12px;
    font-family: 'Montserrat', sans-serif;
    height: 3em;
    width: 50%;
    margin-top: 1em;
  }
}
</style>