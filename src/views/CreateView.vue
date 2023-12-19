<template>
     <div class="form-container">
        <div class="form">
            <div class="hd-heading" @click="goBack">
                <img src="../../public/images/ic_back_grey@3x.png">
                <p>Back to overview</p>
            </div>

            <h3>Create new listing</h3>
            <Form @submit="handlePost"  :validation-schema="schema" v-slot="{ errors }">
                <div class="street">
                    <label for="streetName">Street name*</label>
                    <Field name="streetName" type="text" :class="{'is-invalid': errors.streetName }"/>
                    <ErrorMessage class="errors" name="streetName"/>
                </div>
                <div class="houseNum-row">
                    <div class="houseNumber">
                        <label for="house number">House number*</label>
                        <Field name="houseNumber" type="number" size="10" :class="{'is-invalid': errors.houseNumber }"/>
                        <ErrorMessage class="errors" name="houseNumber" />
                    </div>
                    <div class="numberAddition">
                        <label for="house addition">Addition (optional)</label>
                        <Field name="numberAddition" type="text" size="10" />
                    </div>
                </div>
                <div class="zip">
                    <label>Postal code*</label>
                    <Field name="zip" type="text" size="15" :class="{'is-invalid': errors.zip }"/>
                    <ErrorMessage class="errors" name="zip" />
                </div>
                <div class="city">
                    <label for="city">City*</label>
                    <Field name="city" type="text" size="15" :class="{'is-invalid': errors.city }"/>
                    <ErrorMessage class="errors" name="city" />
                </div>
                
                <div class="upload-img">
                    <label for="image">Upload picture (PNG or JPG)*</label>
                    <Field name="image" type="file" @change="handleFileChange"/>
                    <!--<img v-if="previewFile" :src="previewFile"/>-->
                </div>
                <div class="price">
                    <label for="price">Price*</label>
                    <div class="price-input-wrapper">
                        <Field name="price" type="number" :class="{'is-invalid': errors.price }"/>
                        <span class="price-unit"> € </span>
                    </div>
                    <ErrorMessage class="errors" name="price" />
                </div>

                <div class="size-garage">
                    <div class="size">
                        <label for="size">Size*</label>
                        <div class="size-input-wrapper">
                            <Field name="size" type="number" :class="{'is-invalid': errors.size }"/>
                            <span class="size-unit">m²</span>
                        </div>
                        <ErrorMessage class="errors" name="size" />
                    </div>
                    <div class="garage">
                        <label for="garage">Garage*</label>
                        <Field as="select" name="hasGarage" :class="{'is-invalid': errors.hasGarage }">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </Field>
                        <ErrorMessage class="errors" name="hasGarage" />
                    </div>
                </div>
                <div class="bed-bath">
                    <div class="bedroom">
                        <label for="bedrooms">Bedrooms*</label>
                        <Field name="bedrooms" type="number" :class="{'is-invalid': errors.bedrooms }"/>
                        <ErrorMessage class="errors" name="bedrooms" />
                    </div>
                    <div class="bathroom">
                        <label for="bathrooms">Bathrooms*</label>
                        <Field name="bathrooms" type="number" :class="{'is-invalid': errors.bathrooms }"/>
                        <ErrorMessage class="errors" name="bathrooms" />
                    </div>
                </div>
                <div class="construction-year">
                    <label for="constructionYear">Construction year*</label>
                    <Field name="constructionYear" type="number" :class="{'is-invalid': errors.constructionYear }"/>
                    <ErrorMessage class="errors" name="constructionYear" />
                </div>
                <div class="description">
                    <label for="description">Description*</label>
                    <Field name="description"  type="text" :class="{'is-invalid': errors.description }" />
                    <ErrorMessage class="errors" name="description" />
                </div>
                <div class="submit">
                    <button type="submit">Post</button>
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
            selectedFile: null,
            previewFile: null,
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
        handleFileChange(event){
            this.selectedFile = event.target.files[0]
            //this.previewFile = URL.createObjectURL(event.target.files[0])
        },
        goBack(e){
            this.$router.back()
        },
        handlePost(values){
            this.$store.dispatch("createNewHouse", {houseData: values, imageFile: this.selectedFile})
        }
    }
}
</script>
