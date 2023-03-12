interface Product {
  name: string;
  quantity: string;
  price: string;
}

const photoPaths: string[] = [
  "product-1",
  "product-2",
  "product-3",
  "product-4",
];

const mainPhoto: HTMLImageElement = document.getElementById(
  "main-photo"
) as HTMLImageElement;
const mainFPhoto: HTMLImageElement = document.getElementById(
  "main-fphoto"
) as HTMLImageElement;
const underPhotos: HTMLCollectionOf<HTMLImageElement> =
  document.getElementsByClassName(
    "photos__item"
  ) as HTMLCollectionOf<HTMLImageElement>;
const underFPhotos: HTMLCollectionOf<HTMLImageElement> =
  document.getElementsByClassName(
    "focusPhotos__item"
  ) as HTMLCollectionOf<HTMLImageElement>;
const quantity: HTMLElement = document.getElementById(
  "quantity"
) as HTMLElement;
const cart: HTMLElement = document.getElementById("cart") as HTMLElement;
const quantityIconValue: HTMLElement = document.getElementById(
  "quantityIcon"
) as HTMLElement;
const quantityIcon: HTMLCollectionOf<HTMLImageElement> =
  document.getElementsByClassName(
    "header__cart-quantity"
  ) as HTMLCollectionOf<HTMLImageElement>;
const fphotos: HTMLCollectionOf<HTMLImageElement> =
  document.getElementsByClassName(
    "focusPhotos"
  ) as HTMLCollectionOf<HTMLImageElement>;
const emptyCart: HTMLCollectionOf<HTMLImageElement> =
  document.getElementsByClassName(
    "cart-content__empty"
  ) as HTMLCollectionOf<HTMLImageElement>;
const fulfillCart: HTMLCollectionOf<HTMLImageElement> =
  document.getElementsByClassName(
    "cart-content__short-product"
  ) as HTMLCollectionOf<HTMLImageElement>;
const checkoutBtn: HTMLCollectionOf<HTMLImageElement> =
  document.getElementsByClassName(
    "cart-content__checkout"
  ) as HTMLCollectionOf<HTMLImageElement>;
const mMenu: HTMLCollectionOf<HTMLImageElement> =
  document.getElementsByClassName(
    "mobile-menu"
  ) as HTMLCollectionOf<HTMLImageElement>;
const nameProduct: HTMLElement = document.getElementById(
  "nameProduct"
) as HTMLElement;
const priceProduct: HTMLElement = document.getElementById(
  "priceProduct"
) as HTMLElement;
const overallPriceProduct: HTMLElement = document.getElementById(
  "overallPriceProduct"
) as HTMLElement;

let quantityItem = 0;
let fPhotoPosition = 0;
let product: Product = { name: "", quantity: "0", price: "" };

function makePhotoFocused(num: number, context?: number): void {
  let i = 0;
  if (context) {
    mainFPhoto.src = `./images/image-${photoPaths[num]}.jpg`;
    for (const miniPhoto of Array.from(underFPhotos)) {
      if (i === num) {
        miniPhoto.className = miniPhoto.className + " _active";
      } else {
        miniPhoto.className = "focusPhotos__item";
      }
      i++;
    }
  } else {
    mainPhoto.src = `./images/image-${photoPaths[num]}.jpg`;
    for (const miniPhoto of Array.from(underPhotos)) {
      if (i === num) {
        miniPhoto.className = miniPhoto.className + " _active";
      } else {
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
    } else {
      fillFields();
      makeFill();
    }
  } else {
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
  } else {
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

function toNext(num?: number) {
  fPhotoPosition < 3 ? (fPhotoPosition += 1) : fPhotoPosition;
  if (num) {
    makePhotoFocused(fPhotoPosition, num);
  } else {
    makePhotoFocused(fPhotoPosition);
  }
}

function toPrev(num?: number) {
  fPhotoPosition > 0 ? (fPhotoPosition -= 1) : fPhotoPosition;
  if (num) {
    makePhotoFocused(fPhotoPosition, num);
  } else {
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

function fillProduct(name: string, quantity: string, price: string) {
  product.name = name;
  product.quantity = quantity;
  product.price = price;
}

function fillFields() {
  nameProduct.innerText = product.name;
  priceProduct.innerText = `$${product.price} x ${product.quantity}`;
  overallPriceProduct.innerText = `$${+product.price * +product.quantity}`;
}
