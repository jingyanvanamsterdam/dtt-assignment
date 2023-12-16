import { createStore } from "vuex"; 
import houses from "../houses.json"

export const useHouseStore = createStore({

    state: () => {
        return{
            houses: houses
        }
    },
    getters: {
        getNewId ({houses}){
            const houseIds = houses.map((house) => house.id)
            return Math.max(...houseIds) +1
        }
    },
    mutations: {
        createNewListing(state, house){
            state.houses.push(house)
        }, 
        sortByPrice(state){
            state.houses.sort((a, b) => a.price - b.price)
        },
        sortBySize(state){
            state.houses.sort((a, b) => a.size - b.size)
        },
        editListing(state, house){
            state.houses = state.houses.map((other_house) => {
                if (house.id === other_house.id){
                    return house
                }
                return other_house
            })
            
        }
    },
})