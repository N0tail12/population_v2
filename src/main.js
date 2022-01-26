import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import dotenv from "dotenv";
import VueApexCharts from "vue3-apexcharts";
dotenv.config();
createApp(App).use(router).use(VueApexCharts).mount("#app");
