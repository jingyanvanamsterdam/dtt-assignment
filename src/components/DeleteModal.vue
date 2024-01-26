<template>
  <!--??Even stop propagation, click empty space will still trigger to router to detail page -->
  <button class="icon-button" @click.prevent.stop="toggleVisibility">
    <img src="../assets/images/ic_delete@3x.png">
  </button>
  <div class="delete" v-if="isVisible">
    <div class="delete-content">
      <h5>Delete listing</h5>
      <p>Are you sure you want to delete this listing?</p>
      <p>This action cannot be undone. </p>
      <br>
      <button class="button-yes" @click.prevent.stop="handleDelete(itemId)">YES, DELETE</button>
      <button class="button-goback" @click.prevent.stop="cancel">GO BACK</button>
      <!--move methods from HomePage and House Detail to DeleteModal because in HomePage, showModal's value is linked to every item which is deletable and it always delete the last item on the screen-->
    </div>
  </div>
</template>

<script>
import { HTTP } from '@/HTTP'
export default {
  name: "DeleteModal",
  props: ["itemId"],
  data() {
    return { isVisible: false }
  },
  methods: {
    toggleVisibility() {
      this.isVisible = true
    },
    cancel() {
      this.isVisible = false
    },
    handleDelete(id) {
      HTTP.delete(`houses/${id}`).then(() => {
        /*To make the store change the state and then render, because the router is going to the home view and it needed to be informed the state is changed. 
        this.$store.commit("houseModule/deleteListing", id);
        But here dispatch the fetchHouses, so the state will be changed and Home View will be rerendered*/
        this.$store.dispatch('housesModule/fetchHouses');
        this.$router.replace('/');
      }).catch((error) => {
        console.log('error', error)
      })
      this.isVisible = false
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
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFFFFF;
  margin: auto;
  padding: 20px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  z-index: 1001;
  border-radius: 10px;
}

.delete-content h5 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 18px;
  margin: 20px;
}

.delete-content p {
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 14px;
  margin: 1px;
}

.delete-content button {
  width: 250px;
  height: 30px;
  margin: 10px;
  border: none;
  border-radius: 8px;
  color: #FFFFFF;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;

}

.button-yes {
  background-color: #EB5440;
}

.button-goback {
  background-color: #4A4B4C;
}

@media screen and (max-width: 576px) {
  .delete-content button {
    width: 50%;
  }

}
</style>
