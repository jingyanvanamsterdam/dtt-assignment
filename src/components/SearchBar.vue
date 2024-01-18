<template>
  <div class="search-bar">
    <img class="search-icon" src="../assets/images/ic_search@3x.png" alt="search">
    <input type="search" placeholder="Search for a house" v-model="searchInput">
  </div>
</template>

<script>
export default {
  data(){
    return {
      searchInput: "",
    }
  }, 
}
  
</script>