import React, { useState, useEffect } from "react";
import "./orders.css";
import { useStateValue } from "./StateProvider";
import Order from "./Order";

function Orders () {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

//    useEffect(()=>{
//        if(users){
//            db
//            .collection("users")
//            .doc(user?.uid)
//            .collection('order')
//            .orderBy('created', 'desc')
//            .onSnapshot(snapshot => (
//                setOrders(snapshot.docs.map((doc) => ({
//                    id: doc.id,
//                    data: doc.data()
//                })))
//            ))
//        } else {
//            setOrders([])
//        }
//                
//    }, [user]);
    return(
        <div className="orders">
            <h1>Your orders</h1>
            <div className="orders__order">
under construction...
//                {orders?.map((order, i) => ( <Order key={"order_"+i} order={order} />              ))}
            </div>
        </div>
    )
}

export default Orders;
