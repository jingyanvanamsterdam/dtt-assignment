<template>
  <div class="hd">
    <GoBack route="/" showString="Back to overview" />
    <div class="hd-box">
      <div v-if="house" class="hd-contents">
        <img class="hd-house-img" :src="house.image">
        <div class="hd-contents-details">
          <div class="hd-contents-details-heading">
            <h2 class="hd-street">
              {{ house.location.street }}
              {{ house.location.houseNumber }}
              {{ house.location.houseNumberAddition }}
            </h2>
            <FavoriteButton v-show="!house.madeByMe" :itemId="house.id" />
            <div class="edits" v-show="house.madeByMe">
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
      <div class="recomd-box">
        <Recommendation :itemId="houseId" />
      </div>
    </div>
  </div>
</template>

<script>
import DeleteModal from "../components/DeleteModal.vue";
import FavoriteButton from "@/components/FavoriteButton.vue";
import GoBack from "@/components/GoBack.vue";
import Recommendation from "@/components/Recommendation.vue";

export default {
  name: "HouseDetail",
  components: {
    DeleteModal,
    FavoriteButton,
    GoBack,
    Recommendation
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
.hd {
  padding-bottom: 30px;
}

.hd-box {
  display: flex;
  justify-content: space-between;
}

.hd-contents {
  background-color: #FFFFFF;
  width: 60%;
}

.recomd-box {
  font-size: 14px;
  width: 35%;
}

.hd-contents-details {
  padding: 1.5em;
}

.hd-house-img {
  width: 100%;
}

.hd-contents-details-heading {
  display: flex;
  align-items: center;
  margin: 0px;
}

.hd-street {
  margin: 0px;
}

.hd-contents-details-heading .fav {
  margin: 0em 0em 0em auto;
}

.edits {
  display: flex;
  flex: 1;
  margin-left: auto;
  justify-content: flex-end;
}

.hd-description {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #4A4B4C;
  margin: 0.56em 0em;
}

.info-pc,
.info-psy,
.info-bbg {
  display: flex;
  align-items: center;
  margin: 0.56em 0em;
}

.hd-contents-details-info p {
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #4A4B4C;
  padding-right: 1em;
  margin: 0px;
}

/*Give a media response to ipad screen */
@media screen and (max-width: 768px) {
  .hd-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .hd-contents,
  .recomd-box {
    width: 100%;
  }

  .recomd-box {
    margin-top: 1em;
  }
}

@media screen and (max-width: 576px) {
  .hd-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .hd-contents,
  .recomd-box {
    width: 100%;
  }

  .recomd-box {
    margin-top: 1em;
  }

  .recomd-box,
  .hd-description, 
  .hd-contents-details-info p {
    font-size: 12px;
  }
}
</style>