<template>
     <div class="form-container">
        <div class="form">
            <GoBack route="/" showString="Back to overview"/>
            <h3>Create new listing</h3>
            <HouseForm  
                        :handleAfterSubmit="handlePost" 
                        buttonLabel="Save"/>
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

    methods: {
        handlePost(values, imageFile){
            this.$store.dispatch("createNewHouse", {houseData: values, imageFile: imageFile})
        }
    }
}
</script>
