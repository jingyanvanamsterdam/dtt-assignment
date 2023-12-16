import { createStore } from "vuex"; 
import houses from "../houses.json"

export const useHouseStore = createStore({

    state: () => {
        //here is the database
        return{
            houses: houses
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
            state.houses.sort((a, b) => a.size -b.size)
        },
    },
})