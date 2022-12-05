function getString() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('getString')
    }, 2000);
  })
}

async function helloWorld() {
  let string = await getString()
  console.log('string', string)
}

export default helloWorld