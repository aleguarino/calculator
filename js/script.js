const numbersButtons = document.querySelectorAll('[data-number]');
const screen = document.querySelector('.screen');
const operatorsButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.querySelector('.clear-button');
const equalsButton = document.querySelector('.equals-button');

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const expression = /\+|\x|\-|\//;

let lastButtonPressed;
let numberA;
let numberB;
let operator;

function appendNumber(element) {
    if (screen.textContent === '0' || screen.textContent === 'NaN') {
        screen.textContent = element.target.textContent;
    } else {
        screen.textContent += element.target.textContent;
    }
    lastButtonPressed = 'number';
}

function appendOperator(element) {
    evaluate();
    if (screen.textContent !== 'NaN') {
        screen.textContent += element.target.textContent;
    }
    lastButtonPressed = 'operator';
}

function operate(numberA, numberB, operator) {
    switch (operator) {
        case '+':
            return add(numberA, numberB);
        case '-':
            return subtract(numberA, numberB);
        case 'x':
            return multiply(numberA, numberB);
        case '/':
            return (numberB === 0) ? 'NaN' : divide(numberA, numberB);
    }
}

function evaluate() {
    let operation = screen.textContent;
    let numbersArr = operation.split(expression);
    if (numbersArr.length > 1) {
        let operator = operation.match(expression)[0];
        screen.textContent = operate(Number(numbersArr[0]), Number(numbersArr[1]), operator);
    }
}

numbersButtons.forEach(item => {
    item.addEventListener('click', appendNumber);
});

operatorsButtons.forEach(item => {
    item.addEventListener('click', appendOperator);
});

clearButton.addEventListener('click', () => {
    screen.textContent = '0';
});

equalsButton.addEventListener('click', evaluate);