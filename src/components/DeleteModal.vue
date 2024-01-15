<template>
    <button class="icon-button" @click="toggleVisibility">
        <img src="../assets/images/ic_delete@3x.png">
    </button>
    <div class="delete" v-if="isVisible">
    <div class="delete-content">
        <h5>Delete listing</h5>
        <p>Are you sure you want to delete this listing?</p><p>This action cannot be undone. </p>
        <br>
        <button class="button-yes" @click="handleDelete">YES, DELETE</button>
        <button class="button-goback" @click="cancel">GO BACK</button>
        <!--move methods from HomePage and House Detail to DeleteModal because in HomePage, showModal's value is linked to every item which is deletable and it always delete the last item on the screen-->
    </div>
  </div>
</template>

<script>
    export default {
        name: "DeleteModal",
        props: [ "itemId" ],
        data(){
            return {
                isVisible: false
            }
        } ,
        methods: {
            toggleVisibility(){
                this.isVisible = true
            },
            cancel(){
                this.isVisible = false
            },
            handleDelete(event){
                this.$store.dispatch("deleteHouse", this.itemId);
                this.isVisible = false
            },
        }
    }
</script>
