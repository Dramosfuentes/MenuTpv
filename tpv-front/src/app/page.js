'use client'

import { useEffect, useState } from "react";
import { Category } from "./components/Category";
import { Table } from "./components/Table";
import { getCategories } from "./services/getCategory";



/*
const categories = [
  {
    id: 1,
    name: "Bebidas",
    className: "text-white bg-blue-700 hover:bg-red-800",
    subItems: [
      { id: 101, name: "Coca Cola", price: 1.5 },
      { id: 102, name: "Fanta", price: 1.4 },
      { id: 103, name: "Agua", price: 1.0 },
      { id: 104, name: "Cerveza", price: 2.0 }
    ]
  },
  {
    id: 2,
    name: "Cafes",
    className: "bg-amber-700 hover:bg-amber-800",
    subItems: [
      { id: 201, name: "Expreso", price: 1.2 },
      { id: 202, name: "Cortado", price: 1.3 },
      { id: 203, name: "Capuchino", price: 1.8 },
      { id: 204, name: "Americano", price: 1.5 }
    ]
  },
  {
    id: 3,
    name: "Postres",
    className: "bg-emerald-700 hover:bg-emerald-800",
    subItems: [
      { id: 301, name: "Tarta", price: 2.5 },
      { id: 302, name: "Helado", price: 2.0 },
      { id: 303, name: "Fruta", price: 1.8 },
      { id: 304, name: "Flan", price: 2.2 }
    ]
  },
  {
    id: 5,
    name: "Carnes",
    className: "bg-purple-700 hover:bg-purple-800",
    subItems: [
      { id: 501, name: "Ternera", price: 5.0 },
      { id: 502, name: "Cerdo", price: 4.5 },
      { id: 503, name: "Pollo", price: 4.0 },
      { id: 504, name: "Cordero", price: 6.0 }
    ]
  },
  {
    id: 6,
    name: "Pescado",
    className: "bg-purple-700 hover:bg-blue-800",
    subItems: [
      { id: 501, name: "Cherne", price: 5.0 },
      { id: 502, name: "Salmon", price: 4.5 },
      { id: 503, name: "Abadejo", price: 4.0 },
      { id: 504, name: "pulpo", price: 7.0 }
    ]
  }
];
*/
const TableData = [
  {
    id: 1,
    number : 1,
    comensales : 4,
},
{
  id: 2,
  number : 2,
  comensales : 2,
},
{
  id: 3,
  number : 4,
  comensales : 4,
}
];


export default function Home() {
  const [selectedSubItems, setSelectedSubItems] = useState([]);
  const [order, setOrder] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([])


  useEffect(() => {

    function fetchData() {
      getCategories()
        .then((data) => setCategories(data.data))
        .catch(error => console.log("error:", error))
    }

    fetchData()
  }, [])

  const handleSubItem = (subItem) => {
    setOrder([...order, subItem])
    setShowModal(true)
  }

  const removeItem = (id) => {
    const updatedOrder = order.filter((item) => item.id !== id);
    setOrder(updatedOrder);
    if (updatedOrder.length === 0) {
      setShowModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleClick = (category) => {
    setSelectedSubItems(category['sub_items'])
  }

  const totalPrice = order.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/2 flex flex-col border-r border-black">
        <div className="flex flex-col md:flex-row gap-2 flex-wrap h-full border-b border-black p-6">
          {categories.map(category => (
            <Category
              key={category.id}
              onClick={() => handleClick(category)}
              className={category.classname}
            >
              {category.name}
            </Category>
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-2 flex-wrap h-full p-6">
          {selectedSubItems.map((subItem, index) => (
            <div
              key={index}
              onClick={() => handleSubItem(subItem)}
              className="bg-gray-200 py-2 px-4 h-fit rounded-lg cursor-pointer"
            >
              {subItem.name}
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 p-6">Aqui estaran las mesas representadas</div>

      {showModal && (
        <div className="absolute top-1/2 left-2/3 -translate-1/2 flex items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Pedido</h2>
            <ul>
              {order.map((item, index) => (
                <li key={item.id} className="flex justify-between py-1 border-b items-center">
                  <span>{item.name} - ${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition text-sm"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
            <div className="font-bold text-right mt-4">
              Total: &euro;{totalPrice.toFixed(2)}
            </div>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}


    </div>
  );
}
