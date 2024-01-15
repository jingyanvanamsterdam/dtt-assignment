<template>
  <div class="title">
    <h1>Houses</h1>
    <router-link to="/create-new-listing">
      <button class="create-new" type="button">
        <img src="../assets/images/ic_plus_white@3x.png" alt="icon">
        CREATE NEW
      </button>
    </router-link>
  </div>

  <div class="search-filter">
    <div class="sorting">
      <div class="search-bar">
        <img class="search-icon" src="../assets/images/ic_search@3x.png" alt="search">
        <input type="search" placeholder="Search for a house" v-model="searchInput">
      </div>
      <Sorting />
    </div>
    <div v-show="this.searchInput.length > 0"> {{ searchResult }} </div>
  </div>


  <!--This is houses container-->
  <div class="items-container">
    <div class="items">
      <div class="item" v-for="item in houses" :key="item.id">
        <router-link class="item-details" :to="`/house-details/${item.id}`">
          <img class="item-img" :src="item.image" :alt="item.id" />
          <div class="item-info">
            <h5 class="item-street">{{ item.location.street }} {{ item.location.houseNumber }}</h5>
            <p class="item-price">€ {{ item.price }}</p>
            <p class="item-location">{{ item.location.zip }} {{ item.location.city }}</p>
            <div class="item-info-bbg">
              <div class="item-info-bbg-bed">
                <img class="img-small" src="../assets/images/ic_bed@3x.png" />
                <p>{{ item.rooms.bedrooms }}</p>
              </div>
              <div class="item-info-bbg-bath">
                <img class="img-small" src="../assets/images/ic_bath@3x.png" />
                <p>{{ item.rooms.bathrooms }}</p>
              </div>
              <div class="item-info-bbg-size">
                <img class="img-small" src="../assets/images/ic_size@3x.png" />
                <p>{{ item.size }} m2</p>
              </div>
            </div>
          </div>
        </router-link>
        <div class="item-edits" v-show="item.madeByMe">
          <router-link :to="`/edit-my-house/${item.id}`">
            <button class="icon-button">
              <img src="../assets/images/ic_edit@3x.png">
            </button>
          </router-link>
          <DeleteModal :itemId="item.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteModal from "../components/DeleteModal.vue";
import Sorting from "../components/Sorting.vue"

export default {
  name: "HomeView",

  components: {
    DeleteModal,
    Sorting
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
/* Title line */
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 15% 0px;
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
  margin: 20px 15%;
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
  padding: 10px
}


/*Items container*/
.items-container {
  margin: 20px 15%;
  padding-bottom: 20px;
}

.item {
  display: flex;
  align-items: flex-start;
  background-color: #FFFFFF;
  padding: 10px;
  margin: 10px 0px;
  border-radius: 5px;
}

.item-details {
  display: flex;
  align-items: flex-start;
}

.item-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
  margin-left: 0px;
  margin-right: 10px;

}

.item-info {
  flex: 2;
  height: auto;
}

.item-edits {
  display: flex;
  flex: 1;
  margin-left: auto;
  justify-content: end;
}

.item-info h5,
.item-info p {
  margin: 5px;
  padding: auto;
}

.item-location {
  font-size: 14px;
  color: #C3C3C3;
  font-family: 'Open Sans', sans-serif;
}

.item-street {
  font-size: 16px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
}

.item-price {
  font-size: 14px;
  color: #4A4B4C;
  font-family: 'Open Sans', sans-serif;
}

.item-info-bbg {
  display: flex;

}

.item-info-bbg {
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
  color: #4A4B4C;
}

.img-small {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}

.item-info-bbg-bed,
.item-info-bbg-bath,
.item-info-bbg-size {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

</style>
