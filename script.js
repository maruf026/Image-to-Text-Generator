let input = document.getElementById("input");
let btn = document.getElementById("btn");
let output = document.getElementById("textOutput");

btn.addEventListener("click", () => {
  let imageFile = input.files[0];

  if (!imageFile) {
    output.innerHTML = "Please select an image file.";
    return;
  }

  output.innerHTML = "Processing...";

  Tesseract.recognize(imageFile, "eng", {
    logger: (m) => {
      output.innerHTML = `Progress: ${Math.round(m.progress * 100)}%`;
    },
  })
    .then(({ data: { text } }) => {
      output.innerHTML = text;
    })
    .catch((error) => {
      output.innerHTML = `Error: ${error.message}`;
    });
});
