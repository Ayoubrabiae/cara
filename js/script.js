// Show navbar linkes
let menuBtn = document.querySelector(".header .mobile .menu-btn");

menuBtn.onclick = function () {
  let navbar = document.querySelector(".header .nav");
  navbar.classList.toggle("nav-active");
  menuBtn.classList.toggle("fa-times");
};

// Set the cart shop image
let shopCartBtn = document.querySelectorAll(
  ".featured-products .products .box .buy-sec .shop-cart"
);

let buySecImgs = document.querySelectorAll(
  ".featured-products .products .box .image img"
);

let buySecImg = document.querySelector(
  ".buy-section-cart .images .current img"
);

shopCartBtn.forEach((e, i) => {
  e.onclick = function () {
    localStorage.setItem("buySecImg", buySecImgs[i].src);
    buySecImg.src = `${buySecImgs[i].src}`;
    if (buySecImgs[i].src[0] === ".") {
      localStorage.setItem("srcImgBoolean", "1");
    } else {
      localStorage.setItem("srcImgBoolean", "0");
    }
    scrollTo(0, 0);
  };
});

if (document.querySelector("title").innerHTML === "Cara-buy-section") {
  if (localStorage.getItem("srcImgBoolean") === "1") {
    buySecImg.src = `../${localStorage.getItem("buySecImg")}`;
  } else {
    buySecImg.src = `${localStorage.getItem("buySecImg")}`;
  }
}

// set the image by the slider image in the cart shop
let sliderImgs = document.querySelectorAll(
  ".buy-section-cart .images .slider .image img"
);

sliderImgs.forEach((e) => {
  e.onclick = function () {
    buySecImg.src = e.src;
    localStorage.setItem("buySecImg", e.src);
  };
});

// Set the footer date

document.querySelector(".footer .ftr span").innerHTML =
  new Date().getFullYear();

// Add Products to cart
// Get data from buySection

function getItemData(img, tit, pric, num) {
  let price = pric.innerHTML.substr(1);
  console.log(price);
  localStorage.setItem(`item${count}`, [
    img.src,
    tit.innerHTML,
    price,
    num.value,
  ]);
}

let count = localStorage.length - 1;

if (document.querySelector("title").innerHTML === "Cara-buy-section") {
  document.querySelector(".buy-section-cart .info .num-price button").onclick =
    function () {
      let image = document.querySelector(
        ".buy-section-cart .images .current img"
      );
      let title = document.querySelector(".buy-section-cart .info .title");
      let price = document.querySelector(".buy-section-cart .info .price");
      let number = document.querySelector(
        ".buy-section-cart .info .num-price input"
      );

      window.location.reload();

      ++count;
      getItemData(image, title, price, number);
    };
}

console.log(localStorage);

// Set data to table cart

function setItemData(img, tit, pric, num) {
  let tr = document.createElement("tr");

  let tdIcon = document.createElement("td");
  let icon = document.createElement("i");
  icon.classList.add("fas", "fa-times");
  tdIcon.appendChild(icon);
  tr.appendChild(tdIcon);

  let tdImage = document.createElement("td");
  let imageBox = document.createElement("div");
  imageBox.classList.add("image");
  let image = document.createElement("img");
  image.src = img;
  imageBox.appendChild(image);
  tdImage.appendChild(imageBox);
  tr.appendChild(tdImage);

  let title = document.createElement("td");
  let titleText = document.createTextNode(tit);
  title.appendChild(titleText);
  tr.appendChild(title);

  let price = document.createElement("td");
  let priceText = document.createTextNode(`$${pric}`);
  price.appendChild(priceText);
  tr.appendChild(price);

  let number = document.createElement("td");
  let numberText = document.createTextNode(num);
  number.appendChild(numberText);
  tr.appendChild(number);

  let subTotal = document.createElement("td");
  let sub = Number(num) * Number(pric);
  let subText = document.createTextNode(`$${sub}`);
  subTotal.appendChild(subText);
  tr.appendChild(subTotal);

  return tr;
}

if (document.querySelector("title").innerHTML === "Cara-Cart") {
  for (i = 1; i < localStorage.length; i++) {
    if (localStorage.getItem(`item${i}`) !== null) {
      let arr = localStorage.getItem(`item${i}`).split(",");
      let item = setItemData(arr[0], arr[1], arr[2], arr[3]);
      document.querySelector(".cart table tbody").appendChild(item);
    }
  }
}

// Remove Item from table cart

let tableRemoveBtn = document.querySelectorAll(".cart table tbody tr td i");

tableRemoveBtn.forEach((e, i) => {
  // let tableRows = document.querySelectorAll(".cart table tbody tr");
  e.onclick = function () {
    let count = i + 1;
    localStorage.removeItem(`item${count}`);
    window.location.reload();
  };
});

// Set price to the coupoun price
let coupounCarts = document.querySelectorAll(
  ".cart-coupoun .cart-totals table tr td"
);

let price = 0;
for (i = 1; i <= localStorage.length - 1; i++) {
  if (localStorage.getItem(`item${i}`) !== null) {
    let pricesArr = localStorage.getItem(`item${i}`).split(",");
    let pricex = pricesArr[2] * pricesArr[3];
    price += pricex;
  }
}

if (document.querySelector("title").innerHTML === "Cara-Cart") {
  coupounCarts[1].innerHTML = `$${price}`;

  // Add coupoun
  let coupounInp = document.querySelector(
    ".cart-coupoun .coupoun .input-btn input"
  );
  let coupounBtn = document.querySelector(
    ".cart-coupoun .coupoun .input-btn .main-btn"
  );

  coupounBtn.onclick = function () {
    if (coupounInp.value === "rabieAyoub") {
      coupounCarts[3].innerHTML = "90%";
      coupounCarts[5].innerHTML = `$${Math.round((price / 100) * 10)}`;
    }
  };
  document.querySelector(".cart-coupoun .cart-totals .main-btn").onclick =
    function () {
      localStorage.clear();
      window.location.reload();
    };
}
