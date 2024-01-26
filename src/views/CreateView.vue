<template>
  <div class="form">
    <div class="form-box">
      <GoBack route="/" showString="Back to overview" />
      <h2>Create new listing</h2>
      <HouseForm :handleAfterSubmit="handlePost" buttonLabel="Post" />
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

  methods: {
    async handlePost(values, imageFile) {
      const response = await HTTP.postForm("houses", values); 
      //if I don't dispatch fetchHouses and set the state of houses every created of a view, then I need to dispatch fetchHouses every time there is a change of data from API 
      //this.$store.dispatch('housesModule/fetchHouses');
      const houseId = response.data.id; 
      await HTTP.postForm(`houses/${houseId}/upload`, { image: imageFile }); 
      this.$router.push(`/house-details/${houseId}`); 
    }
  }
}
</script>
