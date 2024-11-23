// grabbing income value
const incomeAmount = document.querySelector("#income-input").value.trim();

//   grabbing input for expenses and creating a variable
const expenseAmount = document.querySelector("#expense-input").value.trim();
// grabbing description and storing it in variable
const description = document.getElementById("message").value.trim();
//  calculating for total budget,
const budget = incomeAmount - expenseAmount;
const totalIncome = incomeAmount;

  // event handler for pressing submit data button
  document.querySelector(".btn").addEventListener("click", function () {
    const incomeAmount = document.querySelector("#income-input").value.trim();
    console.log(incomeAmount);
    //   const expenseAmount = document.querySelector("#expense-input").value.trim();
    //   const description = document.getElementById("message").value.trim();
    // what i want to be output on the table, storing as variable
    const rowItem = `<tr><td>${amount}</td><td>${description}</td></tr>`;
    document.querySelector(".content-table").textContent = rowItem;
  });



// function calcIncome() {
//     const totalIncome += incomeAmount;
// }
// function calcExpense(){}

//  Budget class with properties and methods to handle income, expenses, and total budget.
class Budget {
  constructor(income, expense, description) {
    this.income = document.querySelector("#income-input").value.trim();

    this.expense = document.querySelector("#expense-input").value.trim();

    this.description = document.getElementById("message").value.trim();
  }
  // error handling for invalid input
  error() {
    if (!amount && !description) {
      alert("Please insert valid input");
      return;
    }
  }

}
// Encapsulate the budget-related functionality within the Budget class.
// Utilize object-oriented programming principles such as encapsulation, inheritance, or polymorphism in your implementation.

document.querySelector("#updateInc").textContent = 
// updateExp 
