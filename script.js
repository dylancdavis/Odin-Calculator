const calcButtons = document.querySelectorAll('.calcButton');

const numButtons = document.querySelectorAll('.numButton')
const operatorButtons = document.querySelectorAll('.operatorButton')
const equalButton = document.querySelectorAll('.equalButton')
const clearButton = document.querySelectorAll('.clearButton')

const screenText = document.querySelector(".screenText")

let currentNum = null;
let currentOperator = null;
let isNewNumber = false;

// Add click handler to all buttons
calcButtons.forEach(b => {
    b.addEventListener('click', handleButtonPress)
})

// Function for adding bg color functionality
function addBackgroundColorListener(nodelist, colorDown, colorUp) {
    nodelist.forEach(b => {
        b.addEventListener('mousedown', (e) => {
            e.target.style.backgroundColor = colorDown
            e.target.style.border = "border: 2px inset white"
        })
        b.addEventListener('mouseup', (e) => {
            e.target.style.backgroundColor = colorUp
            e.target.style.border = "border: 2px outset black"
        })
    })
}

addBackgroundColorListener(numButtons, "rgb(131, 141, 141)", "rgb(96, 103, 103)")
addBackgroundColorListener(operatorButtons, "rgb(126, 120, 136)", "rgb(98, 94, 106)")
addBackgroundColorListener(equalButton, "rgb(125, 135, 125)", "rgb(96, 103, 96)")
addBackgroundColorListener(clearButton, "rgb(143, 133, 133)", "rgb(103, 96, 96)")


function handleButtonPress(e) {
    let b = e.target
    console.log("handling " + b.textContent)
    // Case: number pressed
    if (b.textContent < 10) {
        if (screenText.textContent.length < 10) {
            handleNum(parseInt(b.textContent))
        }
    } else
    if (b.textContent == "C") {
        clearCalculator()
    } else
    if (b.textContent == "=") {
        computeNum();
        let round = Math.round(currentNum*100)/100
        screenText.textContent = round;
    } else {
        if (currentNum == null) {
            currentNum = parseInt(screenText.textContent);
        } else {
            computeNum();
        }
        currentOperator = b.textContent
        isNewNumber = true;
    }
}

function handleNum(n) {
    if (isNewNumber) {
        console.log("new number triggered");
        isNewNumber = false;
        screenText.textContent = "0"
    }
    let currentNum = parseInt(screenText.textContent);
    let newNum = currentNum*10 + n
    screenText.textContent = newNum
}

function clearCalculator() {
    currentNum = null;
    screenText.textContent = "0"
}

function computeNum() {
    if (currentOperator == null) {
        return
    }
    let firstNum = currentNum;
    currentNum = parseInt(screenText.textContent);
    switch (currentOperator) {
        case "+":
            currentNum = firstNum+currentNum;
            break;
        case "-":
            currentNum = firstNum-currentNum;
            break;
        case "X":
            currentNum = firstNum*currentNum;
            break;
        case "/":
            currentNum = firstNum/currentNum;
            break;
        default:
            console.log("Error: unrecognized operator " + currentOperator);
            break;
    }
    currentOperator = null;
}