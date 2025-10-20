  const nameInput = document.getElementById("nameInput");
    const messageInput = document.getElementById("messageInput");
    const colorSelect = document.getElementById("colorSelect");
    const bgSelect = document.getElementById("bgSelect");
    const generateBtn = document.getElementById("generateBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const card = document.getElementById("card");
    const greetingText = document.getElementById("greetingText");
    const fromText = document.getElementById("fromText");

    generateBtn.addEventListener("click", () => {
      const name = nameInput.value.trim();
      const message = messageInput.value.trim();
      const color = colorSelect.value;
      const background = bgSelect.value;

      if (!name || !message) {
        alert("Please enter your name and message!");
        return;
      }

      card.style.border = `3px solid ${color}`;
      card.style.boxShadow = `0 0 30px ${color}`;
      card.style.background = background;

      greetingText.textContent = message;
      fromText.textContent = `— ${name}`;
    });

    downloadBtn.addEventListener("click", () => {
      html2canvas(card).then(canvas => {
        const link = document.createElement("a");
        link.download = "Diwali_Greeting_Card.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    });

const shareAppBtn = document.getElementById("shareAppBtn");

shareAppBtn.addEventListener("click", () => {
  const projectLink = "  https://vishalmohod-tech.github.io/web-development-projects/Day%2070%20Project-43/wish.html"; 


  navigator.clipboard.writeText(projectLink)
    .then(() => {
      alert("🎇 App link copied! Share it with your friends so they can create their own card.");
    })
    .catch(() => {
      alert("Failed to copy link. Please copy manually: " + projectLink);
    });
});
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

    document.body.appendChild(script);

