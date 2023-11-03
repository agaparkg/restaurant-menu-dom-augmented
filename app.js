import data from "./datafile.js";

const menuLabels = document.querySelector(".menu-labels");
const menuContainer = document.querySelector(".container");
const search = document.querySelector("#search-input");

const getUniqueNames = (data) => {
  const array = [];

  for (let i = 0; i < data.length; i++) {
    // array.push(data[i].category)
    if (!array.includes(data[i].category)) {
      array.push(data[i].category);
    }
  }

  return array;
};

// const categories = ["all", ...getUniqueNames(data)]; // ['all', 'breakfast'...]
// const categories = ["all"].concat(getUniqueNames(data)); // ['all', 'breakfast'...]
const categories = getUniqueNames(data); // ['all', 'breakfast'...]
categories.unshift("all");

// console.log(categories);

const capitalize = (word) => {
  // "all"
  // return "All"
  //   return word.toUpperCase();
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const getFilteredData = (btnName) => {
  const newArr = [];

  for (let item of data) {
    if (item.category === btnName.toLowerCase()) {
      newArr.push(item);
    }
  }

  return newArr;
};

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
    filteredData = getFilteredData(btnName);
  }

  // console.log(filteredData);

  renderMenuData(filteredData);
  // console.log(event.target.getAttribute("class"));
  // const id = event.target.getAttribute("id")
};

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
    menuLabels.innerHTML += btn;
    // menuLabels.append(btn, btn2, btn3); // Adding multiple child elements
  }

  const buttons = menuLabels.querySelectorAll(".menu-label");

  for (let btn of buttons) {
    // btn.addEventListener("click", function (e) {});
    // btn.addEventListener("click", (e) => {

    // });
    btn.addEventListener("click", filteredCategories);
  }
};

// const renderMenuData = () => {};
function renderMenuData(menudata) {
  menuContainer.innerHTML = "";

  for (let item of menudata) {
    let newItem = `<div class="card">
        <div class="card-left">
          <img src="${item.img}" alt="" width="100" />
        </div>
        <div class="card-right">
          <div class="title">
            <strong>${item.title}</strong>
            <span>$${item.price}</span>
          </div>
          <p>
            ${item.desc}
          </p>
        </div>
      </div>`;

    menuContainer.innerHTML += newItem;
  }
}

renderMenuBtns();
renderMenuData(data);

search.addEventListener("keyup", (event) => {
  const filteredSearchData = [];

  const value = event.target.value.trim();

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

{
  /* <div class="card">
        <div class="card-left">
          <img src="./images/item-1.jpeg" alt="" width="100" />
        </div>
        <div class="card-right">
          <div class="title">
            <strong>Buttermilk</strong>
            <span>Price</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            dolorum vitae. Ducimus, saepe et reiciendis dolores quod error i!
          </p>
        </div>
      </div> */
}
