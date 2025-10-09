 const textInput = document.getElementById("textInput");
    const charCount = document.getElementById("charCount");
    const wordCount = document.getElementById("wordCount");
    const progress = document.getElementById("progress");

    textInput.addEventListener("input", () => {
        let text = textInput.value;

        // Character & Word Count
        let chars = text.length;
        let words = text.trim().split(/\s+/).filter(word => word.length > 0).length;

        charCount.textContent = `Characters: ${chars}`;
        wordCount.textContent = `Words: ${words}`;

        // Progress Bar based on characters (visual feedback only, no limit)
        let percent = Math.min((chars / 100) * 100, 100); // using 300 as just a visual scale
        progress.style.width = percent + "%";

        // Color feedback
          if (percent < 25) progress.style.background = "blue";
        else if (percent < 50) progress.style.background = "green";
        else if (percent < 75) progress.style.background = "orange";
        else progress.style.background = "red";
    });