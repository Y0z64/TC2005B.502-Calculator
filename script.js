let operation = "";

function addToOperationsBox(prop, component) {
  if (/^[0-9().]$/.test(prop)) {
    operation += prop;
  } else {
    operation += " " + prop + " ";
  }

  // Remove extra operators
  operation = operation.replace(/\s*([+*-\/])\s+/g, " $1 ");
  component.value = operation;
}

function resolve(component) {
  let currentOperation = component.value;
  // In case we need a history of operations
  addHistory(currentOperation, operationsBox);

  if (currentOperation === "") {
    component.innerText("Nothing here");
    return;
  }

  currentOperation = currentOperation.replace(/x/g, "*");
  currentOperation = currentOperation.replace(/\^/g, "**");
  const result = eval(currentOperation);

  // In case we need a history of values
  // operationHistory.push(String(result))
  operation = String(result);
  component.value = result;
}

function cancel(component) {
  component.value = "";
  operation = "";
}

function addHistory(currentOperation, operationsBox) {
  let history = document.querySelector(".history");

  if (!history) {
    history = document.createElement("div");
    history.classList.add("history");
    wrapper.appendChild(history);
  }
  const historyButton = document.createElement("button");
  historyButton.classList.add("history-button");
  historyButton.innerText = currentOperation;
  history.appendChild(historyButton);

  historyButton.onclick = function () {
    operationsBox.value = historyButton.innerText;
    operation = historyButton.innerText;
    return false; 
  }
}

//HTML structure
const calculator = document.getElementById("calculator");
const operationsBox = document.createElement("textarea");
const operatorButtons = document.getElementsByClassName("operator-button");
const numberButtons = document.getElementsByClassName("calc-button");
const sendButton = document.getElementById("send");
const cancelButton = document.getElementById("cancel");
const wrapper = document.getElementById("wrapper");

//Content
operationsBox.classList.add("operations-box");
calculator.insertBefore(operationsBox, calculator.firstChild);

//Conections
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    if (
      button.id !== "cancel" &&
      button.id !== "send" &&
      (button.classList.contains("operator-button") ||
        button.classList.contains("calc-button"))
    ) {
      button.addEventListener("click", () => {
        addToOperationsBox(button.innerText, operationsBox);
      });
    }
  });
});

sendButton.onclick = function () {
  resolve(operationsBox);
  return false;
};

cancelButton.onclick = function () {
  cancel(operationsBox);
  return false;
};
