<template>
    <div class="create">
        <router-link :to="`/house-details/${house.id}`">
            <div class="hd-heading">
                <img src="../../public/images/ic_back_grey@3x.png">
                <p>Back to details</p>
            </div>
        </router-link>

        <h3>Edit listing</h3>
        <Form @submit="handlePost"  :validation-schema="schema" v-slot="{ errors }">
            <div class="street">
                <label for="street name">Street name</label>
                <Field name="street" type="text" v-model="houseData.location.street" :class="{'is-invalid': errors.street }"/>
                <ErrorMessage name="street"/>
            </div>
            <div class="houseNum"></div>
                <div>
                    <label>House number</label>
                    <Field name="houseNumber" type="number" size="10" v-model="houseData.location.houseNumber" :class="{'is-invalid': errors.houseNumber }"/>
                    <ErrorMessage name="houseNumber" />
                </div>
                <div>
                    <label>Addition (optional)</label>
                    <Field name="houseNumberAddition" type="text" size="10" v-model="houseData.location.houseNumberAddition" />
                </div>
            <div class="zip">
                <label>Postal code</label>
                <Field name="zip" type="text" size="15" v-model="houseData.location.zip" :class="{'is-invalid': errors.zip }"/>
                <ErrorMessage name="zip" />
            </div>
            <div class="city">
                <label>City</label>
                <Field name="city" type="text" size="15" v-model="houseData.location.city" :class="{'is-invalid': errors.city }"/>
                <ErrorMessage name="city" />
                <input type="text" size="15"   required />
            </div>
          <!--
            <div class="upload-img">
                <label>Upload picture (PNG or JPG)</label>
                <input type="file" />
            </div>
            -->
            <div class="price">
                <label>Price</label>
                <Field name="price" type="number" v-model="houseData.price" :class="{'is-invalid': errors.price }"/>
                <ErrorMessage name="price" />
            </div>
            <div class="size-garage">
                <div class="size">
                    <label>Size</label>
                    <Field name="size" type="number" v-model="houseData.size" :class="{'is-invalid': errors.size }"/>
                    <ErrorMessage name="size" />
                </div>
                <div class="garage">
                    <label>Garage</label>
                    <Field as="select" name="hasGarage" v-model="houseData.hasGarage" :class="{'is-invalid': errors.hasGarage }">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </Field>
                    <ErrorMessage name="hasGarage" />
                </div>
            </div>
            <div class="bed-bath">
                <div class="bedroom">
                    <label>Bedrooms</label>
                    <Field name="bedrooms" type="number" v-model="houseData.rooms.bedrooms" :class="{'is-invalid': errors.bedrooms }"/>
                    <ErrorMessage name="bedrooms" />
                </div>
                <div class="bathroom">
                    <label>Bathrooms</label>
                    <Field name="bathrooms" type="number" v-model="houseData.rooms.bathrooms" :class="{'is-invalid': errors.bathrooms }"/>
                    <ErrorMessage name="bathrooms" />
                </div>
            </div>
            <div class="construction-year">
                <label>Construction year</label>
                <Field name="constructionYear" type="number" v-model="houseData.constructionYear" :class="{'is-invalid': errors.constructionYear }"/>
                <ErrorMessage name="constructionYear" />
            </div>
            <div class="description">
                <label>Description</label>
                <Field name="description"  type="text" v-model="houseData.description" :class="{'is-invalid': errors.description }" />
                <ErrorMessage name="description" />
            </div>
            <div class="submit">
                <input type="submit" value="Post" />
            </div>
        </Form>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate"; 
import * as Yup from 'yup';

export default {
    data(){
        const schema = Yup.object().shape({
            //image: "",
            price: Yup.number("Price should be a number").positive("Price should be a positive number").required('Price is required.'),
            bedrooms: Yup.number('The number of bedrooms should be a number.').positive("The number of bedrooms should be a positive number").required('The number of bedrooms is required. '),
            bathrooms: Yup.number('The number of bathrooms should be a number.').positive("The number of bathrooms should be a positive number").required('The number of bathrooms is required. '),
            size: Yup.number('The size of the house should be a number.').positive('The number of size should be a positive number.').required('Size is required.'),
            description: Yup.string().required('Description of the house is required.'),
            street: Yup.string().required('Street name is required.'),
            houseNumber: Yup.number("House number should be a number").positive("House number should be a positive number").required('House number is required.'),
            houseNumberAddition: Yup.string(),
            city: Yup.string().required('City is required.'),
            zip: Yup.string().required('Postal code is required')
                .matches(/[0-9]{4}\s?[A-Z]{2}/, "Postal code must be 4 digits with two uppercase letters"),
            constructionYear: Yup.number().required()
                .min(1000, "Construction year must be a valid year.").max(2023, "Construction year must be a valid year."),
            hasGarage: Yup.boolean().required('Please inform whether the house has a garage or not.'),
        }); 
        return {
            schema,
        }
    },

    components:{
        Form, 
        Field,
        ErrorMessage
    },
    
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
        }, 


    },
   
    methods: {
        handlePost(values){
            const newHouse = {
                id: this.houseData.id,
                //image: "",
                price: values.price,
                rooms:{
                    bedrooms: values.bedrooms,
                    bathrooms: values.bathrooms,
                },
                size: values.size,
                description: values.description,
                location:{
                    street: values.street,
                    houseNumber: values.houseNumber,
                    houseNumberAddition: values.houseNumberAddition,
                    city: values.city,
                    zip: values.zip,
                },
                createdAt: this.houseData.createdAt,
                constructionYear: values.constructionYear,
                hasGarage: values.hasGarage,
                madeByMe: true,
            }

            this.$store.commit("editListing", newHouse)
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