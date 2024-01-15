<template>
  <div class="form-container">
    <div v-if="house" class="form">
      <GoBack :route="`/house-details/${house.id}`" showString="Back to detail page" />
      <h3>Edit listing</h3>
      <HouseForm :initialHouseData="houseData" :handleAfterSubmit="handlePost" buttonLabel="Post" />
    </div>
  </div>
</template>

<script>
import GoBack from "@/components/GoBack.vue";
import HouseForm from "@/components/HouseForm.vue";

export default {
  components: {
    GoBack,
    HouseForm,
  },
  data() {
    return {
      selectedFile: null
    }
  },
  computed: {
    houseId() {
      return parseInt(this.$route.params.id)
    },
    house() {
      const houses = this.$store.state.houses
      const theHouse = houses.find(house => house.id === this.houseId)
      return theHouse ? theHouse : null
    },
    houseData() {
      return {
        id: this.house.id,
        image: this.house.image,
        price: this.house.price,
        rooms: {
          bedrooms: this.house.rooms.bedrooms,
          bathrooms: this.house.rooms.bathrooms
        },
        size: this.house.size,
        description: this.house.description,
        location: {
          street: this.house.location.street,
          houseNumber: this.house.location.houseNumber,
          houseNumberAddition: this.house.location.houseNumberAddition,
          city: this.house.location.city,
          zip: this.house.location.zip
        },
        createdAt: this.house.createdAt,
        constructionYear: this.house.constructionYear,
        hasGarage: this.house.hasGarage,
        madeByMe: this.house.madeByMe,
      }
    },
  },

  created() {
    this.$store.dispatch('fetchHouses');
  },

  methods: {
    handlePost(values, imageFile) {
      this.$store.dispatch("editHouse", { houseData: values, id: this.houseData.id, imageFile: imageFile })
    },
  }
}
</script>