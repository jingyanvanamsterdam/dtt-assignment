<template>
      <div class="body-container">
        <div class="title">
          <span>House</span>
          <router-link to="/create-new-listing">
            <button type="button">+ Create New</button>
          </router-link>    
        </div>

        <div class="sorting">
          <input type="search" placeholder="Search for a house" v-model="searchInput">
          <div>
            <button @click="sortByPrice">Price</button>
            <button @click="sortBySize">Size</button>
          </div>
        </div>
        <div v-show="this.searchInput.length > 0"> {{ searchResult }} </div>

        <!--This is houses container-->
        <div class="items-container">
          <div class="items">
            
              <div class="item" v-for="item in houses" :key="item.id">
                <router-link class="item-details" :to="`/house-details/${item.id}`">
                  <img class="item-img" :src="item.image" :alt="item.id" />
                  <div class="item-info">
                    <h5>{{item.location.street}} {{item.location.houseNumber}}</h5>
                    <p>€ {{item.price}}</p>
                    <p>{{item.location.zip}} {{item.location.city}}</p>
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
                    <button>edit</button>
                  </router-link>
                    <button>delete</button>
                </div>
              </div>
            
          </div>
        </div>
      </div>
</template>

<script>

export default {
  name: "HomeView",
  data() {
    return {
      searchInput: ""
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
      });
      }
    },
    searchResult(){
      return this.houses.length === 1 ? " 1 result found " : `${this.houses.length} results found`  
    }
  }
};
</script>
