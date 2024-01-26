import { HTTP } from "@/HTTP";

export const housesModule = {
  namespaced: true, 
  state: () => {
    return {
      houses: [],
    }
  },
  actions: {
    fetchHouses({ commit, state }) {
      HTTP.get("houses").then(response => {
        commit('setHouses', response.data)
      }).catch((error) => {
        console.log('error', error)
      })
    }
  },
  mutations: {
    setHouses(state, houses) {
      state.houses = houses
    },

    sortByPrice(state) {
      state.houses.sort((a, b) => a.price - b.price)
    },

    sortBySize(state) {
      state.houses.sort((a, b) => a.size - b.size)
    },

     /*When an item is deleted, after communication with api, the component dispatch setHouses, so the state changes and HomeView will be re-rendered. So no need to have this mutation. 
    deleteListing(state, id) {
      state.houses = state.houses.filter((other_house) => other_house.id !== id)
    },*/
  },
}