// // The income and expenses should be stored in separate arrays or objects
// const incomeArray = [];
// const expenseArray = [];

// const incomeTable = document.getElementById("content-table");

// const button = document.getElementById("btn");
// button.addEventListener("click", function () {
//   const amount = document.getElementById().innerText;
//   const description = document.getElementById().innerText;

//   const rowItem = `<tr><td>${amount}</td><td>${description}</td></tr>`;
//   // creating a varianble that store input from input boxes/ description
//   const input = document.querySelector(".input-form").value.trim();
//   incomeArray.push(rowItem);
// });

// incomeArray.forEach((row) => {
//   incomeTable.appendChild(row);
// });

// event handler for pressing submit data button

document.querySelector(".btn").addEventListener("click", function () {
  const incomeAmount = document.querySelector("#income-input").value.trim();
  console.log(incomeAmount);
  //   const expenseAmount = document.querySelector("#expense-input").value.trim();
  //   const description = document.getElementById("message").value.trim();
  // what i want to be output on the table, storing as variable
  // const rowItem = `<tr><td>${amount}</td><td>${description}</td></tr>`;
  // document.querySelector(".content-table").textContent = rowItem;
});
