<template>
  <div class="mainSite">
    <div class="container">
      <div class="mainContent">
        <h1 class="title">都道府県</h1>
        <div class="towns-list">
          <div class="town" v-for="town in towns" :key="town.prefCode">
            <input
              type="checkbox"
              :value="town.prefCode"
              :id="town.prefCode"
              v-model="checked"
              @change="updateChecked"
              hidden
            />
            <label :for="town.prefCode">{{ town.prefName }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getTown from "../services/getTown";
export default {
  data() {
    return {
      towns: [],
      checked: [],
    };
  },
  mounted() {
    getTown.fetchTown().then((data) => (this.towns = data.result));
  },
  methods: {
    updateChecked() {
      console.log(this.checked);
    },
  },
};
</script>

<style scoped>
label {
  width: 100px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
input:checked ~ label {
  background: #09ff00;
}
.mainSite {
  color: #aaa;
  font-size: 0.9rem;
  letter-spacing: 1px;
  font-weight: 700;
  animation: fade-in 1s ease-in;
}
.mainContent {
  padding: 20px;
  margin: 30px;
  max-width: 960px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: inset;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.title {
  display: inline-block;
}

.towns-list {
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 1rem;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
