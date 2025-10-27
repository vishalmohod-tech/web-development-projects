    const extraFieldsContainer = document.getElementById("extraFieldsContainer");
    let extraFieldCount = 0;

    function addExtraField() {
      extraFieldCount++;
      const div = document.createElement("div");
      div.classList.add("extra-field-entry");
      div.innerHTML = `
        <input type="text" placeholder="Field Name (e.g., Certifications)" id="extraFieldName${extraFieldCount}" oninput="updateExtraFields()">
        <textarea placeholder="Field Content..." id="extraFieldValue${extraFieldCount}" oninput="updateExtraFields()"></textarea>
        <hr>
      `;
      extraFieldsContainer.appendChild(div);
    }

    function updateExtraFields() {
      generateResume();
    }

    function generateResume() {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const about = document.getElementById("about").value;
      const education = document.getElementById("education").value;
       const experience = document.getElementById("experience").value;
      const skills = document.getElementById("skills").value;

      let extraHTML = "";
      for (let i = 1; i <= extraFieldCount; i++) {
        const fieldName = document.getElementById(`extraFieldName${i}`).value;
          const fieldValue = document.getElementById(`extraFieldValue${i}`).value;
        if (fieldName && fieldValue) {
           extraHTML += `
            <div class="resume-section">
              <h3>${fieldName}</h3>
              <p>${fieldValue}</p>
            </div>
           `;
        }
      }

      document.getElementById("resumeOutput").innerHTML = `
        <h2>${name || "Your Name"}</h2>
        <p><strong>Email:</strong> ${email || "example@email.com"}</p>
        <p><strong>Phone:</strong> ${phone || "0000000000"}</p>
        <div class="resume-section">
          <h3>About Me</h3>
           <p>${about || "Write something about yourself..."}</p>
        </div>
        <div class="resume-section">
          <h3>Education</h3>
          <p>${education || "Add your education details here..."}</p>
        </div>
        <div class="resume-section">
           <h3>Experience</h3>
          <p>${experience || "Add your experience details here..."}</p>
        </div>
        <div class="resume-section">
           <h3>Skills</h3>
          <p>${skills || "List your key skills..."}</p>
        </div>
         ${extraHTML}
      `;
    }
