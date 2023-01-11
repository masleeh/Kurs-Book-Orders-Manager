import React, {useState, useEffect} from "react";
import OrderItem from "./order-item";
import axios from "axios";
import { IOrder } from "../types/types";
import Filter from "./filters";
import Sort from './sort'

interface OrdersList {
    orders: IOrder[],
    count: number
}

const Orders:React.FC = () => {
    const [ordersData, setOrdersData] = useState<IOrder[]>([]);

    const getOrders = async (typeSort?:string) => {
        try {
            let url:string = 'http://localhost:5000/api/v1/orders'
            if (typeSort) {
                url = `http://localhost:5000/api/v1/orders?sort=${typeSort}`
            }
            const token = localStorage.getItem('authToken')
            const response = await axios.get<OrdersList>(url, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            setOrdersData(response.data.orders)
            return Promise.resolve(response.data.orders)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOrders()
    }, [])


    const renderedOrders = ordersData.map((order:IOrder) => {
        return (
            <OrderItem 
                key={order._id}
                name={order.name}
                country={order.country}
                region={order.region}
                city={order.city}
                street={order.street}
                index={order.index}
                house={order.house}
                appartment={order.appartment}
                phone={order.phone}
                email={order.email}
                variant={order.variant}
                quant={order.quant}
                status={order.status}
                _id={order._id}
                createdAt={order.createdAt}
            />
        )
    })

    const filterOrders = async (category:string) => {
        const newItems = await getOrders()
        if (category === 'all') {
            return
        }
        setOrdersData(newItems!.filter(item => item.status === category))
    }

    const sortOrders = async (method:string) => {    
        getOrders(method)
    }

    return (
        <div className="manager-main-show">
            <div className="filters-sorts"><Filter filterOrders={filterOrders}/>
            <Sort sortOrders={sortOrders} /></div>
            <div className="orders-wrapper">
                {renderedOrders}
            </div>
        </div>
    )
}

export default Orders