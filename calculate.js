const display = document.getElementById("display");

let currentNum = "";
let previousNum = "";
let operator = null;

function UpdateScreen() {
  display.value = currentNum || "0";
}

function handleNumber(value) {
  if (value === "." && currentNum.includes(".")) return;
  currentNum += value;
  UpdateScreen();
}

function handleOperator(op) {
  if (currentNum === "") return;
  if (previousNum !== "") calculate();
  operator = op;
  previousNum = currentNum;
  currentNum = "";
}

function calculate() {
  let result;
  const prev = parseFloat(previousNum);
  const current = parseFloat(currentNum);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        display.value = "Ошибка";
        reset();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }
  currentNum = String(result);
  previousNum = "";
  operator = null;
  UpdateScreen();
}

function reset() {
  currentNum = "";
  previousNum = "";
  operator = null;
  UpdateScreen();
}

document.querySelectorAll("[data-num]").forEach((btn) => {
  btn.addEventListener("click", () => handleNumber(btn.textContent));
});

document.querySelectorAll("[data-op]").forEach((btn) => {
  btn.addEventListener("click", () => handleOperator(btn.textContent));
});

document.getElementById("equals").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", reset);
