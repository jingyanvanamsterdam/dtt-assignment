<template>
    <div class="form-container">
        <div v-if="house" class="form">
            <router-link :to="`/house-details/${house.id}`">
                <div class="hd-heading">
                    <img src="../../public/images/ic_back_grey@3x.png">
                    <p>Back to detail page</p>
                </div>
            </router-link>

            <h3>Edit listing</h3>
            <Form  @submit="handlePost"  :validation-schema="schema" v-slot="{ errors }">
                <div class="street">
                    <label for="street name">Street name*</label>
                    <Field name="streetName" type="text" v-model="houseData.location.street" :class="{'is-invalid': errors.streetName }"/>
                    <ErrorMessage class="errors" name="streetName"/>
                </div>
                <div class="houseNum-row">
                    <div class="houseNumber"> 
                        <label>House number*</label>
                        <Field name="houseNumber" type="number" v-model="houseData.location.houseNumber" :class="{'is-invalid': errors.houseNumber }"/>
                        <ErrorMessage class="errors" name="houseNumber" />
                    </div>
                    <div class="numberAddition">
                        <label>Addition (optional)</label>
                        <Field name="numberAddition" type="text" v-model="houseData.location.houseNumberAddition" />
                    </div>
                </div>
                <div class="zip">
                    <label>Postal code*</label>
                    <Field name="zip" type="text" v-model="houseData.location.zip" :class="{'is-invalid': errors.zip }"/>
                    <ErrorMessage class="errors" name="zip" />
                </div>
                <div class="city">
                    <label>City*</label>
                    <Field name="city" type="text" v-model="houseData.location.city" :class="{'is-invalid': errors.city }"/>
                    <ErrorMessage class="errors" name="city" />
                </div>
            
                <div class="upload-img">
                    <label for="image">Upload picture (PNG or JPG)*</label>
                    <Field name="image" type="file" v-model="houseData.image" @change="handleFileChange"/>
                </div>
                <div class="price">
                    <label>Price*</label>
                    <div class="price-input-wrapper">
                        <Field name="price" type="number" v-model="houseData.price" :class="{'is-invalid': errors.price }"/>
                        <span class="price-unit"> € </span>
                    </div>
                    <ErrorMessage class="errors" name="price" />
                </div>
                <div class="size-garage">
                    <div class="size">
                        <label>Size*</label>
                        <div class="size-input-wrapper">
                            <Field name="size" type="number" v-model="houseData.size" :class="{'is-invalid': errors.size }"/>
                            <span class="size-unit">m²</span>
                        </div>
                        <ErrorMessage class="errors" name="size" />
                    </div>
                    <div class="garage">
                        <label>Garage*</label>
                        <Field as="select" name="hasGarage" v-model="houseData.hasGarage" :class="{'is-invalid': errors.hasGarage }">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </Field>
                        <ErrorMessage class="errors" name="hasGarage" />
                    </div>
                </div>
                <div class="bed-bath">
                    <div class="bedroom">
                        <label>Bedrooms*</label>
                        <Field name="bedrooms" type="number" v-model="houseData.rooms.bedrooms" :class="{'is-invalid': errors.bedrooms }"/>
                        <ErrorMessage class="errors" name="bedrooms" />
                    </div>
                    <div class="bathroom">
                        <label>Bathrooms*</label>
                        <Field name="bathrooms" type="number" v-model="houseData.rooms.bathrooms" :class="{'is-invalid': errors.bathrooms }"/>
                        <ErrorMessage class="errors" name="bathrooms" />
                    </div>
                </div>
                <div class="construction-year">
                    <label>Construction year*</label>
                    <Field name="constructionYear" type="number" v-model="houseData.constructionYear" :class="{'is-invalid': errors.constructionYear }"/>
                    <ErrorMessage class="errors" name="constructionYear" />
                </div>
                <div class="description">
                    <label>Description*</label>
                    <Field name="description"  as="textarea" rows="5" v-model="houseData.description" :class="{'is-invalid': errors.description }" />
                    <ErrorMessage class="errors" name="description" />
                </div>
                <div class="submit">
                    <button type="submit">Save</button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate"; 
import * as Yup from 'yup';

export default {
    data(){
        const schema = Yup.object().shape({
            image: Yup.mixed().required("Required"),
            price: Yup.number("Must be a number").positive("Must be a positive number").required('Required'),
            bedrooms: Yup.number('Must be a number.').positive("Must be a positive number").required('Required'),
            bathrooms: Yup.number('Must be a number.').positive("Must be a positive number").required('Required'),
            size: Yup.number('Must be a number.').positive('Must be a positive number.').required('Required'),
            description: Yup.string().required('Required'),
            streetName: Yup.string().required('Required'),
            houseNumber: Yup.number("Must be a number").positive("Must be a positive number").required('Required'),
            numberAddition: Yup.string(),
            city: Yup.string().required('Required'),
            zip: Yup.string().required('Required')
                .matches(/[0-9]{4}\s?[A-Z]{2}/, "Must be 4 digits with two uppercase letters"),
            constructionYear: Yup.number().required('Required')
                .min(1000, "Must be a valid year.").max(2023, "Must be a valid year."),
            hasGarage: Yup.boolean().required('Required'),
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
            const theHouse =  houses.find(house => house.id === this.houseId)
            return theHouse ? theHouse : null
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

    created() {
        this.$store.dispatch('fetchHouses');
    },
   
    methods: {
        handleFileChange(event){
            this.selectedFile = event.target.files[0]
        },
        handlePost(values){
            this.$store.dispatch("editHouse", {houseData: values, id:this.houseData.id, imageFile: this.selectedFile})
        },
    }
}
</script>