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
      <div
        class="mainContent"
        v-if="this.data.length > 0 && this.checked.length > 0"
      >
        <Chart :data="data" />
      </div>
    </div>
  </div>
</template>

<script>
import fetchHandle from "../services/fetchHandle";
import Chart from "./Chart.vue";
export default {
  components: {
    Chart,
  },
  data() {
    return {
      towns: [],
      checked: [],
      data: [],
      tmp: [],
    };
  },
  mounted() {
    fetchHandle
      .fetchTown()
      .then((data) => (this.towns = data.result))
      .catch((err) => console.error(err));
  },
  methods: {
    updateChecked() {
      this.data = [];
      for (let i = 0; i < this.checked.length; ++i) {
        fetchHandle
          .fetchPopulation(this.checked[i])
          .then((data) => {
            let name = this.towns.filter(
              (town) => town.prefCode == this.checked[i]
            );
            let value = data.result.data[0].data
              .filter((value) => value.year >= 1980 && value.year <= 2015)
              .map((value) => value.value);
            let newData = { name: name[0].prefName, data: value };
            if (!this.data.some((obj) => obj.name == name[0].prefName))
              this.data.push(newData);
          })
          .catch((err) => console.error(err));
      }
      console.log(this.data);
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
  color: white;
}
.mainSite {
  color: #aaa;
  font-size: 0.9rem;
  letter-spacing: 1px;
  font-weight: 700;
}
.mainContent {
  padding: 20px;
  margin: 30px;
  width: min(1200px, 90%);
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.28) 0 0 10px;
  animation: fade-in 1s ease-in-out;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex-direction: column; */
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
