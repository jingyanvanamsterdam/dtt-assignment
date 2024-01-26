import { createStore } from "vuex";
import { housesModule } from "./housesModule";
import { favoriteModule } from "./favoriteModule";

export const useHouseStore = createStore({
  housesModule,
  favoriteModule
})
