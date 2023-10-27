const data = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: "I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed ",
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: "vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats ",
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: "ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.",
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: "Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, ",
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: "franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up ",
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpeg",
    desc: "Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday",
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpeg",
    desc: "carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird ",
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: "on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  ",
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: "skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.",
  },
  {
    id: 10,
    title: "steak dinner",
    category: "dinner",
    price: 39.99,
    img: "./images/item-10.jpeg",
    desc: "skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.",
  },
];

const menuLabels = document.querySelector(".menu-labels");
const menuContainer = document.querySelector(".container");

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

const categories = ["all", ...getUniqueNames(data)];

// console.log(categories);

const capitalize = (word) => {
  // "all"
  // return "All"
  //   return word.toUpperCase();
  return word.charAt(0).toUpperCase() + word.slice(1);
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
    let btn;
    if (i === 0) {
      btn = `<button class="menu-label active-menu-btn">${capitalize(
        categories[i]
      )}</button>`;
    } else {
      btn = `<button class="menu-label">${capitalize(categories[i])}</button>`;
    }

    // menuLabels.appendChild(btn); // Adding single child elements one at a time
    menuLabels.innerHTML += btn;
    // menuLabels.append(btn, btn2, btn3); // Adding multiple child elements
  }
};

const renderMenuData = () => {};

renderMenuBtns();
renderMenuData();

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
