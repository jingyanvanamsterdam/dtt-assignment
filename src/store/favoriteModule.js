export const favoriteModule = {
  namespace: true,
  state: () => {
    return {
      favorites: JSON.parse(localStorage.getItem('favorites')) || []
    }
  },
  mutations: {
    setFavorites(state, id) {
      state.favorites.push(id);
      //set the new value to localStorage
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },

    removeFavorites(state, id) {
      state.favorites = state.favorites.filter((other_id) => other_id !== id);
      //set the new value to localStorage
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
  },
}