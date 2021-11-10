<template>
  <h1>Time Zone converter</h1>
  <div class="dashboard-header">
    <span>Enter Time:</span>
    <input
      type="text"
      v-model="userTime"
      @input="handleTimeChange"
      @click="resetCount"
      @keydown.enter.prevent="startCount"
    />
    <button class="main-btn" @click="getCurrentTime()">time now</button>
  </div>
  <main-list :time="new Date(userTime)" />
</template>

<script>
import MainList from "../components/MainList.vue";
import { ref, onMounted } from "vue";

export default {
  components: { MainList },
  setup() {
    const SEC_STEP = 1000;
    const userTime = ref(new Date());
    let setupCounter = null;

    function refreshTime() {
      userTime.value = new Date(userTime.value);
      userTime.value = new Date(
        userTime.value.getTime() + SEC_STEP
      ).toLocaleString(navigator.language);
    }

    function startCount() {
      setupCounter = setInterval(refreshTime, SEC_STEP);
    }

    function resetCount() {
      clearInterval(setupCounter);
    }

    function getCurrentTime() {
      resetCount();
      refreshTime();
      userTime.value = new Date().toLocaleString(navigator.language);
      startCount();
    }

    function handleTimeChange() {
      resetCount();
    }

    onMounted(() => {
      refreshTime();
      startCount();
    });

    return {
      userTime,
      handleTimeChange,
      getCurrentTime,
      startCount,
      resetCount,
    };
  },
};
</script>
