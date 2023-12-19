<template>
    <div class="hd">
        
        <router-link to="/">
            <div class="hd-heading">
                <img src="../../public/images/ic_back_grey@3x.png">
                <p>Back to overview</p>
            </div>
        </router-link>
        
        <div v-if="house" class="hd-contents">
            <img class="hd-house-img" :src="house.image">
            <div class="hd-contents-details">
                <div class="hd-contents-details-heading">
                    <p class="hd-street">{{ house.location.street }} {{ house.location.houseNumber }}</p>
                    <div class="hd-contents-details-edits" v-show="house.madeByMe">
                        <router-link :to="`/edit-my-house/${house.id}`">
                            <button class="icon-button">
                                <img src="../../public/images/ic_edit@3x.png">
                            </button>
                        </router-link>
                        <button class="icon-button" @click="showModal = true">
                            <img src="../../public/images/ic_delete@3x.png">
                        </button>
                        <DeleteModal  :isVisible="showModal" @confirm="(e) => handleDelete(item.id, e)" @cancel="showModal = false" />

                    </div>
                </div>
                <div class="hd-contents-details-info">
                    <div class="info-pc">
                        <img class="img-small" src="../../public/images/ic_location@3x.png">
                        <p>{{ house.location.zip }} {{ house.location.city }}</p>
                    </div>
                    <div class="info-psy">
                        <img class="img-small" src="../../public/images/ic_price@3x.png">
                        <p>{{ house.price }}</p>
                        <img class="img-small" src="../../public/images/ic_size@3x.png">
                        <p>{{ house.size }} m2</p>
                        <img class="img-small" src="../../public/images/ic_construction_date@3x.png">
                        <p>Build in {{ house.constructionYear }}</p>
                    </div>
                    <div class="info-bbg">
                        <img class="img-small" src="../../public/images/ic_bed@3x.png">
                        <p>{{ house.rooms.bedrooms }}</p>
                        <img class="img-small" src="../../public/images/ic_bath@3x.png">
                        <p>{{ house.rooms.bathrooms }}</p>
                        <img class="img-small" src="../../public/images/ic_garage@3x.png">
                        <p v-if="house.hasGarage">Yes</p>
                        <p v-else>No</p>
                    </div>
                </div>
                <p class="hd-description">{{ house.description }}</p>
            </div>

        </div>
    </div>

</template>

<script>
import DeleteModal from "../components/DeleteModal.vue";

export default {
    name: "HouseDetail", 
    components: {
        DeleteModal
    }, 
    data(){
        return {
            showModal: false,
        }
    },
    computed: {
        houseId(){
            return parseInt(this.$route.params.id)
        }, 
        house(){
            const houses= this.$store.state.houses
            const ahouse =  houses.find(house => house.id === this.houseId)
            return ahouse ? ahouse : null
        }
    }, 
    created() {
        this.$store.dispatch('fetchHouses');
    },
    methods: {
        handleDelete(itemId){
            this.showModal = false
            this.$store.dispatch("deleteHouse", itemId)
        },
    },
}
</script>

<style lang="css">



</style>