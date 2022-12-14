fetch("/api/hello")
  .then((res) => res.text())
  .then((result) => {
    console.log("fetch", result);
  });
