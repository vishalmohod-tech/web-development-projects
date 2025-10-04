 const expressionInput = document.getElementById("expression");
    const resultBox = document.getElementById("result");
    const stepsBox = document.getElementById("steps");
    const historyBox = document.getElementById("history");

    function calculate() {
        let expr = expressionInput.value.trim();
        if (!expr) {
            resultBox.innerHTML = "<span class='error'>⚠️ Please enter an expression</span>";
            stepsBox.innerHTML = "";
            return;
        }

        try {
            // Step 1: Tokenize expression
            let tokens = expr.match(/(\d+|\+|\-|\*|\/|\(|\))/g);
            let steps = "<b>Steps:</b><br>Tokens: " + tokens.join(" ") + "<br>";

            // Step 2: Use eval safely for now (showcase real parsing later)
            let result = eval(expr);

            steps += "Parsed Expression → " + expr + "<br>";
            steps += "Final Result → " + result;

            resultBox.textContent = "Result: " + result;
            stepsBox.innerHTML = steps;

            // Add to history
            historyBox.innerHTML += expr + " = " + result + "<br>";
        } catch (e) {
            resultBox.innerHTML = "<span class='error'>❌ Invalid Expression</span>";
            stepsBox.innerHTML = "";
        }
    }

    // Allow "Enter" key to calculate
    expressionInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            calculate();
        }
    });