<template>
  <div v-if="house" class="form">
    <div class="form-box">
      <GoBack :route="`/house-details/${house.id}`" showString="Back to detail page" />
      <h2>Edit listing</h2>
      <HouseForm :initialHouseData="houseData" :handleAfterSubmit="handlePost" buttonLabel="Save" />
    </div>
  </div>
</template>

<script>
import GoBack from "@/components/GoBack.vue";
import HouseForm from "@/components/HouseForm.vue";
import { HTTP } from "@/HTTP";

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
      const houses = this.$store.state.housesModule.houses
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
    this.$store.dispatch('housesModule/fetchHouses');
  },

  methods: {
    async handlePost(values, imageFile) {
      const id = this.houseData.id;
      try {
        await HTTP.postForm(`houses/${id}`, values);
        //If image was not changed, it will be a url/string. Else it will be a File object and we need to upload that object
        if (imageFile instanceof File) {
          await HTTP.postForm(`houses/${id}/upload`, { image: imageFile })
        };
        /*To inform the store to update the changes of data at api, if the view does not set houses every time after the component is created. 
        this.$store.dispatch('housesModule/fetchHouses');*/
        this.$router.replace(`/house-details/${id}`);
      } catch (error) {
        console.log('error', error)
      }
    },
  }
}
</script>