import React, { useContext } from "react";
import { Context } from "./ParentCart";


const DeleteBtn = (props) => {
  
    const {obj,setDuplicate,collection}= useContext(Context);
        const deleteData = () => {
            let a = collection?.filter(e => e.id!==obj.id);
            console.log("a:",a);
        setDuplicate(a);
        refSearch.current = a;
    }
    
    return (
        <>
        <button  onClick  = {deleteData} id = "negative">Delete</button>
        </> 
    );
}

export default DeleteBtn;
