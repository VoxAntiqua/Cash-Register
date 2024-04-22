const changeDue = document.getElementById("change-due");
const cash = document.getElementById("cash");
const priceDiv = document.getElementById("price-div");
const cashDrawerDiv = document.getElementById("cash-drawer-div");
const purchaseBtn = document.getElementById("purchase-btn");

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
const displayCashDrawer = (drawer) => {
  cashDrawerDiv.innerHTML = `<div><strong>Change in drawer:</strong></div>`
  drawer.forEach((denom)=>{
    cashDrawerDiv.innerHTML += `
    <div>${denom[0]}: $${denom[1]}</div>
    `
  })
}

displayCashDrawer(cid);

// Helper function for 2-decimal float precision
const floatFormat = (num) => parseFloat(num.toFixed(2));

// Purchase function
const purchase = (paid) => {
  if (paid < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (paid === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  } else {
    let priceDiff = floatFormat(paid - price);
    let changeObj = {};
    while (floatFormat(priceDiff) >= 100 && cid[8][1] >= 100) {
      cid[8][1] = floatFormat(cid[8][1] - 100);
      changeObj["HUNDRED"] = changeObj["HUNDRED"] ? floatFormat(changeObj["HUNDRED"] + 100) : 100;
      priceDiff = floatFormat(priceDiff - 100);
    }
    while (floatFormat(priceDiff) >= 20 && cid[7][1] >= 20) {
      cid[7][1] = floatFormat(cid[7][1] - 20);
      changeObj["TWENTY"] = changeObj["TWENTY"] ? floatFormat(changeObj["TWENTY"] + 20) : 20;
      priceDiff = floatFormat(priceDiff - 20);
    }
    while (floatFormat(priceDiff) >= 10 && cid[6][1] >= 10) {
      cid[6][1] = floatFormat(cid[6][1] - 10);
      changeObj["TEN"] = changeObj["TEN"] ? floatFormat(changeObj["TEN"] + 10) : 10;
      priceDiff = floatFormat(priceDiff - 10);
    }
    while (floatFormat(priceDiff) >= 5 && cid[5][1] >= 5) {
      cid[5][1] = floatFormat(cid[5][1] - 5);
      changeObj["FIVE"] = changeObj["FIVE"] ? floatFormat(changeObj["FIVE"] + 5) : 5;
      priceDiff = floatFormat(priceDiff - 5);
    }
    while (floatFormat(priceDiff) >= 1 && cid[4][1] >= 1) {
      cid[4][1] = floatFormat(cid[4][1] - 1);
      changeObj["ONE"] = changeObj["ONE"] ? floatFormat(changeObj["ONE"] + 1) : 1;
      priceDiff = floatFormat(priceDiff - 1);
    }
    while (floatFormat(priceDiff) >= 0.25 && cid[3][1] >= 0.25) {
      cid[3][1] = floatFormat(cid[3][1] - 0.25);
      changeObj["QUARTER"] = changeObj["QUARTER"] ? floatFormat(changeObj["QUARTER"] + 0.25) : 0.25;
      priceDiff = floatFormat(priceDiff - 0.25);
    }
    while (floatFormat(priceDiff) >= 0.1 && cid[2][1] >= 0.1) {
      cid[2][1] = floatFormat(cid[2][1] - 0.1);
      changeObj["DIME"] = changeObj["DIME"] ? floatFormat(changeObj["DIME"] + 0.1) : 0.1;
      priceDiff = floatFormat(priceDiff - 0.1);
    }
    while (floatFormat(priceDiff) >= 0.05 && cid[1][1] >= 0.05) {
      cid[1][1] = floatFormat(cid[1][1] - 0.05);
      changeObj["NICKEL"] = changeObj["NICKEL"] ? floatFormat(changeObj["NICKEL"] + 0.05) : 0.05;
      priceDiff = floatFormat(priceDiff - 0.05);
    }
    while (floatFormat(priceDiff) >= 0.01 && cid[0][1] >= 0.01) {
      cid[0][1] = floatFormat(cid[0][1] - 0.01);
      changeObj["PENNY"] = changeObj["PENNY"] ? floatFormat(changeObj["PENNY"] + 0.01) : 0.01;
      priceDiff = floatFormat(priceDiff - 0.01);
    }
    displayCashDrawer(cid);
    if (floatFormat(priceDiff) > 0) {
      changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    } else {
      if (cid.every((denom)=>denom[1]===0)) {
        changeDue.textContent = "Status: CLOSED";
      } else {
        changeDue.textContent = "Status: OPEN";
      }
      Object.entries(changeObj).forEach((denom)=>{
        changeDue.textContent += ` ${denom[0]}: $${denom[1]}`;
      });
    }
  }
};

purchaseBtn.addEventListener("click", ()=>purchase(parseFloat(cash.value)));