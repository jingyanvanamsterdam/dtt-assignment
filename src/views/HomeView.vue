<template>
  <!--Title-->
  <div class="title">
    <h1>Houses</h1>
    <router-link to="/create-new-listing">
      <button class="create-new" type="button">
        <img src="../assets/images/ic_plus_white@3x.png" alt="icon">
        CREATE NEW
      </button>
    </router-link>
  </div>

  <!--Search&Sort Line-->
  <div class="search-filter">
    <div class="sorting">
      <div class="search-bar">
        <img class="search-icon" src="../assets/images/ic_search@3x.png" alt="search">
        <input type="search" placeholder="Search for a house" v-model="searchInput">
      </div>
      <Sorting />
    </div>
    <div class="results" v-if="this.searchInput.length > 0 && this.houses.length > 0"> {{ searchResult }} </div>
    <div class="no-results" v-if="this.searchInput.length > 0 && this.houses.length === 0">
      <img src="../assets/images/img_empty_houses@3x.png">
      <p>No results found.</p>
      <p>Please try another keyword.</p>
    </div>
  </div>

  <!--Houses container-->
  <div class="items-container">
    <div class="item" v-for="item in houses" :key="item.id">
      <HouseCard :house="item" />
    </div>
  </div>
  <router-view/>
</template>

<script>
import Sorting from "../components/Sorting.vue";
import HouseCard from "@/components/HouseCard.vue";

export default {
  name: "HomeView",
  components: {
    Sorting,
    HouseCard,
  },
  data() {
    return {
      searchInput: "",
    }
  },
  computed: {
    houses() {
      if (this.searchInput === "") {
        return this.$store.state.houses
      } else {
        return this.$store.state.houses.filter((house) => {
          return (
            house.location.street.toLowerCase().includes(this.searchInput.toLowerCase()) ||
            house.location.city.toLowerCase().includes(this.searchInput.toLowerCase()) ||
            house.location.zip.toString().includes(this.searchInput.toLowerCase()) ||
            house.description.toLowerCase().includes(this.searchInput.toLowerCase())
          )
        })
      }
    },

    searchResult() {
      return this.houses.length === 1 ? " 1 result found " : `${this.houses.length} results found`
    },
  },

  created() {
    this.$store.dispatch('fetchHouses');
  }
}
</script>

<style>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0px 0px;
}

.title h1 {
  margin: 0;
}

.create-new,
.submit button {
  background-color: #EB5440;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 10px 10px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-around;

}

.create-new img {
  width: 10%;
  height: auto;
}

/* Search and sorting line */
.search-filter {
  margin: 20px 0px;
}

.sorting {
  display: flex;
  justify-content: space-between;
}

.search-bar {
  background-color: #E8E8E8;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.search-bar input[type="search"] {
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 14px;
  width: 100%;
  padding: 10px 0px;
  border: none;
  background-color: transparent;
  color: #c3c3c3f3;
}

.search-bar input:focus {
  outline: none;
}

.search-bar img {
  width: 5%;
  padding: 10px;
  background-color: #E8E8E8;
}

.results {
  font-size: 16px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  margin: 20px 0px;
}

.no-results {
  text-align: center;
}
.no-results img {
  width: 30%;
}
</style>
