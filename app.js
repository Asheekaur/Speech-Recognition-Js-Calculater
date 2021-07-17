const display1Element = document.querySelector(".display-1");
const display2Element = document.querySelector(".display-2");
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
