function add(num1, num2) {
    return +num1 + +num2;
}

function subtract(num1,num2) {
    return (+num1)-(+num2);
}

function multiply(num1, num2) {
    return (+num1)*(+num2);
}

function divide(num1,num2) {
    if (num2 == 0) {
        alert('Cannot divide by 0');
        return "Cannot divide by zero";
    }
    return (+num1)/(+num2);
}

function mod(num1, num2) {
    return (+num1)%(+num2);
}

function operate(num1, num2, operation) {
    let result = "";
    if (operation == "+") {
        return (`${add(num1,num2)}`);
    }
    else if (operation == "-") {
        return (`${subtract(num1,num2)}`);
    }
    else if (operation == "*") {
        return (`${multiply(num1,num2)}`);
    }
    else if (operation == "÷") {
        return (`${divide(num1,num2)}`);
    }
    else if (operation == "%") {
        return (`${mod(num1,num2)}`);
    }
}

//Update display
let previousValue ="";
let currentValue ="";
let operator = "";
let currentDisplay = "";

const buttons = document.querySelectorAll('.number');
//Updates currentDisplay and currentValue
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (operator != "" && previousValue == "") {
            previousValue = currentValue;
            currentValue = "";
            currentDisplay.textContent = "";
        }
        currentDisplay = document.querySelector('.current-operation');
        currentDisplay.textContent +=button.textContent;
        currentValue = currentDisplay.textContent;
    })
});

// Event listener for operator buttons
const opButtons = document.querySelectorAll('.data-operator');
opButtons.forEach(opBtn => {
    opBtn.addEventListener('click', () => {
        // Check if there's an existing operator and values are available
        // If there is, calculate the value and update operator
        if (operator != "" && previousValue != "" && currentValue != "") {
            let result = operate(previousValue, currentValue, operator);
            currentDisplay.textContent = result;
            currentValue = result;
            previousValue = "";
        }
        // Update the operator
        operator = opBtn.textContent;
    });
});

// Separate event listener for the equal button
const equalBtn = document.querySelector(".data-equal");
equalBtn.addEventListener('click', () => {
    if (previousValue != "" && currentValue != "" && operator != "") {
        let result = operate(previousValue, currentValue, operator);
        currentDisplay.textContent = result;
        currentValue = result;
        previousValue = "";
        operator = "";  // Clear the operator after calculation
    }
});

const clearBtn = document.querySelector('.AC-btn');
clearBtn.addEventListener('click', ()=> {
    currentDisplay.textContent = "";
    currentValue = "";
    previousValue = "";
    operator = "";
});

const decBtn = document.querySelector('.decimal-btn');
decBtn.addEventListener('click', ()  => {
    if (currentValue.includes('.')) {
    }
    else {
        currentDisplay.textContent+= '.';
        currentValue = currentDisplay.textContent;
    }
});







