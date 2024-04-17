const changeDue = document.getElementById("change-due");
const cash = document.getElementById("cash");
const priceDiv = document.getElementById("price-div");
const cashDrawerDiv = document.getElementById("cash-drawer-div");

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

// Display item price
priceDiv.textContent = `Price: $${price}`;

// Display cash drawer contents
cashDrawerDiv.innerHTML = `<div><strong>Change in drawer:</strong></div>`
cid.forEach((denom)=>{
    cashDrawerDiv.innerHTML += `
    <div>${denom[0]}: $${denom[1]}</div>
    `
})