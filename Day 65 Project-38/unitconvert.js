const units = {
  length: ["m","km","cm"],
  weight: ["kg","g","lb"],
  temperature: ["C","F","K"],
  speed: ["m/s","km/h","mph"]
};

const conversion = {
  length: (value, from, to) => {
    const map = {m:1, km:1000, cm:0.01};
    return value * map[from]/map[to];
  },
  weight: (value, from, to) => {
    const map = {kg:1, g:0.001, lb:0.453592};
    return value * map[from]/map[to];
  },
  temperature: (value, from, to) => {
    if(from === to) return value;
    let c;
    if(from === "C") c=value;
    else if(from==="F") c=(value-32)/1.8;
    else c=value-273.15;
    if(to==="C") return c;
    else if(to==="F") return c*1.8+32;
    else return c+273.15;
  },
  speed: (value, from, to) => {
    const map = { "m/s":1, "km/h":1/3.6, "mph":0.44704 };
    return value * map[from]/map[to];
  }
};

const categorySelect = document.getElementById('category');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const inputValue = document.getElementById('inputValue');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');

function updateUnits(){
  const selected = categorySelect.value;
  fromUnit.innerHTML = '';
  toUnit.innerHTML = '';
  units[selected].forEach(u=>{
    const option1 = document.createElement('option');
    option1.value = u; option1.textContent=u;
    fromUnit.appendChild(option1);
    const option2 = document.createElement('option');
    option2.value = u; option2.textContent=u;
    toUnit.appendChild(option2);
  });
}

categorySelect.addEventListener('change', updateUnits);

convertBtn.addEventListener('click', ()=>{
  const cat = categorySelect.value;
  const value = parseFloat(inputValue.value);
  const from = fromUnit.value;
  const to = toUnit.value;
  if(isNaN(value)) return alert('Enter a number!');
  const res = conversion[cat](value, from, to);
  result.textContent = `Result: ${res.toFixed(2)} ${to}`;
});

// Initialize
updateUnits();