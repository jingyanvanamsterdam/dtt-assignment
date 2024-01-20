<template>
  <div class="home-box">
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
    <div class="sorting">
      <div class="search-bar">
        <img class="search-icon" src="../assets/images/ic_search@3x.png" alt="search">
        <input type="search" placeholder="Search for a house" v-model="searchInput">
        <img class="clear-icon" src="../assets/images/ic_clear@3x.png" alt="clear" v-if="searchInput"
          @click="clearSearch" />
      </div>
      <Sorting />
    </div>
    <div class="results" v-if="this.searchInput.length > 0 && this.houses.length > 0">
      {{ searchResult }}
    </div>
    <!-- Show Results -->
    <div class="no-results" v-if="this.searchInput.length > 0 && this.houses.length === 0">
      <img src="../assets/images/img_empty_houses@3x.png">
      <p>No results found.</p>
      <p>Please try another keyword.</p>
    </div>

    <!--Houses container-->
    <div class="items-container">
      <div class="item" v-for="item in houses" :key="item.id">
        <HouseCard :house="item" />
      </div>
    </div>
  </div>
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
  methods: {
    clearSearch() {
      this.searchInput = ""
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
}

.title h1 {
  margin: 0px;
}

.create-new,
.submit button {
  background-color: #EB5440;
  color: #FFFFFF;
  border: none;
  border-radius: 0.5em;
  padding: 10px 10px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.create-new img {
  width: 10%;
  height: auto;
}

/* Search and sorting line */
.sorting {
  display: flex;
  justify-content: space-between;
  margin: 1.5em 0em;
}

.search-bar {
  background-color: #E8E8E8;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  border-radius: 0.5em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.7em;
}

.search-bar img {
  width: 1em;
  height: auto;
  background-color: #E8E8E8;
}

.search-bar input[type="search"] {
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 14px;
  width: 100%;
  padding-left: 0.5em;
  border: none;
  background-color: transparent;
  color: #c3c3c3f3;
  flex-grow: 1;
}

.search-bar input:focus {
  outline: none;
}

/*To remove the browser default clear icon */
.search-bar input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
}

.search-bar input[type="search"]::-moz-search-clear-button,
.search-bar input[type="search"]::-ms-clear {
  display: none;
}

/* Results style */
.results {
  font-size: 0.89em;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  margin: 1em 0em;
}

.no-results {
  text-align: center;
}

.no-results img {
  width: 30%;
  padding-bottom: 1em;
}

.no-results p {
  font-size: 1em;
  margin: 0em;
}

.items-container {
  margin: 1em 0em;
  padding-bottom: 1em;
}

@media screen and (max-width: 576px) {
  .sorting {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 1.5em 0em;
  }

  .search-bar input[type="search"] {
    font-size: 1em;
  }

  .results {
    font-size: 1em;
    font-weight: bold;
    font-family: 'Montserrat', sans-serif;
    margin: 1em 0em;
  }

  .no-results p {
    font-size: 14px;
  }

  .no-results img {
    width: 50%;
    padding-bottom: 1em;
  }

}
</style>
