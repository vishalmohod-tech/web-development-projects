let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskTitle = document.getElementById("taskTitle");
const taskDesc = document.getElementById("taskDesc");
const taskPriority = document.getElementById("taskPriority");
const addTaskBtn = document.getElementById("addTaskBtn");

const todoList = document.getElementById("todoList");
const progressList = document.getElementById("progressList");
const doneList = document.getElementById("doneList");

const todoCount = document.getElementById("todoCount");
const progressCount = document.getElementById("progressCount");
const doneCount = document.getElementById("doneCount");

function saveToStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  todoList.innerHTML = "";
  progressList.innerHTML = "";
  doneList.innerHTML = "";

  let todoC = 0, progC = 0, doneC = 0;

  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `
      <div class="task-title">${task.title}</div>
      <div class="task-desc">${task.desc}</div>
      <div class="task-footer">
        <span class="priority ${task.priority}">${task.priority}</span>
        <div class="actions">
          <button class="edit" onclick="editTask(${index})">✏️</button>
          <button class="delete" onclick="deleteTask(${index})">🗑️</button>
          ${
            task.status !== "Done"
              ? `<button class="move" onclick="moveNext(${index})">➡️</button>`
              : ""
          }
        </div>
      </div>
    `;
    if (task.status === "To-Do") {
      todoList.appendChild(div);
      todoC++;
    } else if (task.status === "In Progress") {
      progressList.appendChild(div);
      progC++;
    } else if (task.status === "Done") {
      doneList.appendChild(div);
      doneC++;
    }
  });

  todoCount.textContent = `(${todoC})`;
  progressCount.textContent = `(${progC})`;
  doneCount.textContent = `(${doneC})`;

  saveToStorage();
}

function addTask() {
  const title = taskTitle.value.trim();
  const desc = taskDesc.value.trim();
  const priority = taskPriority.value;

  if (!title || !desc) return alert("Fill all fields!");

  tasks.push({ title, desc, priority, status: "To-Do" });
  taskTitle.value = "";
  taskDesc.value = "";
  renderTasks();
}

function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

function editTask(index) {
  const task = tasks[index];
  const newTitle = prompt("Edit Task Title:", task.title);
  if (newTitle) task.title = newTitle;
  const newDesc = prompt("Edit Description:", task.desc);
  if (newDesc) task.desc = newDesc;
  const newPriority = prompt("Edit Priority (High/Medium/Low):", task.priority);
  if (newPriority) task.priority = newPriority;
  renderTasks();
}

function moveNext(index) {
  const task = tasks[index];
  if (task.status === "To-Do") task.status = "In Progress";
  else if (task.status === "In Progress") task.status = "Done";
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);

renderTasks();
