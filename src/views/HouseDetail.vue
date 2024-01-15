<template>
  <div class="hd">
    <GoBack route="/" showString="Back to overview" />
    <div v-if="house" class="hd-contents">
      <img class="hd-house-img" :src="house.image">
      <div class="hd-contents-details">
        <div class="hd-contents-details-heading">
          <p class="hd-street">{{ house.location.street }} {{ house.location.houseNumber }}</p>
          <div class="hd-contents-details-edits" v-show="house.madeByMe">
            <router-link :to="`/edit-my-house/${house.id}`">
              <button class="icon-button">
                <img src="../assets/images/ic_edit@3x.png">
              </button>
            </router-link>
            <DeleteModal :itemId="house.id" />
          </div>
        </div>
        <div class="hd-contents-details-info">
          <div class="info-pc">
            <img class="img-small" src="../assets/images/ic_location@3x.png">
            <p>{{ house.location.zip }} {{ house.location.city }}</p>
          </div>
          <div class="info-psy">
            <img class="img-small" src="../assets/images/ic_price@3x.png">
            <p>{{ house.price }}</p>
            <img class="img-small" src="../assets/images/ic_size@3x.png">
            <p>{{ house.size }} m2</p>
            <img class="img-small" src="../assets/images/ic_construction_date@3x.png">
            <p>Build in {{ house.constructionYear }}</p>
          </div>
          <div class="info-bbg">
            <img class="img-small" src="../assets/images/ic_bed@3x.png">
            <p>{{ house.rooms.bedrooms }}</p>
            <img class="img-small" src="../assets/images/ic_bath@3x.png">
            <p>{{ house.rooms.bathrooms }}</p>
            <img class="img-small" src="../assets/images/ic_garage@3x.png">
            <p v-if="house.hasGarage">Yes</p>
            <p v-else>No</p>
          </div>
        </div>
        <p class="hd-description">{{ house.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteModal from "../components/DeleteModal.vue";
import GoBack from "@/components/GoBack.vue";

export default {
  name: "HouseDetail",
  components: {
    DeleteModal,
    GoBack
  },
  computed: {
    houseId() {
      return parseInt(this.$route.params.id)
    },
    house() {
      const houses = this.$store.state.houses
      const ahouse = houses.find(house => house.id === this.houseId)
      return ahouse ? ahouse : null
    }
  },
  created() {
    this.$store.dispatch('fetchHouses');
  },
}
</script>

<style>
.hd,
.about {
  margin: 0px 15%;
  padding-bottom: 30px;
}

.hd-heading {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 30px;
}

.hd-heading img {
  width: 16px;
  height: auto;
  margin-right: 5px;
}

.hd-heading p {
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}

.hd-house-img {
  width: 100%;
}

.hd-contents {
  background-color: #FFFFFF;
}

.hd-contents-details {
  padding: 30px;
}

.hd-contents-heading {
  display: flex;
  align-items: center;
}

.hd-contents-details-heading {
  display: flex;
  align-items: center;
  margin: 20px 0px;
}

.hd-street {
  font-family: 'Montserrat', sans-serif;
  color: #000000;
  font-weight: bold;
  font-size: 22px;
  margin: 0px;
}

.hd-contents-details-edits {
  display: flex;
  flex: 1;
  margin-left: auto;
  justify-content: end;
}

.hd-description {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #4A4B4C;
}

.info-pc,
.info-psy,
.info-bbg {
  display: flex;
  align-items: center;
  margin: 10px 0px;
}

.hd-contents-details-info p {
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #4A4B4C;
  padding-right: 30px;
  margin: 0px;
}
</style>