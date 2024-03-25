document.addEventListener("DOMContentLoaded", function() {
    const screen = document.getElementById('screen');
    const buttons = document.querySelectorAll('.btn');

    let currentOperand = '';
    let previousOperand = '';
    let operation = undefined;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.innerText === 'C') {
                clear();
            } else if (button.innerText === '=') {
                compute();
            } else if (button.innerText === '.') {
                appendDecimal();
            } else if (isNumber(button.innerText)) {
                appendNumber(button.innerText);
            } else {
                chooseOperation(button.innerText);
            }
            updateDisplay();
        });
    });

    function appendNumber(number) {
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand += number;
    }

    function chooseOperation(op) {
        if (currentOperand === '' && op === '-') {
            appendNumber(op);
        } else if (currentOperand === '') {
            return;
        } else if (previousOperand !== '') {
            compute();
        }
        operation = op;
        previousOperand = currentOperand;
        currentOperand = '';
    }

    function compute() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        currentOperand = computation;
        operation = undefined;
        previousOperand = '';
    }

    function clear() {
        currentOperand = '';
        previousOperand = '';
        operation = undefined;
    }

    function appendDecimal() {
        if (currentOperand.includes('.')) return;
        currentOperand += '.';
    }

    function updateDisplay() {
        screen.innerText = currentOperand;
    }

    function isNumber(value) {
        return /^\d+(\.\d+)?$/.test(value);
    }
});