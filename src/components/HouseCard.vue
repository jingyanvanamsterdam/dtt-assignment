<template>
  <div class="item-details" @click="goToDetail">
    <img class="item-img" :src="house.image" :alt="house.id" />
    <!--House info-->
    <div class="item-info">
      <p class="item-street">{{ house.location.street }} {{ house.location.houseNumber }} {{
        house.location.houseNumberAddition }}</p>
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
    <FavoriteButton v-show="!house.madeByMe && !isRecommendation" :itemId="house.id" />
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
/*listing information: font-size: 16px, except street line, font should be open sans */
/* Responsive with different containers: item-container and recommendation*/
.item {
  background-color: #FFFFFF;
  padding: 0.8em;
  margin: 0.8em 0em;
  border-radius: 0.5em;
}

.item-details {
  display: flex;
  align-items: flex-start;
}

.item-img {
  width: 5.5em;
  height: 5.5em;
  object-fit: cover;
  object-position: center;
  border-radius: 0.5em;
  margin-right: 0.5em;

}

.item-info {
  flex: 2;
  height: 5.5em;
  margin-left: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.item-info p {
  margin: 0px;
  font-family: 'Open Sans', sans-serif;
}

.item-location {
  font-size: 0.78em;
  color: #C3C3C3;
}

.item-street {
  font-size: 0.89em;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
}

.item-price {
  font-size: 0.78em;
  color: #4A4B4C;
}

.item-info-bbg {
  display: flex;
  font-size: 0.67em;
  color: #4A4B4C;
}

.img-small {
  width: 0.67em;
  height: 0.67em;
  margin-right: 0.67em;
}

.item-info-bbg-bed,
.item-info-bbg-bath,
.item-info-bbg-size {
  display: flex;
  align-items: center;
  margin-right: 0.5em;
}

/*Delete&edit icon Style*/
.icon-button {
  border: none;
  background: none;
  margin: 0.5em;
  cursor: pointer;
}

.icon-button img {
  width: 1.5em;
  height: auto;
}

@media screen and (max-width: 576px) {
  .item-info p,
  .item-info-bbg {
    font-size: 1em;
  }

.icon-button img {
  width: 1.2em;
  height: auto;
}
.icon-button {
  padding: 0em; 
}
}
</style>