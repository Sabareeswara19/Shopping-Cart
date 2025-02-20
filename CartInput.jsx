import { useLocation } from 'react-router-dom';
import { Context} from './ParentCart';
import './Styling.css';

import React,{useEffect, useState,useRef, useContext} from "react";

const CartInput = (props) => {

    const{obj,setObj,collection,setCollection,duplicate,setDuplicate} = useContext(Context);
    console.log("uselocation:",useLocation());       
    const concenRef = useRef();  // focus ref
    // const locate= useLocation();

    useEffect(() => {
        concenRef.current.focus();
    },[])

    const handleObj =(e) =>{
        setObj({...obj,[e.target.name]:e.target.value});
    }
  
    const saveData = () => {
        const newId = (collection?.length>0) ?(collection[collection.length-1].id+1):1;

        if(obj.item)
        {
            if(obj.id)
            {
                setDuplicate(collection.map(ele => ele.id===obj.id ?{...ele,...obj}:ele))
                setCollection(collection.map(ele => ele.id===obj.id ?{...ele,...obj}:ele))
            }   
            else{
            let a = duplicate.some(e => e.item.toUpperCase() === obj.item.toUpperCase());
                if(a)
                {
                    alert("Item existed");
                }
                else
                {
                    setDuplicate([...duplicate,{...obj,id:newId}]);
                    setCollection([...collection,{...obj,id:newId}]);
                }
            }
            setObj({id:"",item:"",quantity:1,status:"pending",price:"",totalPrice:0});
        }
        else{
            alert("Enter data, empty fields are not allowes");
        } 
        concenRef.current.focus(); 
    }

    return(
        <>   
            {
                // locate.pathname === '/header/cartinput' ? alert("Add Items") :null
            }         
            {
                 <div id = "inputForm">
                    <lable for="item">Item:</lable>
                    <input type = "text" id ="item" name = "item" value = {obj.item} ref = {concenRef}     onChange={handleObj} placeholder="enter item.."/> 
                    <lable for="quantity">Quantity:</lable>
                    <input type = "number" id ="quantity" name = "quantity" onChange={handleObj} value = {obj.quantity}/>
                    <lable for="price">Single Piece Price:</lable>
                    <input type = "number" id ="price" name = "price" onChange={handleObj} value = {obj.price}/>
                    <br></br>
                    <br></br>
                    <br></br>
                    <button type = "button"  onClick = {saveData}>Add</button>
                    <br></br> 
                </div> 
            } 
        </>
    );

}

export default CartInput;

