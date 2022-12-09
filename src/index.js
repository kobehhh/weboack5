import pic from "./imgs/pic.png";
import svg from "./imgs/arrow.svg";
import exampleText from "./example.text";
import "./style.css";
import "./style.less";
import Data from "./assets/data.xml";
import Notes from "./assets/data.csv";
import helloWorld from "./helloWord";
// import css from './style.css'
// import _ from 'lodash'
import './async-module'
import './server'

// console.log('css-loader打包后的结果', css) // 去掉style-lodaer 只使用css-loader去打包css可以查看到

const img = document.createElement("img");
img.src = pic;
document.body.appendChild(img);

const img2 = document.createElement("img");
img2.src = svg;
document.body.appendChild(img2);

const text = document.createElement("div");
text.style.cssText = "width: 200px;height: 200px; background: red;";
text.textContent = exampleText;
text.classList.add("block-bg");
document.body.appendChild(text);

document.body.classList.add("hello");
document.body.classList.add("bg");

const span = document.createElement("span");
span.classList.add("icon");
span.innerHTML = "&#xe62b;";
document.body.appendChild(span);

console.log("Data", Data);
console.log("notes", Notes);

helloWorld();

// console.log(_.join([1, 2, 3], ' '))

const button = document.createElement('button')
button.textContent = '点击'
button.addEventListener('click', () => {
  /**
   * webpackChunkName: 单独打包出的文件名
   * webpackPrefetch: 预先拉取，当首页应用都加载完毕 网络空闲的时候再去加载
   * webpackPreload: 预先加载.为预加载的文件取别名，在父 chunk 加载时并行下载文件
   */
  import(/* webpackChunkName: 'math', webpackPreload: true */'./math.js').then(({ add }) => {
    console.log(add(4, 5))
  })
})

document.body.appendChild(button)
