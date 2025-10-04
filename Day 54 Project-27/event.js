// DOM Elements
const addEventBtn = document.getElementById('addEvent');
const eventNameInput = document.getElementById('eventName');
const eventDateInput = document.getElementById('eventDate');
const recurringSelect = document.getElementById('recurring');
const eventsList = document.getElementById('eventsList');

let events = JSON.parse(localStorage.getItem('events')) || [];


function saveEvents() {
  localStorage.setItem('events', JSON.stringify(events));
}

function renderEvents() {
  eventsList.innerHTML = '';
  events.forEach((event, index) => {
    const li = document.createElement('li');
    li.className = 'event-item';
    
    const countdownSpan = document.createElement('span');
    countdownSpan.className = 'countdown';
    
    li.innerHTML = `<span>${event.name} (${event.recurring})</span>`;
    li.appendChild(countdownSpan);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => deleteEvent(index));
    li.appendChild(deleteBtn);

    eventsList.appendChild(li);

    // Update countdown
    updateCountdown(event, countdownSpan, index);
    setInterval(() => updateCountdown(event, countdownSpan, index), 1000);
  });
}

function updateCountdown(event, element, index) {
  let eventTime = new Date(event.date).getTime();
  const now = new Date().getTime();
  let diff = eventTime - now;

  if(diff <= 0) {
    notifyEvent(event.name);
    if(event.recurring === 'daily') eventTime += 24*60*60*1000;
    else if(event.recurring === 'weekly') eventTime += 7*24*60*60*1000;
    else if(event.recurring === 'monthly') eventTime = new Date(new Date(eventTime).setMonth(new Date(eventTime).getMonth()+1)).getTime();
    else diff = 0;
    event.date = new Date(eventTime).toISOString();
    saveEvents();
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  element.textContent = diff > 0 ? `${days}d ${hours}h ${minutes}m ${seconds}s` : 'Event Now!';
}

function addEvent() {
  const name = eventNameInput.value.trim();
  const date = eventDateInput.value;
  const recurring = recurringSelect.value;

  if(!name || !date) return alert('Please enter event name and date');

  events.push({name, date, recurring});
  saveEvents();
  renderEvents();

  eventNameInput.value = '';
  eventDateInput.value = '';
}

function deleteEvent(index) {
  events.splice(index, 1);
  saveEvents();
  renderEvents();
}

// Notifications
function notifyEvent(name) {
  if(Notification.permission === 'granted') {
    new Notification(`Event Reminder`, { body: `${name} is happening now!` });
  }
}

// Request Notification Permission
if("Notification" in window && Notification.permission !== 'granted') {
  Notification.requestPermission();
}

// Event Listeners
addEventBtn.addEventListener('click', addEvent);

// Initial Render
renderEvents();
