const principalInput = document.getElementById("principal");
const rateInput = document.getElementById("rate");
const yearsInput = document.getElementById("years");
const monthlyInput = document.getElementById("monthly");
const totalInvestmentEl = document.getElementById("totalInvestment");
const totalGainEl = document.getElementById("totalGain");
const ttotalGainEl = document.getElementById("ttotalGain");
const calculateBtn = document.getElementById("calculate");


function calculateInvestment() {
  const P = parseFloat(principalInput.value);
  const r = parseFloat(rateInput.value) / 100;
  const n = 12; // monthly compounding
  const t = parseFloat(yearsInput.value);
  const monthly = parseFloat(monthlyInput.value);

  // Compound interest + monthly contributions
  let total = P;
  let dataPoints = [total];
  for (let i = 1; i <= t * 12; i++) {
    total = total * (1 + r / n) + monthly;
    if (i % 12 === 0) dataPoints.push(total.toFixed(2));
  }

  const gain = total - P - monthly * t * 12;

  totalInvestmentEl.textContent = (P + monthly * t * 12).toFixed(2);
  ttotalGainEl.textContent = gain.toFixed(2);
  totalGainEl.textContent = total.toFixed(2);
  

 }
calculateBtn.addEventListener("click", calculateInvestment);

// Initial calculation
calculateInvestment();
