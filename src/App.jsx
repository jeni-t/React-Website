import { BrowserRouter, Route, Routes, Link } from "react-router";
import { useEffect, useState } from "react";
import "./App.css";
import CartPage from "./CartPage";

function App() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [model, setModel] = useState(false)
  const [openButton, closeButton] = useState([]);
  const [quantities, setQuantities] = useState({}); 

  const fetchData = async () => {
    let datas = await fetch("https://fakestoreapi.com/products?sort=desc");
    let StoredData = await datas.json();
    setProducts(StoredData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleButton = (itemCart) => {
          closeButton((itemData) => {
            if (itemData.includes(itemCart)) {
              setCount(count - 1);
              return itemData.filter((id) => id !== itemCart);
            } else {
              setCount(count + 1);
              setQuantities({ ...quantities, [itemCart]: 1 }); 
              return [...itemData, itemCart];
            }
          });
        };

        const incrementQuantity = (id) => {
          setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: (prevQuantities[id] || 0) + 1,
          }));
        };
      
        const decrementQuantity = (id) => {
          setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: Math.max((prevQuantities[id] || 1) - 1, 1), 
          }));
        };
      
        const calculateTotal = () => {
          return products
            .filter((product) => openButton.includes(product.id))
            .reduce(
              (total, product) =>
                total + parseInt(Math.ceil(product.price / 10)) * (quantities[product.id] || 1),
              0
            );
        };
    
        const removeItem = (id) => {
          const updatedProducts = products.filter((item) => item.id !== id);
          setProducts(updatedProducts);
        
          const updatedQuantities = { ...quantities };
          delete updatedQuantities[id];
          setQuantities(updatedQuantities);
        
          const updatedOpenButton = openButton.filter((itemId) => itemId !== id);
          closeButton(updatedOpenButton);
        };


  return (
    <BrowserRouter>
      <nav className="w-full bg-fuchsia-950">
             <div className="flex flex-row gap-20">
 <img src="https://st4.depositphotos.com/20435048/23412/v/450/depositphotos_234121474-stock-illustration-lets-shopping-logo-design-template.jpg" 
 className="mx-6 my-4 h-28 rounded-full"></img>
                <div className="text-white my-14 text-xl">Home</div>
                <div className="text-white my-14 text-xl">About</div>
                <div className="text-white my-14 text-xl">Product</div>
                <div className="text-white my-14 text-xl">Offers</div>
                <div className="text-white my-14 text-xl">Contact</div>
          <Link to="/CartPage" className="relative" onClick={()=>{setModel(true)}}>
            <img
              src="https://media.istockphoto.com/id/1371799921/vector/shopping-cart-icon-with-long-shadow-on-blank-background-flat-design.jpg?s=612x612&w=0&k=20&c=2IxbpxSInsWm30hUV7-WcScSjdJYt20k5Gfg7G77mYk="
              className="h-28 w-28 mx-36 my-4 rounded-full"
              alt="Cart"
            />
            <div className="bg-fuchsia-500 rounded-full w-8 h-8 absolute bottom-4 right-8 text-xl text-center">
              {count}
            </div>
          </Link>
        </div>
      </nav>
      <div className="min-h-screen flex flex-col items-center bg-fuchsia-200">
           <div className="w-full p-6 overflow-y-auto">
             <div className="sm:grid grid-cols-1 grid md:grid-cols-4 lg:grid grid-cols-4 gap-6">
               {products.map((product) => {
                const Carts = openButton.includes(product.id);
                return (
                  <div key={product.id} className="p-4 bg-white rounded-lg shadow-md">
                    <img
                      className="object-cover w-full h-48 rounded-md"
                      src={product.image}
                    />
  
                    <h3 className="mt-2 text-black text-lg font-semibold text-left my-4">
                      {product.category}
                    </h3>
                    <p className="text-left inline-block px-2 relative bottom-4 right-20 line-through my-2">
                      {product.price}
                    </p>
                    <p className="inline-block relative bottom-4 right-20">10%</p>
                    <p className="bg-amber-200 mx-20 relative bottom-4 right-20 text-base font-semibold text-red-800">
                      {product.price / 10}
                    </p>
  
                    <button
                      onClick={() => toggleButton(product.id)}
                      className={`px-4 py-2 text-white relative bottom-14 left-14 drop-shadow-2xl rounded-md ${
                        Carts ? "bg-fuchsia-400" : "bg-fuchsia-950"
                      }`}
                    >
                      {Carts ? "Remove Cart" : "Add to cart"}
                    </button>
                  </div>
                );
              })}
              </div>
              </div>
              </div>
  
      <Routes>
        <Route path="/CartPage" element={<CartPage model={model} products={products} openButton={openButton} 
        quantities={quantities} setQuantities={setQuantities} decrementQuantity={decrementQuantity}
        incrementQuantity={incrementQuantity} removeItem={removeItem} closeButton={closeButton} 
        setProducts={setProducts} calculateTotal={calculateTotal} setModel={setModel}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
















