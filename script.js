let input = document.getElementById("input");
let btn = document.getElementById("btn");
let output = document.getElementById("textOutput");
let languageSelect = document.getElementById("languageSelect");

function recognizeText(langCode) {
  let imageFile = input.files[0];

  if (!imageFile) {
    output.innerHTML = "Please select an image file.";
    return;
  }

  output.innerHTML = "Processing...";

  Tesseract.recognize(imageFile, langCode, {
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
}

btn.addEventListener("click", () => {
  let selectedLanguage = languageSelect.value; // "ben" or "eng"
  recognizeText(selectedLanguage);
});
