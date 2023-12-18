<template>
    <div class="create">
       <div class="hd-heading" @click="goBack">
            <img src="../../public/images/ic_back_grey@3x.png">
            <p>Back to overview</p>
        </div>

        <h3>Create new listing</h3>
        <Form @submit="handlePost"  :validation-schema="schema" v-slot="{ errors }">
            <div class="street">
                <label for="street">Street name</label>
                <Field name="street" type="text" :class="{'is-invalid': errors.street }"/>
                <ErrorMessage name="street"/>
            </div>
            <div class="houseNum"></div>
                <div>
                    <label for="house number">House number</label>
                    <Field name="houseNumber" type="number" size="10" :class="{'is-invalid': errors.houseNumber }"/>
                    <ErrorMessage name="houseNumber" />
                    
                </div>
                <div>
                    <label for="house addition">Addition (optional)</label>
                    <Field name="houseNumberAddition" type="text" size="10" />
                </div>
            <div class="zip">
                <label>Postal code</label>
                <Field name="zip" type="text" size="15" :class="{'is-invalid': errors.zip }"/>
                <ErrorMessage name="zip" />
            </div>
            <div class="city">
                <label for="city">City</label>
                <Field name="city" type="text" size="15" :class="{'is-invalid': errors.city }"/>
                <ErrorMessage name="city" />
            </div>
            <!--Check how to input an image as an url
            <div class="upload-img">
                <label for="image">Upload picture (PNG or JPG)</label>
                <Field name="image" type="file" @change="updateImage" />
            </div> -->
            <div class="price">
                <label for="price">Price</label>
                <Field name="price" type="number" :class="{'is-invalid': errors.price }"/>
                <ErrorMessage name="price" />
            </div>
            <div class="size-garage">
                <div class="size">
                    <label for="size">Size</label>
                    <Field name="size" type="number" :class="{'is-invalid': errors.size }"/>
                    <ErrorMessage name="size" />
                </div>
                <div class="garage">
                    <label for="garage">Garage</label>
                    <Field as="select" name="hasGarage" :class="{'is-invalid': errors.hasGarage }">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </Field>
                    <ErrorMessage name="hasGarage" />
                </div>
            </div>
            <div class="bed-bath">
                <div class="bedroom">
                    <label for="bedroom">Bedrooms</label>
                    <Field name="bedrooms" type="number" :class="{'is-invalid': errors.bedrooms }"/>
                    <ErrorMessage name="bedrooms" />
                </div>
                <div class="bathroom">
                    <label for="bathroom">Bathrooms</label>
                    <Field name="bathrooms" type="number" :class="{'is-invalid': errors.bathrooms }"/>
                    <ErrorMessage name="bathrooms" />
                </div>
            </div>
            <div class="construction-year">
                <label for="constructionYear">Construction year</label>
                <Field name="constructionYear" type="number" :class="{'is-invalid': errors.constructionYear }"/>
                <ErrorMessage name="constructionYear" />
            </div>
            <div class="description">
                <label for="description">Description</label>
                <Field name="description"  type="text" :class="{'is-invalid': errors.description }" />
                <ErrorMessage name="description" />
            </div>
            <div class="submit">
                <button type="submit">Post</button>
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
            id: this.newId,
            createdAt: new Date().toISOString().split('T')[0],
            madeByMe: true,
        }
    },
    components: {
        Form, 
        Field,
        ErrorMessage
    },
    computed: {
        newId(){
            return this.$store.getters.getNewId
        }, 
    },
   
    methods: {
        updateImage(e){
            this.houseData.image = e.target.value
        },
        goBack(e){
            this.$router.back()
        },
        handlePost(values){
            const newHouse = {
                id: this.newId,
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
                createdAt: new Date().toISOString().split('T')[0],
                constructionYear: values.constructionYear,
                hasGarage: values.hasGarage,
                madeByMe: true,
            }
                        
            const id = newHouse.id //prevent rerender interrupting router
            
            this.$store.commit("createNewListing", newHouse)

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

.is-invalid {
    border-color: red;
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