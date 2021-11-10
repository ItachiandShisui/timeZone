<template>
  <li>
    <span>{{ city.address.city }}</span>
    <span>{{
      timeZone
        ? new Date(time).toLocaleString("en-US", { timeZone: timeZone })
        : "No info about this city in DB"
    }}</span>
    <button class="main-btn" @click="deleteCity(city.locationId)">
      &#10006;
    </button>
  </li>
</template>

<script>
import timeZones from "city-timezones";
import { ref, onMounted } from "vue";

export default {
  props: {
    city: {
      type: Object,
      default: () => {},
    },
    time: {
      type: Date,
      default: new Date(),
    },
  },
  emits: ["deleteItem"],
  setup(props, { emit }) {
    const timeZone = ref(Intl.DateTimeFormat().resolvedOptions().timeZone);

    onMounted(() => {
      timeZone.value = timeZones.lookupViaCity(props.city.address.city).length
        ? timeZones.lookupViaCity(props.city.address.city)[0].timezone
        : null;
    });

    function deleteCity(id) {
      emit("deleteItem", id);
    }

    return {
      timeZone,
      deleteCity,
    };
  },
};
</script>
