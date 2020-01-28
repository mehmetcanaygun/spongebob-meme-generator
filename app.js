// DOM Elements
const canvas = document.getElementById("meme-canvas");
const ctx = canvas.getContext("2d");
const mockingTextBtn = document.querySelector(".mocking-text-btn");
const memeBtn = document.querySelector(".meme-btn");
const textMode = document.querySelector(".text-mode");
const memeMode = document.querySelector(".meme-mode");
const textModePaste = document.querySelector(".text-mode-paste");
const textModeCopy = document.querySelector(".text-mode-copy");
const textModeCopyLabel = document.querySelector(".text-mode-copy-label");
const topTextBtn = document.querySelector(".top-text-btn");
const bottomTextBtn = document.querySelector(".bottom-text-btn");
const topText = document.querySelector(".top-text");
const bottomText = document.querySelector(".bottom-text");
const copyText = document.querySelector(".copy-text");

// Variables
let fontSize = 60;
let topTextArr = [];
let bottomTextArr = [];

// Canvas Settings
canvas.width = 619;
canvas.height = 470;
ctx.font = `bold ${fontSize}px Arial`;
ctx.textAlign = "center";
ctx.fillStyle = "#ffffff";
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
ctx.shadowColor = "rgba(0,0,0,1)";
ctx.lineWidth = 2;

let mockingBg = new Image();
mockingBg.src = "./mocking-bg.jpg";

mockingBg.onload = function() {
  ctx.drawImage(mockingBg, 0, 0);
};

// Toggle Mode
const toggleMode = btn => {
  if (btn.className.includes("mocking-text-btn")) {
    if (!btn.className.includes("toggled-btn")) {
      mockingTextBtn.classList.add("toggled-btn");
      memeBtn.className = "meme-btn";
      textMode.style.display = "block";
      memeMode.style.display = "none";
    }
  } else if (btn.className.includes("meme-btn")) {
    if (!btn.className.includes("toggled-btn")) {
      memeBtn.classList.add("toggled-btn");
      mockingTextBtn.className = "mocking-text-btn";
      textMode.style.display = "none";
      memeMode.style.display = "block";
    }
  }
};

// Get text text mode
const getTextTextMode = val => {
  textModeCopy.value = convertToMocking(val);
};

// Copy to clipboard
const copyToClipboard = (textarea, val) => {
  textarea.select();
  document.execCommand("copy");

  setTimeout(() => {
    textModeCopy.className = "text-mode-copy";
    textModeCopyLabel.innerHTML = "Click to copy the mocking test below.";
  }, 3000);
  // Add text copied class to the textarea
  textModeCopy.className = "text-mode-copy copied-text";

  // Change innerhtml of the label
  textModeCopyLabel.innerHTML = "Copied!";
};

// Toggle Textareas
const toggleArea = btn => {
  if (btn.className.includes("top-text-btn")) {
    if (!btn.className.includes("toggled-btn")) {
      topTextBtn.classList.add("toggled-btn");
      bottomTextBtn.className = "bottom-text-btn";
      topText.style.display = "block";
      bottomText.style.display = "none";
    }
  } else if (btn.className.includes("bottom")) {
    if (!btn.className.includes("toggled-btn")) {
      bottomTextBtn.classList.add("toggled-btn");
      topTextBtn.className = "top-text-btn";
      topText.style.display = "none";
      bottomText.style.display = "block";
    }
  }
};

// Get text
const getText = (area, val) => {
  if (area.className === "top-text") {
    topTextArr = convertToMocking(val).split(/\n/g);
    ctx.drawImage(mockingBg, 0, 0);
  } else {
    bottomTextArr = convertToMocking(val)
      .split(/\n/g)
      .reverse();
    ctx.drawImage(mockingBg, 0, 0);
  }
  fillCanvas();
};

// Convert text to mocking text
const convertToMocking = text => {
  let textWidth = ctx.measureText(text).width;
  // console.log(textWidth);
  // if (textWidth > 550) {
  //   fontSize -= 10;
  //   ctx.font = `bold ${fontSize}px Arial`;
  // } else if (textWidth < 400 && textWidth > 350) {
  //   fontSize = 50;
  //   ctx.font = `bold ${fontSize}px Arial`;
  // }

  for (let i = 0; i < text.length; i++) {
    let random = Math.round(Math.random());
    if (random === 0) {
      text =
        text.substring(0, i) +
        text.charAt(i).toUpperCase() +
        text.substring(i + 1, text.length);
    } else {
      text =
        text.substring(0, i) +
        text.charAt(i).toLowerCase() +
        text.substring(i + 1, text.length);
    }
  }
  return text;
};

// Fill canvas
const fillCanvas = () => {
  let topHeight = 0;
  let bottomHeight = canvas.height + 40;

  topTextArr.map(line => {
    topHeight += 60;
    ctx.fillText(line, canvas.width / 2, topHeight);
    ctx.strokeText(line, canvas.width / 2, topHeight);
  });

  bottomTextArr.map(line => {
    bottomHeight -= 60;
    ctx.fillText(line, canvas.width / 2, bottomHeight);
    ctx.strokeText(line, canvas.width / 2, bottomHeight);
  });
};

// Download Image
const downloadImage = el => {
  let img = canvas.toDataURL("image/png");
  el.href = img;
};
