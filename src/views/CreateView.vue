<template>
  <div class="form-container">
    <div class="form">
      <GoBack route="/" showString="Back to overview" />
      <h3>Create new listing</h3>
      <HouseForm :handleAfterSubmit="handlePost" buttonLabel="Save" />
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
        const response = await HTTP.postForm("houses", values)
        const houseId = response.data.id
        await HTTP.postForm(`houses/${houseId}/upload`, { image: imageFile })
        this.$router.push(`/house-details/${houseId}`) 
    }
  }
}
</script>
