const counterDisplay = document.getElementById('counter');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const undoBtn = document.getElementById('undo');
const themeSwitch = document.getElementById('themeSwitch');

let counter = 0;
let history = [];

// Load from localStorage
if(localStorage.getItem('counter')) {
  counter = parseInt(localStorage.getItem('counter'));
  counterDisplay.textContent = counter;
}
if(localStorage.getItem('history')) {
  history = JSON.parse(localStorage.getItem('history'));
}

// Update counter display & persist
function updateCounter(value) {
  history.push(counter); // Save current state for undo
  counter = value;
  counterDisplay.textContent = counter;
  localStorage.setItem('counter', counter);
  localStorage.setItem('history', JSON.stringify(history));
}

// Undo function
function undo() {
  if(history.length > 0) {
    counter = history.pop();
    counterDisplay.textContent = counter;
    localStorage.setItem('counter', counter);
    localStorage.setItem('history', JSON.stringify(history));
  }
}

// Button events
incrementBtn.addEventListener('click', () => updateCounter(counter + 1));
decrementBtn.addEventListener('click', () => updateCounter(counter - 1));
undoBtn.addEventListener('click', undo);

// Keyboard events
document.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowUp') updateCounter(counter + 1);
  if(e.key === 'ArrowDown') updateCounter(counter - 1);
  if(e.key.toLowerCase() === 'z') undo();
});

// Theme toggle
themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark', themeSwitch.checked);
  localStorage.setItem('darkMode', themeSwitch.checked);
});

// Load theme preference
if(localStorage.getItem('darkMode') === 'true') {
  themeSwitch.checked = true;
  document.body.classList.add('dark');
}
