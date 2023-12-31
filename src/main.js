import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { useHouseStore } from '@/houseStore';

const app = createApp(App) 
app.use(useHouseStore);
app.use(router).mount("#app");


