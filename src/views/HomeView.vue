<template>
  <div class="title">
    <h1>Houses</h1>
    <router-link to="/create-new-listing">
      <button class="create-new" type="button">
        <img src="../../public/images/ic_plus_white@3x.png" alt="icon">
        CREATE NEW
      </button>
    </router-link>    
  </div>

  <div class="search-filter">
    <div class="sorting">
          <div class="search-bar">
            <img class="search-icon" src="../../public/images/ic_search@3x.png" alt="search" >  
            <input type="search" placeholder="Search for a house" v-model="searchInput">
          </div>

          <div class="filter">
            <button class="price-filter" @click="sortByPrice">Price</button>
            <button class="size-filter" @click="sortBySize">Size</button>
          </div>
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
              <h5 class="item-street">{{item.location.street}} {{item.location.houseNumber}}</h5>
              <p class="item-price">€ {{item.price}}</p>
              <p class="item-location">{{item.location.zip}} {{item.location.city}}</p>
              <div class="item-info-bbg">
                <div class="item-info-bbg-bed">
                  <img class="img-small" src="../../public/images/ic_bed@3x.png"/>
                  <p>{{item.rooms.bedrooms}}</p>
                </div>
                <div class="item-info-bbg-bath">
                    <img class="img-small" src="../../public/images/ic_bath@3x.png" />
                    <p>{{item.rooms.bathrooms}}</p>
                </div>
                <div class="item-info-bbg-size">
                    <img class="img-small" src="../../public/images/ic_size@3x.png" />
                    <p>{{item.size}} m2</p>
                </div>
              </div>
            </div>
          </router-link> 
          <div class="item-edits" v-show="item.madeByMe">
            <router-link :to="`/edit-my-house/${item.id}`">
              <button class="icon-button">
                <img src="../../public/images/ic_edit@3x.png">
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

export default {
  name: "HomeView",

  components: {
    DeleteModal
  }, 

  data() {
    return {
      searchInput: "",
    }
  },

  methods: {
    sortByPrice(){
      this.$store.commit("sortByPrice")
    }, 
    sortBySize(){
      this.$store.commit("sortBySize")
    }, 

    
  }, 
  
  computed: {
    houses() {
      if(this.searchInput === ""){
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

    searchResult(){
      return this.houses.length === 1 ? " 1 result found " : `${this.houses.length} results found`  
    }, 
  }, 

  created() {
    this.$store.dispatch('fetchHouses');
  }
}
</script>
