import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "./ParentCart";

const CartShow = (props) => {
  
    const navigate = useNavigate();
    const {collection,setCollection,setObj,duplicate,setDuplicate,setSearch,
    completedArr,setCompletedArr,setBg} = useContext(Context);
    // const locate = useLocation();
    
 
    let headListShow = ["ID","ITEM","STATUS","Quantity","Delete","Edit","Price","Total Price"];


    const clickIncrement = (obj) => {

        let a = collection?.map(e => (e.id===obj.id) ?{...e,quantity:parseInt(e.quantity)+1}:e )
        setDuplicate((duplicate) => duplicate?.map(e => 
            (e.id===obj.id) ? {...e,quantity:parseInt(e.quantity)+1}:e)); // will update instantly
         setCollection(a);     // will update after rerendering after execution of block   
    }

    const clickDecrement = (obj) => {
        if(obj.quantity ===1)
        {
            alert("minimum cart limit reached");
        }
        else
        {
            let a = collection?.map(e => (e.id===obj.id) ?{...e,quantity: parseInt(e.quantity)-1}:e);
            setDuplicate((duplicate) => duplicate?.map(e => 
                (e.id===obj.id) ? {...e,quantity:e.quantity>1 ? parseInt(e.quantity)-1:e.quantity}:e));
            setCollection(a);
        }
    }

    const clickStatus = (obj) => {

        const newData =duplicate.filter(ele => {
            if(ele.id === obj.id && ele.status==="pending")
            {
                ele.status = "Taken";
            }
            else if(ele.id === obj.id && ele.status==="Taken")
            {
                ele.status = "pending";
            }
            return ele;
        })
        setDuplicate(newData);
        // setCollection(newData);
    };

    const editData = (obj) => {

        setObj(obj);
        navigate("/header/cartinput");
        setBg("/header/cartinput");
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
        const matchedItems =collection.filter(obj =>  (obj.item.includes(e.target.value)));
        setDuplicate(matchedItems); 

    }

    const handleStatusSearch = (e) => {
        setSearch(e.target.value);
        const statusMatched = collection.filter(obj => (obj.status.includes(e.target.value)));
        console.log("statusMatched :",statusMatched);
        setDuplicate(statusMatched);
    }

    const handleQuantitySearch = (e) => {
        setSearch(e.target.value);
        if(e.target.value==''){
            setDuplicate(collection);
        }else{
            const quantityMatched = collection?.filter(obj => obj.quantity == e.target.value)
            setDuplicate(quantityMatched);
        }
    }

    const handelAllSearch = (e) =>
    {
        setSearch(e.target.value);
        const searchMatched = collection?.filter(obj => (obj.item.includes(e.target.value) || obj.status.includes(e.target.value) || obj.quantity == e.target.value||obj.price==e.target.value))
        setDuplicate(searchMatched);  
    }  
  
    const handleCompleted = () => {
            let value = collection.reduce((acc,cost) => (acc+cost.totalPrice),0);
            let present =new Date();

            // Format the date as "YYYY-MM-DD" and time as "HH:mm:ss"
            const formattedDate = present.toISOString().split('T')[0]; // "2024-12-12"
            const formattedTime = present.toTimeString().split(' ')[0]; // "09:27:06"

            // Combine date and time
            const simpleDateTime = `${formattedDate} ${formattedTime}`;

            let  b= collection;
            // console.log("b: ",b);

            let obj = {date:simpleDateTime,total:value,col:b};
            // console.log("complt obj: ",obj);

            setCompletedArr([...completedArr,obj]);
            setObj({id:0,status:"pending",quantity:1,totalPrice:0});
            setCollection([]);
            setDuplicate([]);            
    }

    // console.log("ComArr: ",completedArr);

    const handleDelete =(obj) => {
        let a= collection?.filter(e => e.id!==obj.id);
        setDuplicate(a);
        setCollection(a);
    }


    return(
        <>
        <br></br>
        <label for ="search">Search:</label>
        <input type ="text"  onChange = {handleSearch} placeholder="item name"/>
        <input type = "text" onChange = {handleStatusSearch} placeholder = "item status"/>
        <input type ="number" onChange = {handleQuantitySearch} placeholder="quantity search" />
        <input type ="text" onChange = {handelAllSearch} placeholder="entire search..." />
    
        <h3>Count: <span>{duplicate?.length}</span></h3>

        <table id = "displayTable">
            <thead>
                {
                    headListShow?.map(ele => <th>{ele}</th>)
                }
            </thead>
            <tbody>
                {
                     collection?.map(e => {e.totalPrice=e.quantity*e.price})
                    
                     // bcz we are while we need to update in org collection also
                }
                {
                     duplicate?.map(e => {e.totalPrice=e.quantity*e.price})
                }
                      
                {
                    duplicate?.map((obj,index) => <tr>
                        <td>{obj.id}</td>  
                        <td>{obj.item}</td>
                        <td>
                            {obj.status}
                            <input type = "checkbox" checked ={obj.status==="Taken"} onClick = {()=> clickStatus(obj)}/>
                         </td>
                      
                        <td>
                            <button onClick ={()=>clickDecrement(obj)} id = "negative">-</button>
                                {obj.quantity}
                            <button onClick = {()=>clickIncrement(obj)} id = "positive">+</button>
                        </td>
                        <td> <button onClick={() => handleDelete(obj)}>delete</button> </td>
                        <td>   <button onClick = {() => editData(obj)} id= "positive">Edit</button> </td>
                        <td>{obj.price}</td>
                        <td>{obj.totalPrice}</td>
                    </tr>)
                }
            </tbody>
            <tfoot >                        
                     TotalCost: {collection?.reduce((acc,cost) => (acc+cost.totalPrice),0)}            
            </tfoot>
        
        </table>
        <br></br>
        <br></br>
        <button onClick = {handleCompleted}>Completed</button>
        </>
    );

}

export default CartShow;
