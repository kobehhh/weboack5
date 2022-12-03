import pic from './imgs/pic.png'
import svg from './imgs/arrow.svg'
import exampleText from './example.text'
import './style.css'
import './style.less'
// import css from './style.css'

// console.log('css-loader打包后的结果', css) // 去掉style-lodaer 只使用css-loader去打包css可以查看到

const img = document.createElement('img')
img.src = pic
document.body.appendChild(img)

const img2 = document.createElement('img')
img2.src = svg
document.body.appendChild(img2)

const text = document.createElement('div')
text.style.cssText = "width: 200px;height: 200px; background: red;"
text.textContent = exampleText
document.body.appendChild(text)

document.body.classList.add('hello')
document.body.classList.add('bg')