var $ = function (id) {
    return document.getElementById(id);
};

//actions to perform on load
window.onload = function () {
    //event handlers
    document.getElementById("calc").addEventListener("change", calcSelector);
    document.getElementById("budgetBtn").addEventListener("click", budgetCalc);
    document.getElementById("interestBtn").addEventListener("click", interestCalc);
    document.getElementById("loanBtn").addEventListener("click", loanCalc);
};

/*the following function enables the appropriate calculator based on user choice*/
function calcSelector() {

    /*displaying the approriate selected options and hiding the others*/
    var temp = document.getElementById("calc").value
    if (temp == "budget") {
        document.getElementById("budgetCalc").style.display = "block";
        document.getElementById("interestCalc").style.display = "none";
        document.getElementById("loanCalc").style.display = "none";
    } else if (temp == "interest") {
        document.getElementById("budgetCalc").style.display = "none";
        document.getElementById("interestCalc").style.display = "block";
        document.getElementById("loanCalc").style.display = "none";
    } else {
        document.getElementById("budgetCalc").style.display = "none";
        document.getElementById("interestCalc").style.display = "none";
        document.getElementById("loanCalc").style.display = "block";
    }

}

/*checks if you are spending more than your income or not*/
function budgetCalc() {
    /*getting all the values from the form data*/
    var income = parseInt(document.getElementById("income").value);
    var rent = parseInt(document.getElementById("rent").value);
    var food = parseInt(document.getElementById("food").value);
    var utilities = parseInt(document.getElementById("utilities").value);
    var other = parseInt(document.getElementById("other").value);

    /*calculating total spending*/
    var total = rent + food + utilities + other;
    if (total < income) {
        document.getElementById("budgetResult").innerHTML = "Yay! You are currently under the budget and still have $" + (income - total) + " spare. Tip: put it in a savings account for a rainy day. :)";
    } else {
        document.getElementById("budgetResult").innerHTML = "Uh-oh! You are currently exceeding your budget by $" + (total - income) + ". Tip: Use the money that you have saved overtime.";
    }
}

/*computes total amount to be paid after interest*/
function interestCalc() {
    /*getting all the values from the form data*/
    var amount = document.getElementById("amount").value;
    var interestRate = document.getElementById("rate").value;
    var time = document.getElementById("months").value;

    /*using I = prt formula*/
    var total = amount * (interestRate / 100) * (time / 12)
    document.getElementById("interestResult").value = total;
}

/*computes monthly payment for a loan*/
function loanCalc() {
    /*getting all the values from the form data*/
    var amount = document.getElementById("lnAmount").value;
    var interestRate = document.getElementById("lnRate").value;
    var time = document.getElementById("lnYears").value;

    /*calculating interest + the initial amount owed*/
    var total = amount + (amount * (interestRate / 100) * (time));
    document.getElementById("monthPay").value = total;
}
