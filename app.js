let display1Element = document.querySelector(".display-1");
let display2Element = document.querySelector(".display-2");
const tempResult = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".all-clear");
const clearLast = document.querySelector(".last-entity-clear");

let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbers.forEach(number => {
    number.addEventListener("click", e => {
        if (e.target.innerText === "." && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === "." && haveDot) {
            return;
        }
        dis2Num += e.target.innerText;
        display2Element.innerText = dis2Num;
        console.log(dis2Num);
    })
})
operations.forEach(operation => {
    operation.addEventListener("click", e => {
        if (!dis2Num) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if (dis1Num && dis2Num && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName);
        lastOperation = operationName;
        console.log(dis2Num);
    })
});
function clearVar(name = "") {
    dis1Num += dis2Num + " " + name + " ";
    display1Element.innerText = dis1Num;
    display2Element.innerText = " ";
    dis2Num = " ";
    tempResult.innerText = result;
}
function mathOperation() {
    if (lastOperation === "x") {
        result = parseFloat(result) * parseFloat(dis2Num);
    }
    else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(dis2Num);
    }
    else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(dis2Num);
    }
    else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(dis2Num);
    }
    else if (lastOperation === "%") {
        result = parseFloat(result) % parseFloat(dis2Num);
    }
}
equal.addEventListener("click", e => {
    if (!dis1Num || !dis2Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display2Element.innerText = result;
    tempResult.innerText = "";
    dis2Num = result;
    dis1Num = "";
})
clear.addEventListener("click", e => {
    display1Element.innerText = "0";
    display2Element.innerText = "0";
    dis1Num = "";
    dis2Num = "";
    result = "";
    tempResult.innerText = "0";
})
clearLast.addEventListener("click", e => {
    display2Element.innerText = "";
    dis2Num = "";
})
// Through keyboard
window.addEventListener("keydown", e => {
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "."
    ) {
        clickButton(e.key);
    }
    else if (
        e.key === "+" ||
        e.key === "-" ||
        e.key === "/" ||
        e.key === "%"
    ) {
        clickOperation(e.key);
    }
    else if (e.key === "*") {
        clickOperation("x");
    }
    else if (e.key == "Enter" || e.key === "=") {
        clickEqual();
    }
})
function clickButton(key) {
    numbers.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    })
}
function clickOperation(key) {
    operations.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    })
}
function clickEqual() {
    equal.click();
}
// Through microphone
let microphone = document.querySelector(".icon");
let results = document.getElementById("result");
microphone.onclick = function () {
    display1Element.style.display = "none";
    tempResult.style.display = "none";
    microphone.classList.add("record");
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    operation = {
        "plus": "+",
        "minus": "-",
        "multiply": "*",
        "multiplied": "*",
        "divide": "/",
        "divided": "/",
        "reminder": "%"
    }
    recognition.onresult = function (event) {
        let input = event.results[0][0].transcript;
        console.log(input);
        for (property in operation) {
            input = input.replace(property, operation[property]);
        }
        display2Element.innerText = input;
        setTimeout(function () {
            evaluate(input);
        }, 2000);
        microphone.classList.remove("record");
    }
}
function evaluate(input) {
    try {
        let result = eval(input);
        display2Element.innerText = result;
    }
    catch (e) {
        alert("It's not a mathematical");
    }
    display1Element.style.display = "block";
    tempResult.style.display = "block";
}