// content
import { collection, addDoc } from "firebase/firestore";
import { db } from "../background";
function extractCategoryInfo() {
    const categories: any[] = [];
    const categoryElements = document.querySelectorAll('.main-menu > li > a');
    categoryElements.forEach((categoryElement) => {
        const categoryLink = categoryElement.href || null;
        if (categoryLink) {
            categories.push(categoryLink);
        }
    });
    return categories;
}

// Hàm lấy thông tin sản phẩm từ dữ liệu HTML
function extractProductInfo(data: Document) {
    const products: { name: any; price: any; desc: any; img: any; }[] = [];
    const productElements = data.querySelectorAll('.listproduct > .item');

    productElements.forEach((productElement: { querySelector: (arg0: string) => any; }) => {
        const nameElement = productElement.querySelector('h3');
        const priceElement = productElement.querySelector('strong.price:not(.twoprice)');
        const descElement1 = productElement.querySelector('.prods-group');
        const descElement2 = productElement.querySelector('.utility');
        const descElement3 = productElement.querySelector('.item-compare');
        const imgElement = productElement.querySelector('.item-img img');
        console.log(imgElement.src || imgElement.dataset.src);

        const product = {
            name: nameElement ? nameElement.textContent : null,
            price: priceElement ? priceElement.textContent : null,
            desc: (descElement1 ? descElement1.textContent : '') +
                (descElement2 ? descElement2.textContent : '') +
                (descElement3 ? descElement3.textContent : ''),
            img: imgElement.dataset.src || imgElement.src
        };

        products.push(product);
    });

    return products;
}

// Hàm gửi dữ liệu lên background script

async function saveDataToFirestore(data: any[]) {
    try {
        const productsCollection = collection(db, "products");
        data.forEach(async (product) => {
            await addDoc(productsCollection, product);
        });
        console.log("Dữ liệu đã được lưu vào Firestore");
    } catch (error) {
        console.error("Lỗi khi lưu dữ liệu vào Firestore:", error);
    }
}

// Hàm tải dữ liệu từ trang web và lưu vào Firebase
async function fetchDataAndSaveToFirebase() {
    const categoriesData = extractCategoryInfo();
    try {
        for (const cate of categoriesData) {


            const response = await fetch(cate);
            const data = await response.text();
            const products = extractProductInfo(new DOMParser().parseFromString(data, 'text/html'));
            // products là mảng chứa thông tin sản phẩm
            console.log(products);

            // saveDataToFirestore(products);
        }
    } catch (err) {
        console.error(err);
    }

}

fetchDataAndSaveToFirebase();


export { }
