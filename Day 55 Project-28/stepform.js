 let currentStep = 1;

    function showStep(step) {
        document.querySelectorAll('.step').forEach((s, i) => {
            s.classList.remove('active');
            if (i === step - 1) s.classList.add('active');
        });

     
        document.querySelectorAll('.progress span').forEach((bar, i) => {
            bar.classList.remove('active');
            if (i < step) bar.classList.add('active');
        });
    }

    function nextStep(step) {
        currentStep = step + 1;
        if (currentStep === 4) generateSummary();
        showStep(currentStep);
    }

    function prevStep(step) {
        currentStep = step - 1;
        showStep(currentStep);
    }

    function generateSummary() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
        const city = document.getElementById("city").value;
        const username = document.getElementById("username").value;

        document.getElementById("summaryBox").innerHTML = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>City:</strong> ${city}</p>
            <p><strong>Username:</strong> ${username}</p>
        `;
    }

    function submitForm() {
        alert("🎉 Form Submitted Successfully!");
    }

    showStep(currentStep);