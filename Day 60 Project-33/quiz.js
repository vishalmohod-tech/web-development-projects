 const quizContainer = document.getElementById('quizContainer');
    const addQuestionBtn = document.getElementById('addQuestionBtn');
     const submitQuizBtn = document.getElementById('submitQuizBtn');
      const resultDiv = document.getElementById('result');

      let questionCount = 0;

    function createQuestionCard() {
        questionCount++;
        const card = document.createElement('div');
        card.classList.add('question-card');

        card.innerHTML = `
            <button class="remove-btn">X</button>
            <textarea placeholder="Enter question" required></textarea>
            <input type="text" placeholder="Option 1" required>
            <input type="text" placeholder="Option 2" required>
            <input type="text" placeholder="Option 3" required>
            <input type="text" placeholder="Option 4" required>
                <input type="text" placeholder="Correct Option Number (1-4)" required>
        `;

        card.querySelector('.remove-btn').addEventListener('click', () => {
            quizContainer.removeChild(card);
        });

         quizContainer.appendChild(card);
    }

    addQuestionBtn.addEventListener('click', createQuestionCard);

    submitQuizBtn.addEventListener('click', () => {
        const cards = document.querySelectorAll('.question-card');
         if(cards.length === 0) {
            alert('Please add at least one question!');
            return;
        }

        let score = 0;
        cards.forEach(card => {
            const question = card.querySelector('textarea').value.trim();
            const options = Array.from(card.querySelectorAll('input[type="text"]')).slice(0,4).map(input => input.value.trim());
            const correctOption = parseInt(card.querySelectorAll('input[type="text"]')[4].value);

            if(options[correctOption - 1]) {
                const userAnswer = prompt(`${question}\n1. ${options[0]}\n2. ${options[1]}\n3. ${options[2]}\n4. ${options[3]}\nEnter option number:`);
                if(parseInt(userAnswer) === correctOption) {
                    score++;
                }
            }
        });

        resultDiv.textContent = `Your Score: ${score} / ${cards.length}`;
    });

         createQuestionCard();
