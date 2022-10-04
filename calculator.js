/*
code help from
https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98/
*/
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calcKeys');
const display = document.querySelector('.calcDisplay');

const calculate = (n1, operator, n2) => {
    num1 = parseFloat(n1);
    num2 = parseFloat(n2);
    if (operator === 'add') return num1 + num2;
    if (operator === 'subtract') return num1 - num2;
    if (operator === 'multiply') return num1 * num2;
    if (operator === 'divide') return num1 / num2;
}

keys.addEventListener('click', e => {
    if(e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
    
        //number
        if (!action) {
            if (displayedNum === '0' ||
                calculator.dataset.previousKeyType === 'operator') {
                display.textContent = keyContent;
            } else if (calculator.dataset.previousKeyType === 'calculate') {
                display.textContent = keyContent;
                calculator.dataset.firstValue = '';
            } else {
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';
        }

        //set clear to CE
        if (action !== 'clear') {
            const clearBtn = calculator.querySelector('[data-action=clear]');
            clearBtn.textContent = 'CE';
        }

        //decimal
        if (action === 'decimal') {
            if (!displayedNum.includes('.') &&
                calculator.dataset.previousKeyType !== 'operator') {
                display.textContent = displayedNum + '.';
            } else if (calculator.dataset.previousKeyType === 'operator' ||
                calculator.dataset.previousKeyType === 'calculate') {
                display.textContent = '0.';
            }
            calculator.dataset.previousKeyType = 'decimal';
        }

        //operator
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            //multiple operations
            if (firstValue &&
                operator &&
                calculator.dataset.previousKeyType !== 'operator' &&
                calculator.dataset.previousKeyType !== 'calculate' &&
                calculator.dataset.previousKeyType !== 'clear') {
                const calcVal = calculate(firstValue, operator, secondValue);
                display.textContent = calcVal;
                //update firstvalue to be the calculated value
                calculator.dataset.firstValue = calcVal;
            } else {
                //no calculation, update firstVal to be displayedNum
                calculator.dataset.firstValue = displayedNum;
            }
            key.classList.add('is-depressed');
            //add custom attribute
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;
        }
        //clear
        if (action === 'clear') {
            //if key is AC, clear all memory
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = '';
                calculator.dataset.modValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.previousKeyType = '';
            } else {
                key.textContent = 'AC';
            }
            display.textContent = 0;
            calculator.dataset.previousKeyType = 'clear';
        }

        //calculate
        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayedNum;
            if (firstValue) {
                if (calculator.dataset.previousKeyType === 'calculate') {
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modValue;
                }
                
              display.textContent = calculate(firstValue, operator, secondValue)
            }
            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = 'calculate';
        }

        //remove is-depressed class from all keys
        if (calculator.dataset.previousKeyType != 'operator') {
            Array.from(key.parentNode.children)
                .forEach(k => k.classList.remove('is-depressed'));
        }
    }
})