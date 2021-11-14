<template>
  <ul v-if="cities.length">
    <li><span>City:</span> <span>Time</span> <span>Actions</span></li>
  </ul>
  <ul>
    <city-item
      v-for="city in cities"
      :key="city.postalCode"
      :city="city"
      :time="time"
      @deleteItem="deleteFromList"
    />
  </ul>
  <span>Search by city:</span>
  <vue-multiselect
    v-model="city"
    label="label"
    :options="options"
    :clearOnSelect="true"
    :close-on-select="true"
    @search-change="
      (query) =>
        debounce(() => {
          phrase = query;
          makeSuggestion();
        })
    "
    @select="(v) => addCity(v)"
  />
</template>

<script>
import { reactive, ref } from "vue";
import VueMultiselect from "vue-multiselect";
import getSuggestions from "../middleware/API/search";
import CityItem from "../components/CityItem.vue";

export default {
  components: { VueMultiselect, CityItem },
  props: {
    time: {
      type: Date,
      default: new Date(),
    },
  },
  setup() {
    const phrase = ref("");
    const city = ref({});
    const options = ref([]);
    const cities = reactive([]);

    function makeSuggestion() {
      if (phrase.value) {
        options.value.splice(0);
        getSuggestions(phrase.value).then((payload) => {
          options.value.push(...payload);
        });
      }
    }

    function addCity(city) {
      if (cities.every((e) => e.locationId !== city.locationId))
        cities.push(city);
    }

    function createDebounce() {
      let timeout = null;
      return function (cb, delay) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          cb();
        }, delay || 500);
      };
    }

    function deleteFromList(id) {
      cities.splice(
        cities.findIndex((e) => e.locationId === id),
        1
      );
    }

    return {
      phrase,
      city,
      cities,
      options,
      makeSuggestion,
      addCity,
      debounce: createDebounce(),
      deleteFromList,
    };
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
