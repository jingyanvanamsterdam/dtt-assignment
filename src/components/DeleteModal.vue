<template>
    <div class="delete" v-if="isVisible">
    <div class="delete-content">
        <h5>Delete listing</h5>
        <p>Are you sure you want to delete this listing?</p><p>This action cannot be undone. </p><br>
        
        <button class="button-yes" @click="confirm">YES, DELETE</button>
        <button class="button-goback" @click="cancel">GO BACK</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DeleteModal",
        props: [ "isVisible"], 
        methods: {
            confirm(){
                this.$emit("confirm")
            }, 
            cancel(){
                this.$emit("cancel")
            },
        }
    }
</script>
