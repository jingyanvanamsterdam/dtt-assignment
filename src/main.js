import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { useHouseStore } from '@/houseStore';
import { defineRule } from 'vee-validate';
import "./assets/main.css"

const app = createApp(App);
app.use(useHouseStore);
app.use(router).mount("#app");

//set up global rules for form validation
defineRule('required', value => {
  if (typeof(value) === 'boolean'){
    return true;
  }
  if (!value) {
    return 'Required';
  }
  return true;
});

defineRule('positiveInt', value => {
  //input type is a text to prevent when the input is +/-/e, the required error shown. Instead, using regex to regulate the input value to be a positive number format
  const regex = /^[1-9][0-9]*$/; 
  if (!regex.test(value)) {
    return 'Must be a positive integer';
  }
  return true;
}); 

defineRule('zip', value => {
  const regex = /[1-9][0-9]{3}\s?[A-Za-z]{2}/; 
  if (!regex.test(value)) {
    return 'Must be valid postcode. e.g. 1011XB'
  };
  return true;
});

defineRule('year', value => {
  if (value>2023 || value<1901){
    return 'Must be a valid year between 1901-2023'
  };
  return true;
})
