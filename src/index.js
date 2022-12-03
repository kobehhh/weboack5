import pic from './imgs/pic.png'
import svg from './imgs/arrow.svg'
import exampleText from './example.text'

console.log(1)

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