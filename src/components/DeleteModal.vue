<template>
    <div class="delete" v-if="isVisible">
    <div class="delete-content">
        <h5>Delete listing</h5>
        <p>Are you sure you want to delete this listing?</p>
        <p>This action cannot be undone.</p>
        <button @click="confirm">YES, DELETE</button>
      <button @click="cancel">GO BACK</button>
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

<style>

.delete {
    position: fixed; 
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgba(0, 0, 0, 0.2); 
    display: flex;
    justify-content: center;
    align-items: center;
}

.delete-content {
    background-color: #d87272;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px; 
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    z-index: 1001;
}

</style>