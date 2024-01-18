<template>
    <img title="favorite" class="fav" src="../assets/images/img_star@3x.png" :class="{ 'is-fav': isFav}" @click.prevent.stop="toggleFav"/>
<!--if is-fav, the icon style will has color, hover over also show text what is it-->
</template>

<script>
export default {
  name: "FavoriteButton",
  props: ["itemId"], 
  methods: {
    toggleFav(){
      this.isFav ? this.$store.commit('removeFavorites', this.itemId) : this.$store.commit('setFavorites', this.itemId)
      console.log(this.$store.state.favorites, this.$store.state.houses)
    }
  }, 
  computed:{
    isFav(){
      return this.$store.state.favorites.includes(this.itemId) 
    }
  }
}
</script>

<style>
.fav {
  width: 16px;
  height: auto; 
  border: 2px dashed #C3C3C3;
  margin-left: auto;
}
.fav:hover {
  border: 2px solid #EB5440; 
}
.is-fav {
  background-color: #EB5440;
  border: 2px dashed #EB5440;
}
</style>