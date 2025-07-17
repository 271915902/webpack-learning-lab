import "../css/div_style.css";
import "../css/div_style.less";

const divEl = document.createElement("div");

divEl.textContent = "Hello Webpack";
divEl.classList.add("div-cpn");

document.body.appendChild(divEl);

// 创建第二个元素
const divEl2 = document.createElement("div");
divEl2.textContent = "Hello Webpack 2";
divEl2.classList.add("div-cpn1");
document.body.appendChild(divEl2);
