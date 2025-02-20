import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./ParentCart";

const HeaderOfCart = ({children}) => {
    const navigate = useNavigate();

    const{bg,setBg} = useContext(Context);

    console.log("navigate:",navigate);

        const showForm  = () => {
            navigate("/header/cartinput",{state:"Hello"});
            setBg("/header/cartinput");
        }

        const showList  = () => {
            navigate("/header/showlist",{state:"display"})
            setBg("/header/showlist");
        }

        const hanldeHistory =() => {
            navigate("/header/history");
            setBg("/header/history")
        }


        return(
            <>
            <h1>Shopping Cart</h1>
            <div  className="headContainer">
                <div></div>
                <div></div>
                <div><button onClick={showForm} style={{backgroundColor: bg==="/header/cartinput" ? " darkcyan" :"transparent"}} >Form</button></div>
                <div><button onClick = {showList} style={{backgroundColor: bg==="/header/showlist" ? " darkcyan" : "transparent"}}>List</button></div>
                <div> <button onClick = {hanldeHistory} style={{backgroundColor: bg==="/header/history" ? " darkcyan" : "transparent"}}>History</button></div>
            </div>
            {children}
            </>

        );
}

export default HeaderOfCart;