class Budget {
  constructor() {
    this.incomes = [];
    this.expenses = [];
  }

  // Add income with description and amount
  addIncome(description, amount) {
    if (description && amount > 0) {
      // pushes income and description into empty incomes array
      // parameters description and amount are called inside the .push method
      this.incomes.push({ description, amount });
    } else {
      // throw new error creates error message pop up.
      throw new Error(
        "Invalid income input. Description and amount must be valid."
      );
    }
  }

  // Add expense with description and amount
  addExpense(description, amount) {
    if (description && amount > 0) {
      this.expenses.push({ description, amount });
    } else {
      throw new Error("Invalid input. Description and amount must be valid.");
    }
  }

  // method Calculates total income
  getTotalIncome() {
    // .reduce to "combine" elements of an array
    return this.incomes.reduce((total, item) => total + item.amount, 0);
  }

  // method Calculates total expense
  getTotalExpense() {
    return this.expenses.reduce((total, item) => total + item.amount, 0);
  }

  // method Calculates the remaining budget
  getTotalBudget() {
    return this.getTotalIncome() - this.getTotalExpense();
  }
}

// UI Controller
class BudgetUI {
  constructor() {
    this.budget = new Budget();
    this.incomeInput = document.getElementById("income-input");
    this.expenseInput = document.getElementById("expense-input");
    this.descriptionInput = document.getElementById("message");
    this.submitButton = document.querySelector(".btn");
    this.tableBody = document.querySelector(".content-table tbody");
    this.totalIncomeDisplay = document.getElementById("updatedInc");
    this.totalExpenseDisplay = document.getElementById("updatedExp");
    this.budgetDisplay = document.getElementById("updatebal");
    this.init();
  }

  // Initialize event listeners
  init() {
    this.submitButton.addEventListener("click", () => this.handleSubmit());
  }

  // Handle form submission
  // parsefloat turns input into a number
  handleSubmit() {
    const incomeValue = parseFloat(this.incomeInput.value) || 0;
    const expenseValue = parseFloat(this.expenseInput.value) || 0;
    const descriptionValue = this.descriptionInput.value.trim();
    // income is add only if incomeValue is > 0
    // expense is add only if expenseValue is > 0
    // both can be added in the same submission if valid
    try {
      if (incomeValue > 0 || expenseValue > 0) {
        // Add income if valid
        if (incomeValue > 0) {
          this.budget.addIncome(descriptionValue, incomeValue);
          this.addRowToTable(descriptionValue, incomeValue, "income");
        }

        // Add expense if valid
        if (expenseValue > 0) {
          this.budget.addExpense(descriptionValue, expenseValue);
          this.addRowToTable(descriptionValue, -expenseValue, "expense");
        }

        this.updateSummary();
        this.clearInputs();
      } else {
        throw new Error("Please provide a valid income or expense value.");
      }
    } catch (error) {
      alert(error.message); // Display validation error
    }
  }

  // Add a new row to the table
  addRowToTable(description, amount, type) {
    // The Array.from() method is used to create a new array from things that behave like an array (this.tablebody.rows behaves like an array but is not. thats what were converting) so that we can use the metod .find(), which locates the specific row and checks aginst the conditions we created
    // finds an existing row with the same description
    const existingRow = Array.from(this.tableBody.rows).find(
      (row) => row.cells[2].textContent === description
    );

    const amountStyle = type === "income" ? "color: green;" : "color: red;";
    // if the decsription already exist, update the existing row with the new income or expense value.
    // if not, create a new row
    if (existingRow) {
      // Update existing row
      if (type === "income") {
        existingRow.cells[0].style = amountStyle;
        existingRow.cells[0].textContent = `$${amount.toFixed(2)}`;
      } else if (type === "expense") {
        existingRow.cells[1].style = amountStyle;
        existingRow.cells[1].textContent = `$${Math.abs(amount).toFixed(2)}`;
      }
    } else {
      // Create a new row if it doesn't exist
      // styling
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td style="${type === "income" ? amountStyle : ""}">
          ${type === "income" ? `$${amount.toFixed(2)}` : ""}
        </td>
        <td style="${type === "expense" ? amountStyle : ""}">
          ${type === "expense" ? `$${Math.abs(amount).toFixed(2)}` : ""}
        </td>
        <td>${description}</td>
      `;
      this.tableBody.appendChild(newRow);
    }
  }
  // Update the summary section dynamically
  updateSummary() {
    const totalIncome = this.budget.getTotalIncome();
    const totalExpense = this.budget.getTotalExpense();
    const totalBudget = this.budget.getTotalBudget();

    // tofixed returns a string repesenting a number in a fixed-point notation
    // printing new rows with inputted information into the html table on the dom
    this.totalIncomeDisplay.textContent = totalIncome.toFixed(2);
    this.totalExpenseDisplay.textContent = totalExpense.toFixed(2);
    this.budgetDisplay.textContent = totalBudget.toFixed(2);
  }

  // Clear input fields after submission
  clearInputs() {
    this.incomeInput.value = "";
    this.expenseInput.value = "";
    this.descriptionInput.value = "";
  }
}

// Initialize the Budget App
// DOMContentLoaded event fires when html document has been completely parsed
document.addEventListener("DOMContentLoaded", () => {
  new BudgetUI();
});
