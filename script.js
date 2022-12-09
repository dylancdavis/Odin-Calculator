const calcButtons = document.querySelectorAll('.calcButton');
const screenText = document.querySelector(".screenText")

let currentNum = 0;
let currentOperator = null;
let isNewNumber = false;

calcButtons.forEach(b => {
    b.addEventListener('mousedown', (e) => {
        e.target.style.backgroundColor = "rgb(139, 148, 148)"
        e.target.style.border = "border: 2px inset white"
    })
    b.addEventListener('mouseup', (e) => {
        e.target.style.backgroundColor = "rgb(96, 103, 103)" 
        e.target.style.border = "border: 2px outset black"
    
    b.addEventListener('click', handleButtonPress)
    })
})

function handleButtonPress(e) {
    let b = e.target
    console.log("handling " + b.textContent)
    // Case: number pressed
    if (b.textContent < 10) {
        handleNum(parseInt(b.textContent))
    } else
    if (b.textContent == "C") {
        clearCalculator()
    } else
    if (b.textContent == "=") {
        computeNum();
    } else {
        currentNum = parseInt(screenText.textContent);
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
    currentNum = 0;
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
    screenText.textContent = currentNum;
    currentOperator = null;
}