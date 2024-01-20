<template>
  <i class="fav" :class="['fa-star', isFav ? 'fas' : 'far']" @click.prevent.stop="toggleFav"></i>
</template>

<script>
export default {
  name: "FavoriteButton",
  props: ["itemId"],
  methods: {
    toggleFav() {
      this.isFav ? this.$store.commit('removeFavorites', this.itemId) : this.$store.commit('setFavorites', this.itemId)
      console.log(this.$store.state.favorites, this.$store.state.houses)
    }
  },
  computed: {
    isFav() {
      return this.$store.state.favorites.includes(this.itemId)
    }
  }
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