class Budget {
  constructor() {
    this.incomes = [];
    this.expense = [];
  }
  // making a function that adds the income input into the empty array
  addIncome(description, amount) {
    if (description && amount > 0) {
      this.incomes.push({ description, amount });
    } else {
      // error handling
      throw new error("Invalid input. Description and amount must be valid");
    }
  }
  // add expense with description and amount
  addExpense(description, amount) {
    if (description && amount > 0) {
      this.expense.push({ description, amount });
    }
  }
  // calculate total income
  getTotalIncome() {
    return this.incomes.reduce((total, item) => total + item.amount, 0);
  }
  getTotalExpense() {
    // .reduce() reduces elements in array to single value. sums all values in array and returns total.
    // function is provided to tell reduce how to combine the elements ((total, item)=> total + item.amount, 0)
    return this.expense.reduce((total, item) => total + item.amount, 0);
  }

  getTotalBudget() {
    // subtracts final calculations from input and expenses to come up with total budget.
    return this.getTotalIncome() - this.getTotalExpense();
  }
}
// for html dom

class BudgetUI {
  constructor() {
    this.budget = new Budget();
    this.incomeInput = document.querySelector("#income-input").value.trim();
    this.expenseInput = document.querySelector("#expense-input").value.trim();
    this.descriptionInput = document.getElementById("message").value.trim();
    this.submitButton = document.querySelector(".btn");
    this.tableBody = document.querySelector("content-table tbody");
    this.totalIncomeDisplay = document.querySelector("#updateInc");
    this.totalExpenseDisplay = document.querySelector("#updateExp");
    this.budgetDisplay = document.querySelector("#updatebal");
    // this.init() is  a function that will initialize event listener
    this.init();
  }

  init() {
    // making an event listener for submit button
    // handleSubmit is a function that will handle this conversion for inputs into numbers.
    this.submitButton.addEventListener("click", () => this.handleSubmit());
  }
  // calling on handlesubmit function to convert input into numbers/ handle form submission
  handleSubmit() {
    const incomeValue = parseFloat(this.incomeInput.value) || 0;
    const expenseValue = parseFloat(this.expenseInput.value) || 0;
    const descriptionValue = this.descriptionInput.value.trim();

    //  try catch is error handling "we are going to try to do this if statement, but if it doesnt work throw error message"
    try {
      if (incomeValue > 0) {
        this.budget.addIncome(descriptionValue, incomeValue);
        // addrowtotable is another function. this function adds rows to tables but will be inserted later.
        this.addRowToTable(descriptionValue, incomeValue, "income");
      } else if (expenseValue > 0) {
        this.budget.addExpense(descriptionValue, expenseValue);
        this.addRowToTable(descriptionValue, -expenseValue, "expense");
      } else {
        throw new Error("Please provide a valid income or expense value.");
      }

      this.updateSummary();
      this.clearInputs();
    } catch (error) {
      alert(error.message); //displays validation error
    }
  }
  // add new row to table
  addRowToTable(description, amount, type) {
    const newRow = document.createElement("tr");
    // ternary operator that plays with output styling
    const amountStyle = type === "income" ? "color:green;" : "color: red;";
    // tofixed returns a string repesenting a number in a fixed-point notation
    // printing new rows with inputted information into the html table on the dom
    newRow.innerHTML = `
      
      <td style="${type === "income" ? amountStyle : ""}">${
      type === "income" ? `${amount.toFixed(2)}` : ""
    }</td>

        <td style="${type === "expense" ? amountStyle : ""}">${
      type === "expense" ? `${Math.abs(amount).toFixed(2)}` : ""
    }</td>
        <td>${description}</td>
        `;
    // appends all newrow infor onto the html table/ new rows that we created
    this.tableBody.appendChild(newRow);
  }
  // updates summary section dynamically
  updateSummary() {
    //  calling the functions that calculate  totals and stopring them as variables
    const totalIncome = this.budget.getTotalIncome();
    const totalExpense = this.budget.getTotalExpense();
    const TotalBudget = this.budget.getTotalBudget();

    //  html output for summary class
    this.totalIncomeDisplay.textContent = totalIncome.toFixed(2);
    this.totalExpenseDisplay.textContent = totalExpense.toFixed(2);
    this.budgetDisplay.textContent = totalBudget.toFixed(2);
  }
  // clearing input fields
  clearInputs() {
    this.incomeInput.value = "";
    this.expenseInput.value = "";
    this.descriptionInput.value = "";
  }
}

// intialize the budget app
// loads newRow.innerhtml to the dom and initializes new BudgetUI class.
document.addEventListener("DOMContentLoaded", () => {
  new BudgetUI();
});
