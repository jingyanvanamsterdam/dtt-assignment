<template>
  <i class="fav" :class="['fa-star', isFav ? 'fas' : 'far']" @click.prevent.stop="toggleFav(itemId)"></i>
</template>

<script>
export default {
  name: "FavoriteButton",
  props: ["itemId"],
  methods: {
    toggleFav(id) {
      this.isFav ? this.$store.commit('favoriteModule/removeFavorites', id) : this.$store.commit('favoriteModule/setFavorites', id); 
    }
  },
  computed: {
    isFav() {
      return this.$store.state.favoriteModule.favorites.includes(this.itemId)
    }
  }, 
}
</script>

<style>
.fav {
  margin-left: auto;
  margin: 0.5em;
  cursor: pointer;
}

.fa-star.far {
  color: #C3C3C3;
  font-size: 1.5em;
  cursor: pointer;
}

.fa-star.fas {
  color: #EB5440;
  font-size: 1.5em;
  cursor: pointer;
}
</style>