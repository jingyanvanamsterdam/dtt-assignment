<template>
     <div class="form-container">
        <div class="form">
            <GoBack route="/" showString="Back to overview"/>
            <h3>Create new listing</h3>
            <HouseForm  :imageFile="previewFile" 
                        :handleSubmit="handlePost" 
                        :handleFileChange="handleFileChange" 
                        buttonLabel="Save"/>
        </div>
    </div>
</template>

<script>
import GoBack from "@/components/GoBack.vue";
import HouseForm from "@/components/HouseForm.vue";

export default {
    data(){
        return {
            selectedFile: null,
            //previewFile: null,
        }
    },
    components: {
        GoBack,
        HouseForm,
    },

    methods: {
        /*Unfinished: for removing former image and trigger file input field 
        handleRemoveFile(event){
            this.selectedFile = null;
            this.previewFile = null;
        },*/

        handleFileChange(event){
            //this.previewFile = URL.createObjectURL(event.target.files[0])
            this.selectedFile = event.target.files[0]
        },
        handlePost(values){
            this.$store.dispatch("createNewHouse", {houseData: values, imageFile: this.selectedFile})
        }
    }
}
</script>
