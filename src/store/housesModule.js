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

    deleteListing(state, id) {
      state.houses = state.houses.filter((other_house) => other_house.id !== id)
    },

    sortByPrice(state) {
      state.houses.sort((a, b) => a.price - b.price)
    },

    sortBySize(state) {
      state.houses.sort((a, b) => a.size - b.size)
    },
  },
}