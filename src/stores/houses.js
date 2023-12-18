import { createStore } from "vuex"; 
import houses from "../houses.json"; 
import { HTTP } from "@/assets/HTTP";
import router from "../router";

export const useHouseStore = createStore({

    state: () => {
        return{
            houses: []
        }
    },
    getters: {
    },
    mutations: {
        setHouses(state, houses){
            state.houses = houses
        },
        deleteListing(state, id){
            state.houses = state.houses.filter((other_house) => other_house.id !== id)
        },
        createNewListing(state, house){
            console.log(house)
            state.houses.push(house)
            router.push(`/house-details/${house.id}`)
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
            }); 
            router.replace(`/house-details/${house.id}`)  
        }
    },
    actions: {

        fetchHouses({commit, state}){
            if(state.houses.length === 0){
                HTTP.get("houses").then(response => {
                    console.log(response.data); 
                    commit('setHouses', response.data)
                }).catch((error) =>{
                    console.log('error', error)
                })
            }
        },

        async createNewHouse({commit}, {houseData, imageFile}){
            const response = await HTTP.postForm("houses", houseData)
            const houseId = response.data.id
            await HTTP.postForm(`houses/${houseId}/upload`, {image: imageFile})
            const listingWithImageUrl = (await HTTP.get(`houses/${houseId}`)).data[0]
            commit('createNewListing', listingWithImageUrl)   
        }, 

        async editHouse({commit}, {houseData, id, imageFile}){
            try {
                await HTTP.postForm(`houses/${id}`, houseData)
                await HTTP.postForm(`houses/${id}/upload`, {image: imageFile})
                const response = await HTTP.get(`houses/${id}`)
                const updatedListing = response.data[0]
                commit("editListing", updatedListing)
            } catch (error){
                console.log('error', error)
            }
        }, 

        deleteHouse({commit}, id){
            HTTP.delete(`houses/${id}`).then(response => {
                commit('deleteListing', id)
            }).catch((error) =>{
                console.log('error', error)
            })
        }
    }
})
