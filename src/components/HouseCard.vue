<template>
  <div class="item-details" @click="goToDetail">
    <img class="item-img" :src="house.image" :alt="house.id" />
<!--House info-->
    <div class="item-info">
      <h5 class="item-street">{{ house.location.street }} {{ house.location.houseNumber }} {{
        house.location.houseNumberAddition }}</h5>
      <p class="item-price">€ {{ house.price }}</p>
      <p class="item-location">{{ house.location.zip }} {{ house.location.city }}</p>
      <div class="item-info-bbg">
        <div class="item-info-bbg-bed">
          <img class="img-small" src="../assets/images/ic_bed@3x.png" />
          <p>{{ house.rooms.bedrooms }}</p>
        </div>
        <div class="item-info-bbg-bath">
          <img class="img-small" src="../assets/images/ic_bath@3x.png" />
          <p>{{ house.rooms.bathrooms }}</p>
        </div>
        <div class="item-info-bbg-size">
          <img class="img-small" src="../assets/images/ic_size@3x.png" />
          <p>{{ house.size }} m2</p>
        </div>
      </div>
    </div>
    <FavoriteButton v-show="!house.madeByMe && !isRecommendation" :itemId="house.id"/>
<!--Edits-->
    <div class="edits" v-show="house.madeByMe">
      <button class="icon-button" @click.prevent.stop="goToEdit">
        <img src="../assets/images/ic_edit@3x.png">
      </button>
      <DeleteModal :itemId="house.id" />
    </div>
  </div>
</template>

<script>

import DeleteModal from "./DeleteModal.vue";
import FavoriteButton from "./FavoriteButton.vue";

export default {
  name: "HouseList",
  props: ["house", "isRecommendation"],
  components: {
    DeleteModal,
    FavoriteButton
},
  methods: {
    goToDetail(event) {
      //if statement conditions that when delete modal is shown and click empty space will not trigger to router to detail page
      if (!event.target.className.startsWith("delete")) {
        this.$router.push(`/house-details/${this.house.id}`)
      }
    },
    goToEdit() {
      this.$router.push(`/edit-my-house/${this.house.id}`)
    }
  }
}
</script>

<style>
/*Items container*/
.items-container {
  margin: 20px 0px;
  padding-bottom: 20px;
}

.item {
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