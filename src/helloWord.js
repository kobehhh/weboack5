function getString() {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("getString");
    }, 2000);
  });
}

async function helloWorld() {
  const string = await getString();
  console.log("string", string);
}

export default helloWorld;
