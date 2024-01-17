<template>
  <div class="filter">
    <button class="price-filter" @click="sortByPrice">Price</button>
    <button class="size-filter" @click="sortBySize">Size</button>
  </div>
</template>

<script>
export default {
  name: 'Sorting',
  methods: {
    sortByPrice() {
      this.$store.commit("sortByPrice")
    },
    sortBySize() {
      this.$store.commit("sortBySize")
    },
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
  width: 100px;
  height: 100%;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
}

.price-filter {
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}

.size-filter {
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
}

.price-filter:focus,
.size-filter:focus {
  background-color: #EB5440;
}

</style>