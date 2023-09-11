import { collection, addDoc } from '../../node_modules/.vite/deps/firebase_firestore.js';
import { db } from '../background/index.ts.js';

function extractCategoryInfo() {
  const categories = [];
  const categoryElements = document.querySelectorAll(".main-menu > li > a");
  categoryElements.forEach((categoryElement) => {
    const categoryLink = categoryElement.href || null;
    if (categoryLink) {
      categories.push(categoryLink);
    }
  });
  return categories;
}
function extractProductInfo(data) {
  const products = [];
  const productElements = data.querySelectorAll(".listproduct > .item");
  productElements.forEach((productElement) => {
    const nameElement = productElement.querySelector("h3");
    const priceElement = productElement.querySelector("strong.price:not(.twoprice)");
    const descElement1 = productElement.querySelector(".prods-group");
    const descElement2 = productElement.querySelector(".utility");
    const descElement3 = productElement.querySelector(".item-compare");
    const imgElement = productElement.querySelector(".item-img img");
    console.log(imgElement.src || imgElement.dataset.src);
    const product = {
      name: nameElement ? nameElement.textContent : null,
      price: priceElement ? priceElement.textContent : null,
      desc: (descElement1 ? descElement1.textContent : "") + (descElement2 ? descElement2.textContent : "") + (descElement3 ? descElement3.textContent : ""),
      img: imgElement.dataset.src || imgElement.src
    };
    products.push(product);
  });
  return products;
}
async function saveDataToFirestore(data) {
  try {
    const productsCollection = collection(db, "products");
    data.forEach(async (product) => {
      await addDoc(productsCollection, product);
    });
    console.log("D\u1EEF li\u1EC7u \u0111\xE3 \u0111\u01B0\u1EE3c l\u01B0u v\xE0o Firestore");
  } catch (error) {
    console.error("L\u1ED7i khi l\u01B0u d\u1EEF li\u1EC7u v\xE0o Firestore:", error);
  }
}
async function fetchDataAndSaveToFirebase() {
  const categoriesData = extractCategoryInfo();
  try {
    for (const cate of categoriesData) {
      const response = await fetch(cate);
      const data = await response.text();
      const products = extractProductInfo(new DOMParser().parseFromString(data, "text/html"));
      console.log(products);
    }
  } catch (err) {
    console.error(err);
  }
}
fetchDataAndSaveToFirebase();
