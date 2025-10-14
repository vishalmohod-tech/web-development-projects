  const goalInput = document.getElementById('goalInput');
    const goalList = document.getElementById('goalList');

    let goals = JSON.parse(localStorage.getItem('goals')) || [];

    function renderGoals() {
      goalList.innerHTML = goals.length === 0 ? 
        "<p class='empty'>No goals yet. Add one to start tracking!</p>" : "";

      goals.forEach((goal, index) => {
        const card = document.createElement('div');
        card.className = 'goal-card';
        card.innerHTML = `
          <div class="goal-header">
            <h3>${goal.name}</h3>
            <div class="actions">
              <button onclick="deleteGoal(${index})">✖</button>
            </div>
          </div>
          <div class="stats">
            <p>Current Streak: <strong>${goal.current}</strong></p>
            <p>Longest Streak: <strong>${goal.longest}</strong></p>
            <p>Last Completed: ${goal.lastDate || 'Never'}</p>
          </div>
          <button class="mark-btn" onclick="markGoal(${index})">✅ Mark Today Complete</button>
        `;
        goalList.appendChild(card);
      });
      localStorage.setItem('goals', JSON.stringify(goals));
    }

    function addGoal() {
      const goalName = goalInput.value.trim();
      if (!goalName) return alert("Please enter a goal name!");
      if (goals.find(g => g.name.toLowerCase() === goalName.toLowerCase())) {
        alert("Goal already exists!");
        return;
      }
      goals.push({ name: goalName, current: 0, longest: 0, lastDate: "" });
      goalInput.value = '';
      renderGoals();
    }

    function markGoal(index) {
      const today = new Date().toLocaleDateString();
      const goal = goals[index];

      if (goal.lastDate === today) {
        alert("You already marked this goal for today!");
        return;
      }

      if (!goal.lastDate) {
        goal.current = 1;
      } else {
        const last = new Date(goal.lastDate);
        const diff = (new Date(today) - last) / (1000 * 60 * 60 * 24);
        goal.current = (diff === 1) ? goal.current + 1 : 1;
      }

      goal.lastDate = today;
      if (goal.current > goal.longest) goal.longest = goal.current;

      localStorage.setItem('goals', JSON.stringify(goals));
      renderGoals();
    }

    function deleteGoal(index) {
      if (confirm("Delete this goal?")) {
        goals.splice(index, 1);
        renderGoals();
      }
    }

    renderGoals();