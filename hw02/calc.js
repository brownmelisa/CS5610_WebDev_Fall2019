(function () {
  "use strict";

  // define global variable to hold last calculation
  let CALCULATION = {term1:"", term2:"", operator:"", total:NaN};

  // function addNum(currentValue, num1) {
  //   newValue = currentValue + num1;
  //   updateValue(newValue);
  // }
  //
  // function subtractNum(currentValue, num1) {
  //   newValue = currentValue - num1;
  //     updateValue(newValue);
  // }

  // clears the display and resets the calculation object. Called when user
  // click on the clear "C" button
  function clearDisplay() {
    CALCULATION.term1 = "";
    CALCULATION.term2 = "";
    CALCULATION.operator = "";
    CALCULATION.total = NaN;
    document.getElementById("display").innerHTML = 0;
  }

  function updateDisplay(num) {
    document.getElementById("display").innerHTML = num;
  }

  function updateNumber() {
    var digit = this.innerHTML;

    // update the number displayed
    var displayObj = document.getElementById("display");
    if (displayObj.innerHTML === "0") {
      displayObj.innerHTML = digit;
    } else {
      displayObj.innerHTML += digit;
    }

    // update the number in the CALCULATION object
    if (CALCULATION.operator === "") {
      CALCULATION.term1 += digit;
    }
    else {
      CALCULATION.term2 += digit;
      displayObj.innerHTML = CALCULATION.term2;
    }
  }

  function calculate() {
    var clickedOperator = this.innerHTML;
    var mathOperator = "";
    // change the operator string to valid mathematical operator
    switch(clickedOperator) {
      case "+/=":
        console.log("plus");
        mathOperator = "+";
        break;
      case "-":
        console.log("minus");
        mathOperator = "-";
        break;
      case "x":
        console.log("multiply");
        mathOperator = "*";
        break;
      case "÷":
        console.log("divide");
        mathOperator = "/";
        break;
      default:
        throw "something went wrong";
    }

    // check if operator already exists
    if (CALCULATION.operator === "") {
      CALCULATION.operator = mathOperator;
    }
    else if (CALCULATION.term2 !== "") {
      var calcString = CALCULATION.term1 + CALCULATION.operator + CALCULATION.term2;
      CALCULATION.total = eval(calcString);
      updateDisplay(CALCULATION.total);
      CALCULATION.term1 = CALCULATION.total;
      CALCULATION.operator = CALCULATION.mathOperator;
    }
  }

  function init() {
    document.getElementById("display").innerHTML = 0;

    // add event listener for clear button
    document.getElementById("clear_btn").onclick = clearDisplay;
    // var clear = document.getElementById("btn_clear");
    // clear.addEventListener("click", updateDisplay);

    // add event listener for each of the number buttons
    var numbers = document.getElementsByClassName("num_btn");
    var num_numbers = numbers.length;
    for (var i = 0; i < num_numbers; i++) {
      numbers[i].addEventListener("click", updateNumber, false);
    }

    // add event listener for each of the math buttons
    var maths = document.getElementsByClassName("math_btn");
    var num_maths = maths.length;
    for (var j = 0; j < num_maths; j++) {
      maths[j].addEventListener("click", calculate, false);
    }
  }

  //The window object calls the function:
  window.addEventListener("load", init, false);
}) ();



// use toPrecision() to return a string with a number written with a specified length
// parseFloat() and parseInt()


// multiple and divide to get an exact number
// var x = 0.1;
// var y = 0.2;
// var z = (x * 10 + y * 10) / 10;