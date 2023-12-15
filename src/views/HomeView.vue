<template>
      <div class="body-container">
        <div class="title">
          <span>House</span>
          <router-link to="/create-new-listing">
            <button type="button">+ Create New</button>
          </router-link>    
        </div>

        <div class="sorting">
          <input type="text" placeholder="Search...">
          <div>
            <!--define the price and size filter in the script-->
            <button @click="priceFilter">Price Filter</button>
            <button @click="sizeFilter">Size Filter</button>
          </div>
        </div>

        <!--This is houses container-->
        <div class="items-container">
          <div class="items">
            <router-link v-for="item in houses" :key="item.id" :to="`/house-details/${item.id}`">
              <div class="item">
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
                <div class="item-edits">
                      <!--change here, can use a container, in the tag write v-on:click="javascript function/method" or @click-->
                    <button>edit</button>
                    <button>delete</button>
                </div>
              </div>
            </router-link> 
          </div>
        </div>
      </div>
</template>

<script>
// @ is an alias to /src
//import { useHouseStore } from '@/stores/houses';
//const housesStore = useHouseStore();


export default {
  name: "HomeView",
  computed: {
    houses() {
      return this.$store.state.houses
    }
  }
};
</script>
