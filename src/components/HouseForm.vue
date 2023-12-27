<template>
    <Form @submit="handleSubmit"   :validation-schema="schema" v-slot="{ errors }">
        <div class="street">
            <label for="streetName">Street name*</label>
            <Field name="streetName" 
                   type="text" 
                   :value="houseData.location.street" 
                   :class="{'is-invalid': errors.streetName }"/>
            <ErrorMessage class="errors" name="streetName"/>
        </div>

        <div class="houseNum-row">
            <div class="houseNumber">
                <label for="house number">House number*</label>
                <Field name="houseNumber" 
                       type="number" 
                       :value="houseData.location.houseNumber" 
                       :class="{'is-invalid': errors.houseNumber }"/>
                <ErrorMessage class="errors" name="houseNumber" />
            </div>
            <div class="numberAddition">  
                <label for="house addition">Addition (optional)</label>
                <Field name="numberAddition" 
                       type="text" 
                       :value="houseData.location.numberAddition" />
            </div>
        </div>

        <div class="zip">
            <label>Postal code*</label>
            <Field name="zip" 
                   type="text" 
                   :value="houseData.location.zip" 
                   :class="{'is-invalid': errors.zip }"/>
            <ErrorMessage class="errors" name="zip" />
        </div>

        <div class="city">
            <label for="city">City*</label>
            <Field name="city" 
                   type="text" 
                   :value="houseData.location.city" 
                   :class="{'is-invalid': errors.city }"/>
            <ErrorMessage class="errors" name="city" />
        </div>

        <div class="upload-img">
            <label for="image">Upload picture (PNG or JPG)*</label>
            <!--use {handleChange} to get the value of uploaded file-->
            <Field name="image" 
                   :value="houseData.image" 
                   v-slot="{handleChange}" 
                   :class="{'is-invalid': errors.image }">
                <div class="to-preview" v-if="previewImg">
                    <img class="preview-img" :src="previewImg">
                    <img class="removal-icon" 
                         src="../../public/images/ic_clear_white@3x.png" 
                         @click="(e) => {triggerRemoval(e); handleChange(null)}"> 
                </div>
                
                <div class="to-upload" v-else>
                    <img class="upload-box" 
                         src="../../public/images/ic_plus_grey@3x.png" 
                         @click="triggerFileInput">
                    <input ref="imageInput" 
                           style="display: none" 
                           name="image" 
                           type="file" 
                           @change="(e) => {handleFileChange(e); handleChange(e)}" />
                </div>
            </Field>
            <ErrorMessage class="errors" name="image" />  
        </div>

        <div class="price">
            <label for="price">Price*</label>
            <div class="price-input-wrapper">
                <Field name="price" 
                       type="number" 
                       :value="houseData.price" 
                       :class="{'is-invalid': errors.price }"/>
                <span class="price-unit"> € </span>
            </div>
            <ErrorMessage class="errors" name="price" />
        </div>

        <div class="size-garage">
            <div class="size">
                <label for="size">Size*</label>
                <div class="size-input-wrapper">
                    <Field name="size" 
                           type="number" 
                           :value="houseData.size" 
                           :class="{'is-invalid': errors.size }"/>
                    <span class="size-unit">m²</span>
                </div>
                <ErrorMessage class="errors" name="size" />
            </div>
            <div class="garage">
                <label for="garage">Garage*</label>
                <Field as="select" 
                       name="hasGarage" 
                       :value="houseData.hasGarage" 
                       :class="{'is-invalid': errors.hasGarage }">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </Field>
                <ErrorMessage class="errors" name="hasGarage" />
            </div>
        </div>

        <div class="bed-bath">
            <div class="bedroom">
                <label for="bedrooms">Bedrooms*</label>
                <Field name="bedrooms" 
                       type="number" 
                       :value="houseData.rooms.bedrooms" 
                       :class="{'is-invalid': errors.bedrooms }"/>
                <ErrorMessage class="errors" name="bedrooms" />
            </div>
            <div class="bathroom">
                <label for="bathrooms">Bathrooms*</label>
                <Field name="bathrooms" 
                       type="number" 
                       :value="houseData.rooms.bathrooms" 
                       :class="{'is-invalid': errors.bathrooms }"/>
                <ErrorMessage class="errors" name="bathrooms" />
            </div>
        </div>

        <div class="construction-year">
            <label for="constructionYear">Construction year*</label>
            <Field name="constructionYear" 
                   type="number" 
                   :value="houseData.constructionYear" 
                   :class="{'is-invalid': errors.constructionYear }"/>
            <ErrorMessage class="errors" name="constructionYear" />
        </div>

        <div class="description">
            <label for="description">Description*</label>
            <Field name="description"  
                   type="text" 
                   :value="houseData.description" 
                   :class="{'is-invalid': errors.description }" />
            <ErrorMessage class="errors" name="description" />
        </div>

        <div class="submit">
            <button type="submit">{{ buttonLabel }}</button>
        </div>
    </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate"; 
import * as Yup from 'yup';

export default {
    name: "HouseForm",
    props: ['handleAfterSubmit','initialHouseData', 'buttonLabel'], 
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
                constructionYear: Yup.number("Must be a valid year.").required('Required')
                    .min(1901, "Must be not earlier than 1901.").max(2023, "Must be a valid year."),
                hasGarage: Yup.boolean().required('Required'),
            }); 
        
        const houseData = this.initialHouseData ? this.initialHouseData : {
            image: null,
            price: null,
            rooms:{
                bedrooms:null,
                bathrooms:null,
            },
            size:null,
            description:null,
            location:{
                street:null,
                houseNumber:null,
                houseNumberAddition:null,
                city:null,
                zip:null,
            },
            constructionYear:null,
            hasGarage:null,
            }; 
        return {
            schema,
            houseData,
            previewImg: houseData?.image ? houseData.image : null,
            //Can also use this.initialHouseData?.image 
        }
    },

    components:{
        Form, 
        Field,
        ErrorMessage,
    },

    methods: {
        triggerRemoval(e){
            this.previewImg = null;
        }, 
        handleFileChange(e){
            this.previewImg = URL.createObjectURL(e.target.files[0])
        },
        triggerFileInput(){
            this.$refs.imageInput.click();
        },
        handleSubmit(values){
            //image submission is handled separately by api: 
            const imageFile = values.image;
            delete values.image;
            this.handleAfterSubmit(values, imageFile)
        }
    }
}

</script>