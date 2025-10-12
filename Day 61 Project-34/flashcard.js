const flashcardList = document.getElementById("flashcardList");
const addCardBtn = document.getElementById("addCardBtn");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModalBtn");
const saveCardBtn = document.getElementById("saveCardBtn");
const questionInput = document.getElementById("question");
const answerInput = document.getElementById("answer");

let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

function renderFlashcards() {
  flashcardList.innerHTML = "";
  if (flashcards.length === 0) {
    flashcardList.innerHTML = "<p style='text-align:center; color:white;'>No flashcards yet. Add one!</p>";
    return;
  }

  flashcards.forEach((card, index) => {
    const flashcard = document.createElement("div");
    flashcard.classList.add("flashcard");

    flashcard.innerHTML = `
      <button class="delete-btn" data-index="${index}">×</button>
      <div class="flashcard-inner">
        <div class="flashcard-front">${card.question}</div>
        <div class="flashcard-back">${card.answer}</div>
      </div>
    `;

    flashcard.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) return;
      flashcard.classList.toggle("flip");
    });

    flashcard.querySelector(".delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      flashcards.splice(index, 1);
      localStorage.setItem("flashcards", JSON.stringify(flashcards));
      renderFlashcards();
    });

    flashcardList.appendChild(flashcard);
  });
}

saveCardBtn.addEventListener("click", () => {
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();

  if (!question || !answer) {
    alert("Please fill in both question and answer!");
    return;
  }

  flashcards.push({ question, answer });
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
  renderFlashcards();

  questionInput.value = "";
  answerInput.value = "";
  modal.style.display = "none";
});

addCardBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

renderFlashcards();