import { BrowserRouter, Route, Routes } from "react-router-dom"
import './Popup.css'
import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../background"

function App() {
  const [products, setProducts] = useState([])
  console.log(products);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot: { docs: { data: () => any; id: any }[] }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ListProducts: any = snapshot.docs.map((doc: { data: () => any; id: any }) => ({
        ...doc.data(),
        id: doc.id
      }));
      setProducts(ListProducts)
    });

    return () => {
      unsubscribe();
    };
  }, [])
  return (
    <main className="relative p-1">
      <button className="text-white bg-red-500 py-2 px-3 text-base whitespace-nowrap font-semibold fixed left-1/2 -translate-x-1/2 rounded-md">Show List Products</button> <br />
      <div className="list-movie-trending relative afterTrending mt-3">
        <div className="list-movie py-6 flex ite  ms-start scroll-trending gap-3 xl:gap-5 ">
          {
            products.map((products: { name: string, img: string, desc: string, price: string }, index) => {
              if (products.img) {
                return (
                  <div key={index} className="item-card w-40 min-w-[150px] border p-2 group hover:bg-slate-100 ">
                    <div className="image overflow-hidden rounded-md min-h-[150px]">
                      <div className="wrapper-imag transition group-hover:scale-105 mt-3 ">
                        <img className="w-full h-full" src={products.img || "e"} alt="" />
                      </div>
                    </div>
                    <div className="content-movie w-full px-1 pt-6 ">
                      <h2 className="text-black font-bold">{products.name}</h2>
                      <p className="text-red-500 font-semibold text-base">{products.price}
                      </p>
                      <p className="mt-2  line-clamp-2">{products.desc}</p>
                    </div>
                  </div>
                )
              }
            }
            )
          }
        </div>
      </div>
    </main>
  )
}

export default App
