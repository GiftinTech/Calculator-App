//To eval expressions manually:
//capture user input
//store numbers and operators in an array
//process the input using basic arithmetic operators

//JS Logic
//Select the input el
//curent num input
// num and op array

let userInput = document.getElementById("input")
let currentInput = ""
let operationArr = []

//functions
//1. append number/op
function appendChar(character) {
    //console.log('btn clicked')
    if (operationArr.length === 1 && currentInput === "") {
        operationArr = []
    }

    if(['+', '-', '*', '/', '%'].includes(character)) {
        if(currentInput) {
            operationArr.push(parseFloat(currentInput));
            currentInput = ""
        }
        const lastItem = operationArr[operationArr.length - 1]
        if(['+', '-', '*', '/', '%'].includes(lastItem)) {
            operationArr.pop()
        }
        operationArr.push(character)
    } else {
        currentInput += character
    }
    updateInput()
} 
//2. clear input
function cancelChar() {
    currentInput = ""
    operationArr = []
    updateInput()
}

function del() {
    //console.log('del clicked')
    //currentInput = currentInput.slice(0, -1)
    //operationArr = operationArr.splice(0, operationArr.length - 1)
    if (currentInput) {
        currentInput = currentInput.slice(0, -1)
    } else if (operationArr.length > 0) {
        operationArr.pop()
    }
    updateInput()
}
//3. calc result
function equalsTo() {
    //console.log('equals clicked')
    if (currentInput) {
        operationArr.push(parseFloat(currentInput))
        currentInput = ""
    }

    let result = operationArr[0]

    for (let i = 1; i < operationArr.length; i += 2) {
        const op = operationArr[i]
        const nextNum = operationArr[i + 1]

        if (nextNum === undefined) return;

        switch(op) {
            case '+':
                result += nextNum;
                break;
            case '-':
                result -= nextNum;
                break;
            case '*':
                result *= nextNum;
                break;
            case '/':
                if (nextNum === 0) {
                    operationArr = []
                    //currentInput = ""
                    userInput.value = "Error"
                    return;
                } else {
                    result /= nextNum;
                }
                break;
            case '%':
                if (nextNum === 0) {
                    operationArr = []
                    //currentInput = ""
                    userInput.value = "Error"
                    return;
                } else {
                    result %= nextNum;
                }
                break;
            default:
                console.error(`Unknown operator: ${op}`)
                break;
        }
    }
    operationArr = [result]

    updateInput()
}

console.log("Operation Array:", operationArr);
//5. update display
function updateInput() {
    userInput.value = operationArr.join(" ") + (currentInput ? " " + currentInput : "")

    
// Remove blinking placeholder if input

const placeholderText = document.querySelector('.placeholder-text');
if (placeholderText) {
    if (operationArr.length === 0 && currentInput === "") {
        placeholderText.style.display = 'block'
    } else {
        placeholderText.style.display = 'none'
    }
    }
}


   