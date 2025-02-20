import React, { createContext, useState } from "react";

import { BrowserRouter, HashRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import CartInput from "./CartInput";
import CartShow from "./CartShow";
import CartHistory from "./CartHistroy";
import HeaderOfCart from "./HeaderOfCart";

export const Context = createContext();


const ParentCart = () => {
 
      const requiredItems = [
    { id: 1, item: "Book", quantity: 1, status: "pending", price: 15 },
    { id: 2, item: "Pen", quantity: 2, status: "pending", price: 5 },
    { id: 3, item: "Scale", quantity: 1, status: "pending", price: 10 },
    { id: 4, item: "Eraser", quantity: 1, status: "pending", price: 5 },
  ];

  const [obj, setObj] = useState({
    id: 0,
    status: "pending",
    quantity: 1,
    totalPrice: 0,
  });
  const [collection, setCollection] = useState(requiredItems); //org data
  const [duplicate, setDuplicate] = useState(requiredItems); //copy data
  const [search, setSearch] = useState(""); //search state
  const [completedArr, setCompletedArr] = useState([]); //completed stat
  const[bg,setBg]= useState('');



    return(
       <Context.Provider
        value={{
          obj,
          setObj,
          collection,
          duplicate,
          setCollection,
          setDuplicate,
          search,
          setSearch,
          completedArr,
          setCompletedArr,
          bg,setBg
        }}
      >
        <HashRouter>
          <Routes>
            <Route
              path="/header"
              element={
                <HeaderOfCart>
                  <Outlet />
                </HeaderOfCart >
              }
            >
              <Route path="/header/cartinput" element={<CartInput />} />
              <Route path="/header/showlist" element={<CartShow />} />
              <Route path="/header/history" element={<CartHistory />} />
            </Route>
          </Routes>
        </HashRouter>
      </Context.Provider> 
    );
}

export default ParentCart;