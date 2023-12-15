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
    }
})