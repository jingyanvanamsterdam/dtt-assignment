<template>
  <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors }">
    <div class="street">
      <label for="streetName">Street name*</label>
      <Field name="streetName" type="text" :value="houseData.location.street" :class="{ 'is-invalid': errors.streetName }"
        placeholder="Enter the street name" />
      <ErrorMessage class="errors" name="streetName" />
    </div>

    <div class="houseNum-row">
      <div class="houseNumber">
        <label for="house number">House number*</label>
        <Field name="houseNumber" type="text" :value="houseData.location.houseNumber"
          :class="{ 'is-invalid': errors.houseNumber }" placeholder="Enter House Number" />
        <ErrorMessage class="errors" name="houseNumber" />
      </div>
      <div class="numberAddition">
        <label for="house addition">Addition (optional)</label>
        <Field name="numberAddition" type="text" :value="houseData.location.houseNumberAddition" placeholder="e.g. A" />
      </div>
    </div>

    <div class="zip">
      <label>Postal code*</label>
      <Field name="zip" type="text" :value="houseData.location.zip" :class="{ 'is-invalid': errors.zip }"
        placeholder="e.g. 1000AA" />
      <ErrorMessage class="errors" name="zip" />
    </div>

    <div class="city">
      <label for="city">City*</label>
      <Field name="city" type="text" :value="houseData.location.city" :class="{ 'is-invalid': errors.city }"
        placeholder="e.g. Utrecht" />
      <ErrorMessage class="errors" name="city" />
    </div>

    <div class="upload-img">
      <label for="image">Upload picture (PNG or JPG)*</label>
      <!--use {handleChange} to get the value of uploaded file-->
      <Field name="image" :value="houseData.image" v-slot="{ handleChange }" :class="{ 'is-invalid': errors.image }">
        <div class="to-preview" v-if="previewImg">
          <img class="preview-img" :src="previewImg">
          <img class="removal-icon" src="../assets/images/ic_clear_white@3x.png"
            @click="(e) => { triggerRemoval(e); handleChange(null) }">
        </div>

        <div class="to-upload" v-else>
          <img class="upload-box" src="../assets/images/ic_plus_grey@3x.png" @click="triggerFileInput">
          <input ref="imageInput" style="display: none" name="image" type="file"
            @change="(e) => { handleFileChange(e); handleChange(e) }" />
        </div>
      </Field>
      <ErrorMessage class="errors" name="image" />
    </div>

    <div class="price">
      <label for="price">Price*</label>
      <div class="price-input-wrapper">
        <Field name="price" type="text" :value="houseData.price" :class="{ 'is-invalid': errors.price }" />
        <span class="price-unit"> € </span>
      </div>
      <ErrorMessage class="errors" name="price" />
    </div>

    <div class="size-garage">
      <div class="size">
        <label for="size">Size*</label>
        <div class="size-input-wrapper">
          <Field name="size" type="text" :value="houseData.size" :class="{ 'is-invalid': errors.size }" />
          <span class="size-unit">m²</span>
        </div>
        <ErrorMessage class="errors" name="size" />
      </div>
      <div class="garage">
        <label for="garage">Garage*</label>
        <Field as="select" name="hasGarage" :value="houseData.hasGarage" :class="{ 'is-invalid': errors.hasGarage }">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </Field>
        <ErrorMessage class="errors" name="hasGarage" />
      </div>
    </div>

    <div class="bed-bath">
      <div class="bedroom">
        <label for="bedrooms">Bedrooms*</label>
        <Field name="bedrooms" type="text" :value="houseData.rooms.bedrooms" :class="{ 'is-invalid': errors.bedrooms }"
          placeholder="Enter Amount" />
        <ErrorMessage class="errors" name="bedrooms" />
      </div>
      <div class="bathroom">
        <label for="bathrooms">Bathrooms*</label>
        <Field name="bathrooms" type="text" :value="houseData.rooms.bathrooms" :class="{ 'is-invalid': errors.bathrooms }"
          placeholder="Enter Amount" />
        <ErrorMessage class="errors" name="bathrooms" />
      </div>
    </div>

    <div class="construction-year">
      <label for="constructionYear">Construction year*</label>
      <Field name="constructionYear" type="text" :value="houseData.constructionYear"
        :class="{ 'is-invalid': errors.constructionYear }" placeholder="e.g. 1990" />
      <ErrorMessage class="errors" name="constructionYear" />
    </div>

    <div class="description">
      <label for="description">Description*</label>
      <Field name="description" as="textarea" :value="houseData.description" :class="{ 'is-invalid': errors.description }"
        placeholder="Enter Description" />
      <ErrorMessage class="errors" name="description" />
    </div>

    <div class="submit">
      <button type="submit">{{ buttonLabel }}</button>
    </div>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  name: "HouseForm",
  props: ['handleAfterSubmit', 'initialHouseData', 'buttonLabel'],
  data() {
    const schema = {
      image(value) {
        if (typeof (value) === 'string') {
          return true;
        }
        let allowedTypes = ['image/jpeg', 'image/png']
        if (!value) {
          return "Required"
        } else if (!allowedTypes.includes(value.type)) {
          return "Must be a jpeg or png"
        } else { return true }
      },
      price: 'required|positiveInt',
      bedrooms: 'required|positiveInt',
      bathrooms: 'required|positiveInt',
      size: 'required|positiveInt',
      description: 'required',
      streetName: 'required',
      houseNumber: 'required|positiveInt',
      city: 'required',
      zip: 'required|zip',
      constructionYear: 'required|year|positiveInt',
      hasGarage: 'required',
    }

    const houseData = this.initialHouseData ? this.initialHouseData : {
      image: null,
      price: null,
      rooms: {
        bedrooms: null,
        bathrooms: null,
      },
      size: null,
      description: null,
      location: {
        street: null,
        houseNumber: null,
        houseNumberAddition: null,
        city: null,
        zip: null,
      },
      constructionYear: null,
      hasGarage: null,
    };
    return {
      schema,
      houseData,
      previewImg: houseData?.image ? houseData.image : null,
      //Can also use this.initialHouseData?.image 
    }
  },

  components: {
    Form,
    Field,
    ErrorMessage,
  },

  methods: {
    triggerRemoval(e) {
      this.previewImg = null;
    },
    handleFileChange(e) {
      this.previewImg = URL.createObjectURL(e.target.files[0])
    },
    triggerFileInput() {
      this.$refs.imageInput.click();
    },
    handleSubmit(values) {
      //To modify user's input format of postcode
      values.zip = values.zip.toUpperCase().replace(" ", "")
      //image submission is handled separately by api: 
      const imageFile = values.image;
      delete values.image;
      this.handleAfterSubmit(values, imageFile)
    }
  }
}

</script>

<style>
/*Form (CreateView&EditView) Style*/
.form {
  margin: 0px;
  background-image: url('../assets/images/img_background@3x.png');
  background-size: cover;
  opacity: 0.9;
}

form {
  margin: 30px 0px;
  text-align: left;
  border-radius: 10px;
}

label {
  display: block;
  margin: 25px 0 15px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin: 20px 0 10px;
}

input {
  width: 320px;
  height: 40px;
  border: none;
}

textarea::placeholder,
input::placeholder {
  font-size: 12px;
  text-align: start;
}

select {
  width: 150px;
  height: 40px;
  border: none;
}

textarea {
  height: 150px;
  width: 320px;
  padding-top: 14px;
}

input[type="text"],
input[type="number"],
textarea,
select {
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #4A4B4C;
  border-radius: 10px;
  text-indent: 20px;
  border: none;
}

.size-input-wrapper,
.price-input-wrapper {
  position: relative;
}

.size-unit,
.price-unit {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #4A4B4C;
}

.size-unit {
  right: 10px;
}

.price-unit {
  left: 10px;
}

.houseNum-row,
.size-garage,
.bed-bath {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 320px;
}

.houseNum-row input,
.size input,
.bed-bath input {
  width: 150px;
}

.garage {
  display: flex;
  flex-direction: column;
}

.submit {
  margin-top: 20px;
}

.submit button {
  width: 200px;
  height: 100%;
  background-color: #EB5440;
  color: #FFFFFF;
  border: none;
  border-radius: 0.5em;
  padding: 10px 10px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.errors {
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-style: italic;
  font-weight: 500;
  color: #EB5440;
}

/*Form: preview image style*/
.preview-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
}

.to-preview {
  position: relative;
  width: 110px;
  height: 110px;
}

.to-preview .removal-icon {
  position: absolute;
  width: 30px;
  top: -10px;
  right: -5px;
  z-index: 100;
}

.upload-box {
  border: 2px dashed #C3C3C3;
  padding: 20px;
}
</style>