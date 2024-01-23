import { createStore } from "vuex";
import { HTTP } from "@/HTTP";

export const useHouseStore = createStore({

  state: () => {
    return {
      houses: [],
      //favorites will be stored at local storage
      favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    }
  },

  mutations: {
    setHouses(state, houses) {
      state.houses = houses
    },

    deleteListing(state, id) {
      state.houses = state.houses.filter((other_house) => other_house.id !== id)
    },

    sortByPrice(state) {
      state.houses.sort((a, b) => a.price - b.price)
    },

    sortBySize(state) {
      state.houses.sort((a, b) => a.size - b.size)
    },

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

  actions: {
    fetchHouses({ commit, state }) {
      HTTP.get("houses").then(response => {
        commit('setHouses', response.data)
      }).catch((error) => {
        console.log('error', error)
      })
    }
    /*remove the actions of create, edit and delete:
      1. when the component handle event to make changes in api, and then the components will be re-rendered, at the created life cycle, the new data is fetched. so no need to have them in the store. 
    */
  }, 
})
