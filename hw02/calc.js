(function () {
  "use strict";

  // define global variable to hold last calculation
  let CALCULATION = {term1:"", term2:"", operator:"", total:NaN};

  // clears the display and resets the calculation object. Called when user
  // click on the clear "C" button
  function clearDisplay() {
    CALCULATION.term1 = "";
    CALCULATION.term2 = "";
    CALCULATION.operator = "";
    CALCULATION.total = NaN;
    document.getElementById("display").innerHTML = 0;
  }

  // changes the display to the specified number
  function updateDisplay(num) {
    var displayNum = num;
    if (typeof(num) === "number" && num.toString().length > 16) {
      console.log(typeof(num));
      var precisionNum = 16;
      displayNum = num.toPrecision(precisionNum);
      console.log("num type is " + typeof(num));
      console.log("diplay num type is " + typeof(displayNum));
      while (displayNum.length > 16) {
        console.log(typeof(num));
        displayNum = num.toPrecision(precisionNum);
        precisionNum = precisionNum-1;
      }
    }
    document.getElementById("display").innerHTML = displayNum;
  }

  // updates the display after user clicks a number button
  function updateNumber() {
    var digit = this.innerHTML;

    // update the number displayed
    var displayString = document.getElementById("display").innerText;
    // current display is 0
    if (displayString === "0") {
      updateDisplay(digit);
    }
    // trying to add decimal when current display already has decimal
    else if (digit === "." && CALCULATION.term2.indexOf(".") > -1) {
      console.log("trying to add decimal");
      console.log(CALCULATION.term2);
      return;
    }
    // safe to lengthen the number
    else {
      updateDisplay(displayString + digit);
    }

    // update the number in the CALCULATION object
    if (CALCULATION.operator === "") {
      CALCULATION.term1 += digit;
    } else {
      CALCULATION.term2 += digit;
      updateDisplay(CALCULATION.term2);
    }
  }

  function calculate() {
    var clickedOperator = this.innerHTML;
    var mathOperator = "";
    // change the operator string to valid mathematical operator
    switch(clickedOperator) {
      case "+/=":
        mathOperator = "+";
        break;
      case "-":
        mathOperator = "-";
        break;
      case "x":
        mathOperator = "*";
        break;
      case "÷":
        mathOperator = "/";
        break;
      default:
        throw "something went wrong";
    }

    // operator not yet input (first round)
    if (CALCULATION.operator === "") {
      CALCULATION.operator = mathOperator;
    }
    // ready to calculate total
    else if (CALCULATION.operator !== "" && CALCULATION.term2 !== "") {
      var calcString = CALCULATION.term1 + CALCULATION.operator + CALCULATION.term2;
      // console.log("calc string is: " + calcString);
      CALCULATION.total = eval(calcString);
      updateDisplay(CALCULATION.total);
      CALCULATION.term1 = CALCULATION.total;
      CALCULATION.term2 = "";
      CALCULATION.operator = mathOperator;
    }
    // previous button click was "+/="
    else if (CALCULATION.operator === "+" && CALCULATION.term2 === "") {
      CALCULATION.operator = mathOperator;

    }
  }

  function init() {
    document.getElementById("display").innerHTML = 0;

    // add event listener for clear button
    document.getElementById("clear_btn").onclick = clearDisplay;

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

  window.addEventListener("load", init, false);

}) ();