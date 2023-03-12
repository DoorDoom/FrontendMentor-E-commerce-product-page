"use strict";
const photoPaths = [
    "product-1",
    "product-2",
    "product-3",
    "product-4",
];
const mainPhoto = document.getElementById("main-photo");
const mainFPhoto = document.getElementById("main-fphoto");
const underPhotos = document.getElementsByClassName("photos__item");
const underFPhotos = document.getElementsByClassName("focusPhotos__item");
const quantity = document.getElementById("quantity");
const cart = document.getElementById("cart");
const quantityIconValue = document.getElementById("quantityIcon");
const quantityIcon = document.getElementsByClassName("header__cart-quantity");
const fphotos = document.getElementsByClassName("focusPhotos");
const emptyCart = document.getElementsByClassName("cart-content__empty");
const fulfillCart = document.getElementsByClassName("cart-content__short-product");
const checkoutBtn = document.getElementsByClassName("cart-content__checkout");
const mMenu = document.getElementsByClassName("mobile-menu");
const nameProduct = document.getElementById("nameProduct");
const priceProduct = document.getElementById("priceProduct");
const overallPriceProduct = document.getElementById("overallPriceProduct");
let quantityItem = 0;
let fPhotoPosition = 0;
let product = { name: "", quantity: "0", price: "" };
function makePhotoFocused(num, context) {
    let i = 0;
    if (context) {
        mainFPhoto.src = `./images/image-${photoPaths[num]}.jpg`;
        for (const miniPhoto of Array.from(underFPhotos)) {
            if (i === num) {
                miniPhoto.className = miniPhoto.className + " _active";
            }
            else {
                miniPhoto.className = "focusPhotos__item";
            }
            i++;
        }
    }
    else {
        mainPhoto.src = `./images/image-${photoPaths[num]}.jpg`;
        for (const miniPhoto of Array.from(underPhotos)) {
            if (i === num) {
                miniPhoto.className = miniPhoto.className + " _active";
            }
            else {
                miniPhoto.className = "photos__item";
            }
            i++;
        }
    }
}
function increment() {
    quantityItem += 1;
    quantity.innerText = "" + quantityItem;
}
function decrement() {
    if (quantityItem > 0) {
        quantityItem -= 1;
        quantity.innerText = "" + quantityItem;
    }
}
function makeCartVisible() {
    if (cart.style.display === "none" || cart.style.display === "") {
        cart.style.display = "flex";
        if (product.quantity === "0") {
            makeEmpty();
        }
        else {
            fillFields();
            makeFill();
        }
    }
    else {
        cart.style.display = "none";
    }
}
function createProduct() {
    fillProduct("Fall Limited Edition Sneakers", quantityItem.toString(), "125");
    fillFields();
    if (quantityItem > 0) {
        quantityIconValue.innerText = product.quantity;
        quantityIcon[0].style.display = "flex";
        if (cart.style.display !== "none") {
            makeFill();
        }
    }
    else {
        makeEmpty();
        quantityIcon[0].style.display = "none";
    }
}
function deleteProduct() {
    fillProduct("", "0", "");
    makeEmpty();
    cart.style.display = "none";
    quantityIcon[0].style.display = "none";
}
function closeFPhotos() {
    fphotos[0].style.display = "none";
}
function openFPhotos() {
    if (document.documentElement.clientWidth < 560)
        fphotos[0].style.display = "flex";
}
function closeMMenu() {
    mMenu[0].style.display = "none";
}
function openMMenu() {
    if (document.documentElement.clientWidth < 560)
        mMenu[0].style.display = "flex";
}
function toNext(num) {
    fPhotoPosition < 3 ? (fPhotoPosition += 1) : fPhotoPosition;
    if (num) {
        makePhotoFocused(fPhotoPosition, num);
    }
    else {
        makePhotoFocused(fPhotoPosition);
    }
}
function toPrev(num) {
    fPhotoPosition > 0 ? (fPhotoPosition -= 1) : fPhotoPosition;
    if (num) {
        makePhotoFocused(fPhotoPosition, num);
    }
    else {
        makePhotoFocused(fPhotoPosition);
    }
}
function makeEmpty() {
    emptyCart[0].style.display = "block";
    fulfillCart[0].style.display = "none";
    checkoutBtn[0].style.display = "none";
}
function makeFill() {
    fulfillCart[0].style.display = "flex";
    checkoutBtn[0].style.display = "flex";
    emptyCart[0].style.display = "none";
}
function fillProduct(name, quantity, price) {
    product.name = name;
    product.quantity = quantity;
    product.price = price;
}
function fillFields() {
    nameProduct.innerText = product.name;
    priceProduct.innerText = `$${product.price} x ${product.quantity}`;
    overallPriceProduct.innerText = `$${+product.price * +product.quantity}`;
}
