import { createStore } from "vuex"; 
import { HTTP } from "@/HTTP";
import router from "./router";

export const useHouseStore = createStore({

    state: () => {
        return{
            houses: []
        }
    },

    mutations: {
        setHouses(state, houses){
            state.houses = houses
        },

        deleteListing(state, id){
            state.houses = state.houses.filter((other_house) => other_house.id !== id)
            router.replace('/')
        },

        createNewListing(state, house){
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
                    commit('setHouses', response.data)
                }).catch((error) =>{
                    console.log('error', error)
                })
            }
        },

        async createNewHouse({commit}, {houseData, imageFile}){
            try{
                const response = await HTTP.postForm("houses", houseData)
                const houseId = response.data.id
                await HTTP.postForm(`houses/${houseId}/upload`, {image: imageFile})
                const listingWithImageUrl = (await HTTP.get(`houses/${houseId}`)).data[0]
                commit('createNewListing', listingWithImageUrl)
            } catch (error){
                console.log('error', error)
            }
               
        }, 

        async editHouse({commit}, {houseData, id, imageFile}){

            try {
                await HTTP.postForm(`houses/${id}`, houseData)
                
                //If image was not changed, it will be a url/string. Else it will be a File object and we need to upload that object
                if (imageFile instanceof File){
                    await HTTP.postForm(`houses/${id}/upload`, {image: imageFile})
                }
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
