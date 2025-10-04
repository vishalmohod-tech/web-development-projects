const passwordInput = document.getElementById('password');
    const strengthIndicator = document.getElementById('strengthIndicator');
    const strengthLabel = document.getElementById('strengthLabel');
    const togglePassword = document.getElementById('togglePassword');

    const lengthReq = document.getElementById('lengthReq');
    const upperReq = document.getElementById('upperReq');
    const numberReq = document.getElementById('numberReq');
    const specialReq = document.getElementById('specialReq');

    togglePassword.addEventListener('click', () => {
        if(passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "Hide";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "Show";
        }
    });

    passwordInput.addEventListener('input', () => {
        const value = passwordInput.value;
        let strength = 0;

        // Length
        if(value.length >= 8) {
            lengthReq.textContent = "✅ At least 8 characters";
            lengthReq.classList.add("valid");
            strength++;
        } else {
            lengthReq.textContent = "❌ At least 8 characters";
            lengthReq.classList.remove("valid");
        }

        // Uppercase
        if(/[A-Z]/.test(value)) {
            upperReq.textContent = "✅ At least 1 uppercase letter";
            upperReq.classList.add("valid");
            strength++;
        } else {
            upperReq.textContent = "❌ At least 1 uppercase letter";
            upperReq.classList.remove("valid");
        }

        // Number
        if(/[0-9]/.test(value)) {
            numberReq.textContent = "✅ At least 1 number";
            numberReq.classList.add("valid");
            strength++;
        } else {
            numberReq.textContent = "❌ At least 1 number";
            numberReq.classList.remove("valid");
        }

        // Special character
        if(/[!@#$%^&*]/.test(value)) {
            specialReq.textContent = "✅ At least 1 special character";
            specialReq.classList.add("valid");
            strength++;
        } else {
            specialReq.textContent = "❌ At least 1 special character";
            specialReq.classList.remove("valid");
        }

        // Strength Levels
        let label = "Weak";
        let color = "red";
        let width = "25%";

        if(strength === 1) {
            label = "Weak";
            color = "red";
            width = "25%";
        } else if(strength === 2) {
            label = "Medium";
            color = "orange";
            width = "50%";
        } else if(strength === 3) {
            label = "Strong";
            color = "gold";
            width = "75%";
        } else if(strength === 4) {
            label = "Very Strong";
            color = "green";
            width = "100%";
        } else {
            label = "-";
            color = "transparent";
            width = "0%";
        }

        strengthLabel.textContent = `Strength: ${label}`;
        strengthIndicator.style.width = width;
        strengthIndicator.style.background = color;
    });