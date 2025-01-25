
import React from "react";

function CartPage({model,setModel,products,openButton,quantities, setQuantities, decrementQuantity,incrementQuantity
  ,removeItem,setProducts,closeButton,calculateTotal}) {

  

  return(
  <>
    {model && (
   <div className="py-10 absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
     <div className="bg-fuchsia-800 box-border h-screen overflow-y-auto w-4/12 p-4 border-4">
     {products.map((product) => {
         const Cartss = openButton.includes(product.id);
         if (Cartss) {
                    return (
                      <div key={product.id} className="p-4 bg-white shadow-md">
                        <img
                          className="object-cover w-48 h-48 rounded-md"
                          src={product.image}
                        />
          
                        <h3 className="mt-2 text-black text-lg font-semibold text-right my-4 relative bottom-40 right-8">
                          {product.category}
                        </h3>
                        <p className="text-right font-semibold relative bottom-40 right-24">
                          {product.price / 10 *quantities[product.id]}
                        </p>
          
                        <button
                          onClick={() => decrementQuantity(product.id)}
                          className="bg-fuchsia-200 px-8 my-6 inline-block text-xl text-right relative bottom-40 left-28"
                        >
                          -
                        </button>
                        <div className="inline-block text-xl px-6 text-right relative bottom-40 left-28">
                          {quantities[product.id] || 1}
                        </div>
                        <button
                        onClick={() => incrementQuantity(product.id)}
                          className="bg-fuchsia-200 px-8 inline-block text-xl text-right relative bottom-40 left-28"
                        >
                          +
                        </button>
                        <button onClick={()=>removeItem(product.id)} 
                        className="text-red-700 font-semibold text-xl relative bottom-24 right-10">Remove</button>
                        <hr className="relative bottom-24 border-gray-700" />
                      </div>
                    );
                  }
     })}
      <button
        onClick={() => setModel(false)}
        className="relative right-36 text-xl my-10 py-2 bg-white px-8 rounded-md"
      >
        close
      </button>
      <div className="w-4/12 relative left-64 bottom-20 text-xl py-2 bg-white px-8 rounded-md">
                      Rs.{calculateTotal()}
                     </div>
</div>
</div>
  )};
</>
)
}

export default CartPage;



// {model && (
//   <div className="py-10 absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
//     <div className="bg-fuchsia-800 box-border h-screen overflow-y-auto w-4/12 p-4 border-4">
//       {product.map((products) => {
//         const Cartss = openButton.includes(products.id);
//         if (Cartss) {
//           return (
//             <div key={products.id} className="p-4 bg-white shadow-md">
//               <img
//                 className="object-cover w-48 h-48 rounded-md"
//                 src={products.image}
//               />

//               <h3 className="mt-2 text-black text-lg font-semibold text-right my-4 relative bottom-40 right-8">
//                 {products.category}
//               </h3>
//               <p className="text-right font-semibold relative bottom-40 right-24">
//                 {products.price / 10 *quantities[products.id]}
//               </p>

//               <button
//                 onClick={() => decrementQuantity(products.id)}
//                 className="bg-fuchsia-200 px-8 my-6 inline-block text-xl text-right relative bottom-40 left-28"
//               >
//                 -
//               </button>
//               <div className="inline-block text-xl px-6 text-right relative bottom-40 left-28">
//                 {quantities[products.id] || 1}
//               </div>
//               <button
//               onClick={() => incrementQuantity(products.id)}
//                 className="bg-fuchsia-200 px-8 inline-block text-xl text-right relative bottom-40 left-28"
//               >
//                 +
//               </button>
//               <button onClick={()=>removeItem(products.id)} 
//               className="text-red-700 font-semibold text-xl relative bottom-24 right-10">Remove</button>
//               <hr className="relative bottom-24 border-gray-700" />
//             </div>
//           );
//         }
//       })}
//       <button
//         onClick={() => setModel(false)}
//         className="relative right-36 text-xl my-10 py-2 bg-white px-8 rounded-md"
//       >
//         close
//       </button>
//       </div>
//       </div>
//       )}



























// import { useEffect, useState } from "react";

// function CartPage(){
    
//     const [product, setProducts] = useState([]);
//     const [openButton, closeButton] = useState([]);
//     const [quantities, setQuantities] = useState({}); 
    

//     const fetchData = async () => {
//         let datas = await fetch("https://fakestoreapi.com/products?sort=desc");
//         let StoredData = await datas.json();
//         setProducts(StoredData);
//       };
    
//       useEffect(() => {
//         fetchData();
//       }, []);

//       const incrementQuantity = (id) => {
//         setQuantities((prevQuantities) => ({
//           ...prevQuantities,
//           [id]: (prevQuantities[id] || 0) + 1,
//         }));
//       };
    
//       const decrementQuantity = (id) => {
//         setQuantities((prevQuantities) => ({
//           ...prevQuantities,
//           [id]: Math.max((prevQuantities[id] || 1) - 1, 1), 
//         }));
//       };

//       const calculateTotal = () => {
//         return product
//           .filter((products) => openButton.includes(products.id))
//           .reduce(
//             (total, products) =>
//               total + parseInt(products.price / 10) * (quantities[products.id] || 1),
//             0
//           );
//       };

//       const toggleButton = (itemCart) => {
//         closeButton((itemData) => {
//           if (itemData.includes(itemCart)) {
//             setCount(count - 1);
//             return itemData.filter((id) => id !== itemCart);
//           } else {
//             setCount(count + 1);
//             setQuantities({ ...quantities, [itemCart]: 1 }); 
//             return [...itemData, itemCart];
//           }
//         });
//       };


//     return(
//     <>
    
//     {/* <div className="text-2xl text-red-700">Hello</div> */}
//     <div className="py-10 absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-fuchsia-900 box-border h-screen overflow-y-auto w-4/12 p-4 border-4 bg-white">
//         {product.map((products) => {
//             const Cartss = openButton.includes(products.id);
//             if (Cartss) {
//                 console.log("hi")
//                 return(
//                     <div key={products.id} className="p-4 bg-white shadow-md">
//                     <img
//                       className="object-cover w-48 h-48 rounded-md"
//                       src={products.image}
//                     />
    
//                     <h3 className="mt-2 text-black text-lg font-semibold text-right my-4 relative bottom-40 right-8">
//                       {products.category}
//                     </h3>
//                     <p className="text-right font-semibold relative bottom-40 right-24">
//                       {products.price / 10}
//                     </p>
    
//                     <button
//                       onClick={() => decrementQuantity(products.id)}
//                       className="bg-fuchsia-200 px-8 my-6 inline-block text-xl text-right relative bottom-40 left-20"
//                     >
//                       -
//                     </button>
//                     <div className="inline-block text-xl px-6 text-right relative bottom-40 left-20">
//                       {quantities[products.id] || 1}
//                     </div>
//                     <button
//                       onClick={() => incrementQuantity(products.id)}
//                       className="bg-fuchsia-200 px-8 inline-block text-xl text-right relative bottom-40 left-20"
//                     >
//                       +
//                     </button>
//                     <hr className="relative bottom-36 border-gray-700" />
//                   </div>
//                 )
//             }
//         })}
//          <div className="w-4/12 relative left-64 bottom-20 text-xl py-2 bg-white px-8 rounded-md">
//           Rs.{calculateTotal()}
//         </div>
//       </div>
//       </div>
      
//     </>
//     )
// }
// export default CartPage