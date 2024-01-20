<template>
  <h3>Recommended for you</h3>
  <div class="item" v-for="item in recommendation">
    <HouseCard :house="item" :isRecommendation="true" />
  </div>
</template>

<script>
import HouseCard from './HouseCard.vue';

export default {
  name: "Recommendation",
  props: ["itemId"],
  components: {
    HouseCard,
  },
  computed: {
    recommendation() {
      const houses = this.$store.state.houses
      const recommendation = [];
      //When the house detail page is refreshed/rerendered, houses can be empty, it will make the page crash. Therefore, while condition to make sure houses.length > 0. 
      while (houses.length > 0 && recommendation.length < 3) {
        let r = Math.floor(Math.random() * houses.length);
        console.log(r)
        if (recommendation.indexOf(houses[r]) === -1 && houses[r]?.id !== this.itemId && !houses[r].madeByMe) {
          recommendation.push(houses[r])
        }
      };

      return recommendation
    }
  }
}
</script>

<style>
.recomd-box h3 {
  margin: 0px; 
}

</style>
