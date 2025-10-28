const art = document.getElementById("art");
const shape = document.getElementById("shape");
const color = document.getElementById("color");
const size = document.getElementById("size");
const animation = document.getElementById("animation");
const exportBtn = document.getElementById("exportBtn");
const cssOutput = document.getElementById("cssOutput");

function updateArt() {
  let selectedShape = shape.value;
  let selectedColor = color.value;
  let selectedSize = size.value + "px";
  let selectedAnimation = animation.value;

  art.style.width = selectedSize;
  art.style.height = selectedSize;
  art.style.background = selectedColor;
  art.style.borderRadius = selectedShape === "circle" ? "50%" : "0";

  if (selectedShape === "triangle") {
    art.style.width = "0";
    art.style.height = "0";
    art.style.borderLeft = `${size.value/2}px solid transparent`;
    art.style.borderRight = `${size.value/2}px solid transparent`;
    art.style.borderBottom = `${size.value}px solid ${selectedColor}`;
    art.style.background = "none";
    art.style.borderRadius = "0";
  } else {
    art.style.border = "none";
  }

  // Animation
  art.style.animation = "none";
  if (selectedAnimation !== "none") {
    art.style.animation = `${selectedAnimation} 2s infinite linear`;
  }
}

function generateCSS() {
  let css = `#art {
  width: ${art.style.width};
  height: ${art.style.height};
  background: ${art.style.background};
  border-radius: ${art.style.borderRadius};
  animation: ${art.style.animation};
}`;

  if (shape.value === "triangle") {
    css = `#art {
  width: 0;
  height: 0;
  border-left: ${size.value/2}px solid transparent;
  border-right: ${size.value/2}px solid transparent;
  border-bottom: ${size.value}px solid ${color.value};
  animation: ${art.style.animation};
}`;
  }

  cssOutput.value = css;
}

[shape, color, size, animation].forEach(el =>
  el.addEventListener("input", () => {
    updateArt();
    generateCSS();
  })
);

exportBtn.addEventListener("click", generateCSS);

updateArt();
generateCSS();
