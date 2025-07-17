import { add } from "./utils/add";
import "./component/div_cpn";
import { createApp } from "vue";
import App from "./vue_demo/App.vue";

const text = "hello webpack";
console.log(add(1, 2));
console.log(text);

// vue代码
const app = createApp(App);
app.mount("#app");


