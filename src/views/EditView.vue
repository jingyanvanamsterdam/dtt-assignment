<template>
    <div class="create">
        <router-link :to="`/house-details/${house.id}`">
            <div class="hd-heading">
                <img src="../../public/images/ic_back_grey@3x.png">
                <p>Back to details</p>
            </div>
        </router-link>

        <h3>Edit listing</h3>
        <form @submit.prevent="handlePost">
            <div class="street">
                <label for="street name">Street name</label>
                <input type="text" size="15" v-model="houseData.location.street"  required />
            </div>
            <div class="houseNum"></div>
                <div>
                    <label>House number</label>
                    <input type="text" size="10" v-model="houseData.location.houseNumber"  required />
                </div>
                <div>
                    <label>Addition (optional)</label>
                    <input type="text" size="10" v-model="houseData.location.houseNumberAddition" />
                </div>
            <div class="zip">
                <label>Postal code</label>
                <input type="text" size="15" v-model="houseData.location.zip"  required/>
            </div>
            <div class="city">
                <label>City</label>
                <input type="text" size="15" v-model="houseData.location.city"  required />
            </div>
          
            <div class="upload-img">
                <label>Upload picture (PNG or JPG)</label>
                <input type="file" />
            </div>
            <div class="price">
                <label>Price</label>
                <input type="number" v-model="houseData.price"  required />
            </div>
            <div class="size-garage">
                <div class="size">
                    <label>Size</label>
                    <input type="number" v-model="houseData.size"  required/>
                </div>
                <div class="garage">
                    <label>Garage</label>
                    <select v-model="houseData.hasGarage"  required>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
            <div class="bed-bath">
                <div class="bedroom">
                    <label>Bedrooms</label>
                    <input type="number" v-model="houseData.rooms.bedrooms"  required />
                </div>
                <div class="bathroom">
                    <label>Bathrooms</label>
                    <input type="number" v-model="houseData.rooms.bathrooms"  required/>
                </div>
            </div>
            <div class="construction-year">
                <label>Construction year</label>
                <input type="number" v-model="houseData.constructionYear"  required/>
            </div>
            <div class="description">
                <label>Description</label>
                <input type="text" v-model="houseData.description"  required/>
            </div>
            <div class="submit">
                <input type="submit" value="Post" />
            </div>
        </form>
    </div>
</template>

<script>

export default {
    computed: {
        houseId(){
            return parseInt(this.$route.params.id)
        }, 
        house(){
            const houses= this.$store.state.houses
            return houses.find(house => house.id === this.houseId)
        },
        
        houseData() {
            return {
                id: this.house.id,
                image: this.house.image,
                price: this.house.price,
                rooms:{
                    bedrooms:this.house.rooms.bedrooms,
                    bathrooms:this.house.rooms.bathrooms
                },
                size:this.house.size,
                description:this.house.description,
                location:{
                    street:this.house.location.street,
                    houseNumber:this.house.location.houseNumber,
                    houseNumberAddition:this.house.location.houseNumberAddition,
                    city:this.house.location.city,
                    zip:this.house.location.zip
                },
                createdAt:this.house.createdAt,
                constructionYear:this.house.constructionYear,
                hasGarage:this.house.hasGarage,
                madeByMe:this.house.madeByMe,
            }
        }
    },
   
    methods: {
        handlePost(e){
            //Validation
            console.log(this.houseData)
            this.$store.commit("editListing", this.houseData)
            this.$router.replace(`/house-details/${this.house.id}`)
        },
    }
}
</script>

<style>
form {
    max-width: 420px;
    margin: 30px, auto; 
    text-align: left;
    padding: 40px; 
    border-radius: 10px;
}

label {
    display: inline-block;
    margin: 25px 0 15px; 
}
/*
input {
    display: block;
    padding: 10px 6px; 
    width: 100%; 
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid;

}*/
</style>