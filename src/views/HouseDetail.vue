<template>
    <div class="hd">
        
        <router-link to="/">
            <div class="hd-heading">
                <img src="../../public/images/ic_back_grey@3x.png">
                <p>Back to overview</p>
            </div>
        </router-link>
        
        <div class="hd-contents">
            <div class="hd-contents-details">
                <img :src="house.image">
                <div class="hd-contents-details-heading">
                    <p>{{ house.location.street }} {{ house.location.houseNumber }}</p>
                    <div class="hd-contents-details-edits">
                        <button>edit</button>
                        <button>delete</button>
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
                        <p>{{ house.size }}</p>
                        <img class="img-small" src="../../public/images/ic_construction_date@3x.png">
                        <p>{{ house.constructionYear }}</p>
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
                <p>{{ house.description }}</p>
            </div>

            <div class="hd-contents-recommendation">
                <h6>Recommendation</h6>
                <!-- ADD this later
                <div class="recommendation-items">
                    <div class="recommendation-item">
                        <img>
                        <div class="item-info">
                            <h5>street name</h5>
                            <p>price</p>
                            <p>location</p>
                            <div class="item-info-bbg">
                                <img class="img-small" src="../../public/images/ic_bed@3x.png"/>
                                <p>item.rooms.bedrooms</p>
                                <img class="img-small" src="../../public/images/ic_bath@3x.png" />
                                <p>item.rooms.bathrooms</p>
                                <img class="img-small" src="../../public/images/ic_size@3x.png" />
                                <p>item.size m2</p>
                            </div>
                        </div>
                    </div>
                </div>
                -->
            </div>
        </div>
    </div>

</template>

<script>

export default {
    name: "HouseDetail", 
    components: {

    }, 
    computed: {
        houseId(){
            return parseInt(this.$route.params.id)
        }, 
        house(){
            const houses= this.$store.state.houses
            return houses.find(house => house.id === this.houseId)
        }
    }
}
</script>

<style lang="css">

.hd-heading {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

img.hd-heading {
    width: 2%; 
    height: auto;
    margin-right: 5px;
}

.hd-heading p {
    font-size: 16px;
    font-family: 'Montserrat';
    font-weight: 600;
}

.hd-contents {
    display: flex; 
    align-items: flex-start;
}

.hd-contents-heading {
    display: flex;
    align-items: center;
}

.hd-contents-details-edits {
    display: flex;
    flex: 1;
    margin-left: auto;
    justify-content: end;
}

img.hd-contents-details {
    width: 100%; 
    height: auto;
}

</style>