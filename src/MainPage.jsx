import { useEffect, useState } from "react";

function MainPage() {
    const [product, setProducts] = useState([]);
    const [openButton, closeButton] = useState([]);
    const [count, setCount] = useState(0);
    const [model, setModel] = useState(false);
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
      return product
        .filter((products) => openButton.includes(products.id))
        .reduce(
          (total, products) =>
            total + parseInt(products.price / 10) * (quantities[products.id] || 1),
          0
        );
    };
  
    return (
      <>
        <nav className="w-full bg-fuchsia-950">
            <div className="flex flex-row gap-20">
<img src="https://st4.depositphotos.com/20435048/23412/v/450/depositphotos_234121474-stock-illustration-lets-shopping-logo-design-template.jpg" 
 className="mx-6 my-4 h-28 rounded-full"></img>
                <div className="text-white my-14 text-xl">Home</div>
                <div className="text-white my-14 text-xl">About</div>
                <div className="text-white my-14 text-xl">Product</div>
                <div className="text-white my-14 text-xl">Offers</div>
                <div className="text-white my-14 text-xl">Contact</div>
                <button onClick={()=>setModel(true)}>
                <img src="https://media.istockphoto.com/id/1371799921/vector/shopping-cart-icon-with-long-shadow-on-blank-background-flat-design.jpg?s=612x612&w=0&k=20&c=2IxbpxSInsWm30hUV7-WcScSjdJYt20k5Gfg7G77mYk=" 
                className="h-28 w-28 mx-36 my-4 rounded-full"></img>
                <div className="bg-fuchsia-500 rounded-full w-8 h-8 relative bottom-24 left-52 text-xl text-center">{count}</div>
                </button>
                </div>
            </nav>
  
        <div className="min-h-screen flex flex-col items-center bg-fuchsia-200">
          <div className="w-full p-6 overflow-y-auto">
            <div className="sm:grid grid-cols-1 grid md:grid-cols-4 lg:grid grid-cols-4 gap-6">
              {product.map((products) => {
                const Carts = openButton.includes(products.id);
                return (
                  <div key={products.id} className="p-4 bg-white rounded-lg shadow-md">
                    <img
                      className="object-cover w-full h-48 rounded-md"
                      src={products.image}
                    />
  
                    <h3 className="mt-2 text-black text-lg font-semibold text-left my-4">
                      {products.category}
                    </h3>
                    <p className="text-left inline-block px-2 relative bottom-4 right-20 line-through my-2">
                      {products.price}
                    </p>
                    <p className="inline-block relative bottom-4 right-20">10%</p>
                    <p className="bg-amber-200 mx-20 relative bottom-4 right-20 text-base font-semibold text-red-800">
                      {products.price / 10}
                    </p>
  
                    <button
                      onClick={() => toggleButton(products.id)}
                      className={`px-4 py-2 text-white relative bottom-14 left-14 drop-shadow-2xl rounded-md ${
                        Carts ? "bg-fuchsia-400" : "bg-fuchsia-950"
                      }`}
                    >
                      {Carts ? "Remove Cart" : "Add to cart"}
                    </button>
                  </div>
                );
              })}
  
              {model && (
                <div className="py-10 absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-fuchsia-900 box-border h-screen overflow-y-auto w-4/12 p-4 border-4 bg-white">
                    {product.map((products) => {
                      const Cartss = openButton.includes(products.id);
                      if (Cartss) {
                        return (
                          <div key={products.id} className="p-4 bg-white shadow-md">
                            <img
                              className="object-cover w-48 h-48 rounded-md"
                              src={products.image}
                            />
  
                            <h3 className="mt-2 text-black text-lg font-semibold text-right my-4 relative bottom-40 right-8">
                              {products.category}
                            </h3>
                            <p className="text-right font-semibold relative bottom-40 right-24">
                              {products.price / 10}
                            </p>
  
                            <button
                              onClick={() => decrementQuantity(products.id)}
                              className="bg-fuchsia-200 px-8 my-6 inline-block text-xl text-right relative bottom-40 left-20"
                            >
                              -
                            </button>
                            <div className="inline-block text-xl px-6 text-right relative bottom-40 left-20">
                              {quantities[products.id] || 1}
                            </div>
                            <button
                              onClick={() => incrementQuantity(products.id)}
                              className="bg-fuchsia-200 px-8 inline-block text-xl text-right relative bottom-40 left-20"
                            >
                              +
                            </button>
                            <hr className="relative bottom-36 border-gray-700" />
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
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default MainPage;
  