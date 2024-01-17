<template>
  <div class="items-container">
    <div class="item" v-for="item in houses" :key="item.id">
      <div class="item-details" @click.prevent="(event) => goToDetail(event, item.id)">
        <img class="item-img" :src="item.image" :alt="item.id" />
        <div class="item-info">
          <h5 class="item-street">{{ item.location.street }} {{ item.location.houseNumber }} {{
            item.location.houseNumberAddition }}</h5>
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
        <div class="item-edits" v-show="item.madeByMe">
          <button class="icon-button" @click.prevent.stop="goToEdit(item.id)">
            <img src="../assets/images/ic_edit@3x.png">
          </button>
          <DeleteModal :itemId="item.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DeleteModal from "./DeleteModal.vue";

export default {
  name: "HouseList",

  props: ["houses"],

  computed: {
    houses() {
      return this.houses
    }
  },

  components: {
    DeleteModal,
  },
  methods: {
    goToDetail(event, id) {
      //if statement conditions that when delete modal is shown and click empty space will not trigger to router to detail page
      if (!event.target.className.startsWith("delete")) {
        this.$router.push(`/house-details/${id}`)
      }
    },
    goToEdit(id) {
      this.$router.push(`/edit-my-house/${id}`)
    }
  }
}

</script>

<style>
/*Items container*/
.items-container {
  margin: 20px 15%;
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