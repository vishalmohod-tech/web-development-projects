let data = JSON.parse(localStorage.getItem('moodJournalData')) || {};

const calendarEl = document.getElementById('calendar');
const monthYearEl = document.getElementById('monthYear');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const modal = document.getElementById('modal');
const modalDate = document.getElementById('modalDate');
const moodBtns = document.querySelectorAll('.moodBtn');
const journalInput = document.getElementById('journalInput');
const saveBtn = document.getElementById('saveBtn');
const closeBtn = document.getElementById('closeBtn');
const deleteBtn = document.getElementById('deleteBtn');

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = '';

function renderCalendar(month, year){
  calendarEl.innerHTML='';
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1,0).getDate();
  monthYearEl.textContent = `${new Date(year,month).toLocaleString('default',{month:'long'})} ${year}`;
  
  // Blank days
  for(let i=0;i<firstDay;i++){
    const blank = document.createElement('div');
    calendarEl.appendChild(blank);
  }

  // Days
  for(let d=1; d<=daysInMonth; d++){
    const dayDiv = document.createElement('div');
    dayDiv.className='day';
    const dateStr = `${year}-${month+1}-${d}`;
    dayDiv.dataset.date=dateStr;
    dayDiv.innerHTML=`<div>${d}</div>`;
    
    // Mood display
    if(data[dateStr]?.mood){
      const moodEl = document.createElement('div');
      moodEl.className='mood';
      moodEl.textContent=data[dateStr].mood;
      dayDiv.appendChild(moodEl);
    }

    dayDiv.onclick=()=>openModal(dateStr);
    calendarEl.appendChild(dayDiv);
  }
}

function openModal(date){
  selectedDate=date;
  modal.style.display='flex';
  modalDate.textContent=date;
  journalInput.value=data[date]?.journal || '';
}

moodBtns.forEach(btn=>{
  btn.onclick=()=>{ data[selectedDate]={...data[selectedDate], mood:btn.textContent}; renderCalendar(currentMonth,currentYear);}
});

saveBtn.onclick=()=>{
  data[selectedDate]={...data[selectedDate], journal:journalInput.value, mood:data[selectedDate]?.mood || ''};
  localStorage.setItem('moodJournalData', JSON.stringify(data));
  renderCalendar(currentMonth,currentYear);
  modal.style.display='none';
}
deleteBtn.onclick = () => {
  if (data[selectedDate]) {
    delete data[selectedDate]; // delete the entire record for that date (mood + journal)
     localStorage.setItem('moodJournalData', JSON.stringify(data));
    journalInput.value = '';
    renderCalendar(currentMonth, currentYear);
    alert('Journal and mood deleted successfully!');
  }
  modal.style.display = 'none';
};
closeBtn.onclick=()=>{ modal.style.display='none'; }

prevMonthBtn.onclick=()=>{
  currentMonth--;
  if(currentMonth<0){ currentMonth=11; currentYear--;}
  renderCalendar(currentMonth,currentYear);
}

nextMonthBtn.onclick=()=>{
  currentMonth++;
  if(currentMonth>11){ currentMonth=0; currentYear++;}
  renderCalendar(currentMonth,currentYear);
}

// Initial render
renderCalendar(currentMonth,currentYear);