<template>
    <div class="create">
        <router-link to="/">
            <div class="hd-heading">
                <img src="../../public/images/ic_back_grey@3x.png">
                <p>Back to overview</p>
            </div>
        </router-link>

        <h3>Create new listing</h3>
        <form @submit="handlePost">
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
            <!--Check how to input an image as an url-->
            <div class="upload-img">
                <label>Upload picture (PNG or JPG)</label>
                <input type="file"  required/>
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
            <div class="construction-date">
                <label>Construction date</label>
                <input type="date" v-model="houseData.constructionYear"  required/>
            </div>
            <div class="description">
                <label>Description</label>
                <input type="text" v-model="houseData.description"  required/>
            </div>
            <input />
            <div class="submit">
                <input type="submit" value="Post" />
            </div>
        </form>
    </div>
</template>

<script>

export default {
    data() {
        return {
            houseData: {
                id: "generate a number to replace",
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
                createdAt:"generate a date function to replace",
                constructionYear:"",
                hasGarage:false,
                madeByMe:true,
            }
        }
        
    },
   
    methods: {
        handlePost(e){
            console.log(this.houseData)
            //Validation
            this.$store.commit("createNewListing", this.houseData)
            //v-model needs to take a value from here to understand how it is connected with the store, instead of what I have now locally.
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