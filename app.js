// import data from "./datafile1.js";
import data from "./datafile2.js";
// datafile2.js contains more data with additional categories
import { getUniqueNames, capitalize, getFilteredData } from "./utils.js";

const menuLabels = document.querySelector(".menu-labels");
const menuContainer = document.querySelector(".container");
const search = document.querySelector("#search-input");

window.addItemToOrder = addItemToOrder;
window.removeItemFromOrder = removeItemFromOrder;

// const categories = ["all", ...getUniqueNames(data)]; // ['all', 'breakfast'...]
// const categories = ["all"].concat(getUniqueNames(data)); // ['all', 'breakfast'...]
const categories = getUniqueNames(data); // ['all', 'breakfast'...]
let orderItems = [];
// [
//   {
//     ...item,
//     count: 3
//   }
// ]

let totalOrderCount = getTotalOrderCount();

// console.log(totalOrderCount);

function getTotalOrderCount() {
  let sum = 0;

  if (!orderItems.length) return 0;

  for (let item of orderItems) {
    sum += item.count;
  }

  return sum;
}

categories.unshift("all");

// console.log(categories, data);

const filteredCategories = (event) => {
  let filteredData = [];

  const buttons = menuLabels.querySelectorAll(".menu-label");

  for (let item of buttons) {
    item.classList.remove("active-menu-btn");
  }

  event.target.classList.add("active-menu-btn");

  // const btnName = event.target.innerHTML
  const btnName = event.target.innerText; // breakfast, all, etc.

  // if(btnName.toLowerCase() === 'all'){
  if (btnName === "All") {
    filteredData = data;
  } else {
    filteredData = getFilteredData(data, btnName);
  }

  // console.log(filteredData);

  renderMenuData(filteredData);
  // console.log(event.target.getAttribute("class"));
  // const id = event.target.getAttribute("id")
};

const displayShopCart = () => {
  console.log("shop cart", orderItems);
  renderCartData();
};

function renderCartData() {
  menuContainer.innerHTML = "";

  menuContainer.innerHTML += `<div class="cart-text"><div>Order Cart</div><div class="cart-total">Cart Total: $<span id="order-total">0.00</span></div></div>`;

  const buttons = menuLabels.querySelectorAll(".menu-label");
  const orderTotalEl = menuContainer.querySelector("order-total");

  for (let item of buttons) {
    item.classList.remove("active-menu-btn");
  }

  if (orderItems.length) {
    let priceSum = 0;

    for (let item of orderItems) {
      console.log(priceSum, item, orderTotalEl);
      priceSum += item.price * item.count;

      let newItem = `<div class="card">
        <div class="card-left">
          <img src="${item.img}" alt="" />
        </div>
        <div class="card-right">
          <div class="title">
            <strong class="menu-title">${item.title}</strong>
            <span>$${item.price}</span>
          </div>
          <p>
            ${item.desc}
          </p>
          <button id="${item.id}" onclick="removeItemFromOrder(event)" class="add-cart">Remove</button>
          <span id="each-order-count">${item.count}</span>
        </div>
      </div>`;

      menuContainer.innerHTML += newItem;
      console.log(priceSum);
    }

    console.log("priceSum, orderTotalEl", priceSum, orderTotalEl);
    orderTotalEl.textContent = priceSum;
  } else {
    menuContainer.innerHTML += "<p class='no-data'>No data found</p>";
  }
}

function removeItemFromOrder(e) {
  const id = e.target.id;

  // if (!orderItems.length) {
  //   orderItems.push({ ...data.find((d) => d.id == id), count: 1 });
  //   return;
  // }

  // const itemExist = orderItems.find((item) => item.id == id);

  // if (itemExist) {
  //   itemExist.count++;
  // } else {
  //   orderItems.push({ ...data.find((d) => d.id == id), count: 1 });
  // }

  const item = orderItems.find((item) => item.id == id);

  item.count--;

  if (!item.count) {
    orderItems = orderItems.filter((item) => item.id != id);
  }

  totalOrderCount = getTotalOrderCount();
  document.querySelector("#order-count").innerText = totalOrderCount;
  renderCartData();
}

function addItemToOrder(e) {
  const id = e.target.id;

  // if (!orderItems.length) {
  //   orderItems.push({ ...data.find((d) => d.id == id), count: 1 });
  //   return;
  // }

  // const itemExist = orderItems.find((item) => item.id == id);

  // if (itemExist) {
  //   itemExist.count++;
  // } else {
  //   orderItems.push({ ...data.find((d) => d.id == id), count: 1 });
  // }

  const itemExist = orderItems.find((item) => item.id == id);

  if (!orderItems.length || !itemExist) {
    orderItems.push({ ...data.find((d) => d.id == id), count: 1 });
  } else {
    itemExist.count++;
  }

  totalOrderCount = getTotalOrderCount();
  document.querySelector("#order-count").innerText = totalOrderCount;
}

const renderMenuBtns = () => {
  // for(let i=0; i<...length; i++){}
  // for(let item of array){} // ["a","b",3,4]
  // for(let index in array){} // 0,1,2,3

  // <button class="menu-label active-menu-btn">All</button>;

  for (let i = 0; i < categories.length; i++) {
    // Option 1
    // const btn = document.createElement("button");
    // btn.innerText = categories[i];
    // btn.classList.add("menu-label"); // "menu menu-1 menu-label"
    // btn.className = 'menu-label'; // "menu-label"
    // btn.innerText = "All"
    // btn.innerHTML = "<span>Span</span>"

    // Option 2
    let customClass; // undefined

    if (i === 0) {
      customClass = "menu-label active-menu-btn";
    } else {
      customClass = "menu-label";
    }

    let btn = `<button class="${customClass}">${capitalize(
      categories[i]
    )}</button>`;

    // menuLabels.appendChild(btn); // Adding single child elements one at a time
    // menuLabels.append(btn, btn2, btn3); // Adding multiple child elements
    menuLabels.innerHTML += btn;
  }

  // menuLabels.innerHTML += `<button id="shop-cart">Cart</button>`;
  menuLabels.innerHTML += `<button id="shop-cart"><i class="fa fa-cutlery fa-1x"></i> Order <span id="order-count">${totalOrderCount}</span></button>`;
  // menuLabels.innerHTML += `<button id="shop-cart"><i class="fa fa-shopping-cart" style="font-size:14px;"></i> Cart</button>`;

  const buttons = menuLabels.querySelectorAll(".menu-label");

  const orderCartBtn = menuLabels.querySelector("#shop-cart");

  for (let btn of buttons) {
    // btn.addEventListener("click", function (e) {});
    // btn.addEventListener("click", (e) => {

    // });
    btn.addEventListener("click", filteredCategories);
  }

  orderCartBtn.addEventListener("click", displayShopCart);
};

// const renderMenuData = () => {};
function renderMenuData(menudata) {
  menuContainer.innerHTML = "";

  if (menudata.length) {
    for (let item of menudata) {
      let newItem = `<div class="card">
        <div class="card-left">
          <img src="${item.img}" alt="" width="100" />
        </div>
        <div class="card-right">
          <div class="title">
            <strong class="menu-title">${item.title}</strong>
            <span>$${item.price}</span>
          </div>
          <p>
            ${item.desc}
          </p>
          <button id="${item.id}" onclick="addItemToOrder(event)" class="add-cart">Add to Order</button>
        </div>
      </div>`;

      menuContainer.innerHTML += newItem;
    }
  } else {
    menuContainer.innerHTML = "<p class='no-data'>No data found</p>";
  }
}

renderMenuBtns();
renderMenuData(data);

search.addEventListener("keyup", (event) => {
  let filteredSearchData = [];

  const value = event.target.value.trim(); // diner
  console.log(value);
  if (value !== "") {
    for (let item of data) {
      if (
        item.title.includes(value.toLowerCase()) ||
        item.desc.includes(value)
        // item.desc.toLowerCase().includes(value.toLowerCase())
      ) {
        filteredSearchData.push(item);
      }
    }

    renderMenuData(filteredSearchData);
  }
});
