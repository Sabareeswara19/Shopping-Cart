import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { Context } from "./ParentCart";



const CartHistory = () => {


    const[box,setBox]=useState(false);
    const[taken,setTaken]=useState([]);
    const[bill,setBill] = useState();
    // const{completedArr} = props;
    const {completedArr} = useContext(Context);


    let headList = ["S.no","Date","Total","Action"];

    const handleAction =  (col,total) => {
      setBox(true);
        setTaken(col);
        setBill(total);

    }

    return(
        <>
           <table border="1">
                <thead>
                    {
                        headList?.map(ele => <td>{ele}</td>)
                    }
                </thead>

                <tbody>
                    {
                        completedArr?.map((obj,index) => <tr>
                            <td>{1+index}</td>
                            <td>{obj.date}</td>
                            <td>{obj.total}</td>
                            <td>  <FaEye  onClick = {() => handleAction(obj.col,obj.total)}/> </td>
                    
                        </tr>)
                    }
                </tbody>
           </table>
           
            <Dialog
               open={box} onClose={()=> setBox(false)}>
                <DialogTitle >
                   <span> The Collected  </span>
                   <span style={{float:"right",color:"red"}} onClick={() => setBox(false)}> <GrClose /> </span>
                </DialogTitle>
                <DialogContent>
                    <table border="1">
                        <thead>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>TotalPrice</th>
                        </thead>

                        <tbody>
                            {
                                taken?.map(obj => <tr>
                                    <td>{obj.id}</td>
                                    <td>{obj.item}</td>
                                    <td>{obj.price}</td>
                                    <td>{obj.quantity}</td>
                                    <td>{obj.totalPrice}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                    <h4>Total Bill: {bill}</h4>
                </DialogContent>
            </Dialog>
           
        </>
    );
}

export default CartHistory;