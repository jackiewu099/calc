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


let previousValue ="";
let currentValue ="";
let operator = "";
let currentDisplay = "";
let lastOperationWasEqual = false; // Checks if last operation was equal


//Updates currentDisplay and currentValue when you click a number button
const buttons = document.querySelectorAll('.number');
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
        lastOperationWasEqual = true;  // Set the flag to true after an equals operation
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
    if (lastOperationWasEqual) {
        // Reset the display and currentValue to '0.' if the last operation was equals
        currentDisplay.textContent = "0.";
        currentValue = "0.";
        lastOperationWasEqual = false;  // Reset the flag
    } else if (!currentValue.includes('.')) {
        currentDisplay.textContent += '.';
        currentValue = currentDisplay.textContent;
    }
});

const delBtn = document.querySelector('.DEL-btn');
delBtn.addEventListener('click', () => {
    currentValue = currentValue.slice(0, -1);
    currentDisplay.textContent = currentValue;
});

document.addEventListener('keydown', function(event) {
    const key = event.key;

    // Handle number keys
    if (!isNaN(key) && key !== ' ') {
        // Find the button with the corresponding number
        document.querySelectorAll('.number').forEach(button => {
            if (button.textContent === key) {
                button.click();
            }
        });
    } 
    // Handle operator keys
    else if (['+', '-', '*', '/'].includes(key)) {
        let operatorSymbol = key;
        if (key === '/') operatorSymbol = '÷'; // Map '/' to '÷'

        document.querySelectorAll('.data-operator').forEach(button => {
            if (button.textContent === operatorSymbol) {
                button.click();
            }
        });
    } 
    // Handle Enter key for equals
    else if (key === 'Enter') {
        equalBtn.click();
    }
    // Handle Backspace key for delete
    else if (key === 'Backspace') {
        delBtn.click();
    }
    // Handle Escape key for clear
    else if (key === 'Escape') {
        clearBtn.click();
    }
});









