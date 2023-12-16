<template>
    <div class="create">
       <div class="hd-heading" @click="goBack">
            <img src="../../public/images/ic_back_grey@3x.png">
            <p>Back to overview</p>
        </div>

        <h3>Create new listing</h3>
        <form @submit.prevent="handlePost">
            <div class="street">
                <label for="street name">Street name</label>
                <input id="street name" type="text" size="15" v-model="houseData.location.street"  required />
            </div>
            <div class="houseNum"></div>
                <div>
                    <label for="house number">House number</label>
                    <input id="house number" type="text" size="10" v-model="houseData.location.houseNumber"  required />
                </div>
                <div>
                    <label for="house addition">Addition (optional)</label>
                    <input id="house addition" type="text" size="10" v-model="houseData.location.houseNumberAddition" />
                </div>
            <div class="zip">
                <label for="zip">Postal code</label>
                <input id="zip" type="text" size="15" v-model="houseData.location.zip"  required/>
            </div>
            <div class="city">
                <label for="city">City</label>
                <input id="city" type="text" size="15" v-model="houseData.location.city"  required />
            </div>
            <!--Check how to input an image as an url-->
            <div class="upload-img">
                <label for="image">Upload picture (PNG or JPG)</label>
                <input id="image" type="file" @change="updateImage" />
            </div>
            <div class="price">
                <label for="price">Price</label>
                <input id="price" type="number" v-model="houseData.price"  required />
            </div>
            <div class="size-garage">
                <div class="size">
                    <label for="size">Size</label>
                    <input id="size" type="number" v-model="houseData.size"  required/>
                </div>
                <div class="garage">
                    <label for="garage">Garage</label>
                    <select id="garage" v-model="houseData.hasGarage"  required>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
            <div class="bed-bath">
                <div class="bedroom">
                    <label for="bedroom">Bedrooms</label>
                    <input id="bedroom" type="number" v-model="houseData.rooms.bedrooms"  required />
                </div>
                <div class="bathroom">
                    <label for="bathroom">Bathrooms</label>
                    <input id="bathroom" type="number" v-model="houseData.rooms.bathrooms"  required/>
                </div>
            </div>
            <div class="construction-year">
                <label for="constructionyear">Construction year</label>
                <input id="constructionyear" type="number" v-model="houseData.constructionYear"  required/>
            </div>
            <div class="description">
                <label for="description">Description</label>
                <input id="description"  type="text" v-model="houseData.description"  required/>
            </div>
            <div class="submit">
                <button type="submit">Post</button>
            </div>
    
        </form>
    </div>
</template>

<script>

export default {
    computed: {
        newId(){
            return this.$store.getters.getNewId
        }, 
        houseData() {
            return {
                id: this.newId,
                image: "",
                price:"",
                rooms:{
                    bedrooms:"",
                    bathrooms:""
                },
                size:"",
                description:"",
                location:{
                    street:"",
                    houseNumber:"",
                    houseNumberAddition:"",
                    city:"",
                    zip:""
                },
                createdAt: new Date().toISOString().split('T')[0],
                constructionYear:"",
                hasGarage:false,
                madeByMe:true,
            }
        }
    },
   
    methods: {
        updateImage(e){
            this.houseData.image = e.target.value
        },
        goBack(e){
            this.$router.back()
        },
        handlePost(e){
            //Validation
            const id = this.houseData.id //prevent rerender interrupting router
            this.$store.commit("createNewListing", this.houseData)
            console.log(id, this.houseData.id)
            this.$router.push(`/house-details/${id}`)
        }
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