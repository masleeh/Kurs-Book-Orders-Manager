import React, {useState} from "react";
import { IOrder } from "../types/types";
import axios from 'axios'

const OrderItem:React.FC<IOrder> = (props) => {
    const [isShown, setIsShown] = useState<boolean>(false)
    const [copyOrder, setCopyOrder] = useState<IOrder>({...props})
    const [allowEdit, setAllowEdit] = useState<boolean>(false)

    const toggleShow = () => {
        if (isShown) {
            setAllowEdit(false)
        }
        setIsShown(!isShown)
    }

    
    const handleChangeOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        const editedOrder = {...copyOrder, [name]: value}
        setCopyOrder(editedOrder)
    }

    const btnStatus = ():string => {
        if (copyOrder.status === 'done') {
            return 'Mark as undone'
        }
        else if (copyOrder.status === 'created') {
            return 'Mark as sent'
        }
        else return 'Mark as done'
    }

    const changeStatus = ():void => {
        if (copyOrder.status === 'done') {
            const updatedStatus = {...copyOrder, status: 'created'}
            setCopyOrder(updatedStatus)
        }
        else if (copyOrder.status === 'created') {
            const updatedStatus = {...copyOrder, status: 'sent'}
            setCopyOrder(updatedStatus)
        }
        else if (copyOrder.status === 'sent') {
            const updatedStatus = {...copyOrder, status: 'done'}
            setCopyOrder(updatedStatus)
        }
    }


    const toggleAllowEdit = () => {
        if (allowEdit) {
            updateOrder()
        }
        setAllowEdit(!allowEdit)
    }

    const updateOrder = async () => {
        try {
            const token = localStorage.getItem('authToken')
            const response = await axios.patch(`http://localhost:5000/api/v1/orders/${copyOrder._id}`, copyOrder, {
                headers: {
                    Authorization: "Bearer " + token
            }})
        } catch (error) {
            console.log(error)
        }
    }

    const deleteOrder = async () => {
        try {
            const token = localStorage.getItem('authToken')
            const response = await axios.delete(`http://localhost:5000/api/v1/orders/${copyOrder._id}`, {
                headers: {
                    Authorization: "Bearer " + token
            }})
            copyOrder._id = "Deleted order"
            setIsShown(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="order" style={{backgroundColor: isShown ? '#d9d9d9' : '#f5f5f5'}}>
            <div className="order-row">
                <h1 className="order-id">Order: #{copyOrder._id}</h1>
                <div className={copyOrder.status === 'done' ? "order-status done" : (
                    copyOrder.status === 'sent' ? "order-status sent" : "order-status created")}>Status: {copyOrder.status}</div>
            </div>
            <h1 className="order-title">Name:</h1>
            <div className="order-row">
                <input 
                    name="name" readOnly={!allowEdit} 
                    className={allowEdit ? "order-white-label bigone edit-allow" :"order-white-label bigone"}  
                    value={copyOrder.name} 
                    onChange={handleChangeOrder}/>
                <button className="order-show-btn" onClick={toggleShow}>Show <img className={isShown ? 'show-vector' : 'show-vector untoggled'} src='/images/show-vector.svg'/></button>
            </div>

            {isShown && <>
                <div className="order-row">
                    <div><h1 className="order-title">Country:</h1>
                    <div className="order-white-label mediumone">Russia</div></div>

                    <div><h1 className="order-title">Region:</h1>
                    <input 
                        name='region' readOnly={!allowEdit} 
                        className={allowEdit ? "order-white-label mediumone edit-allow" :"order-white-label mediumone"} 
                        onChange={handleChangeOrder} 
                        value={copyOrder.region}/></div>
                </div>

                <div className="order-row">
                    <div><h1 className="order-title">City:</h1>
                    <input 
                        name='city' readOnly={!allowEdit} 
                        className={allowEdit ? "order-white-label mediumone edit-allow" :"order-white-label mediumone"}  
                        onChange={handleChangeOrder} 
                        value={copyOrder.city}/></div>

                    <div><h1 className="order-title">Street:</h1>
                    <input 
                        name='street' readOnly={!allowEdit} 
                        className={allowEdit ? "order-white-label mediumone edit-allow" :"order-white-label mediumone"} 
                        onChange={handleChangeOrder} 
                        value={copyOrder.street}/></div>
                </div>

                <div className="order-row">
                    <div><h1 className="order-title">House:</h1>
                    <input 
                        name='house' readOnly={!allowEdit} 
                        className={allowEdit ? "order-white-label mediumone edit-allow" :"order-white-label mediumone"} 
                        onChange={handleChangeOrder} 
                        value={copyOrder.house}/></div>

                    <div>{props.appartment !== '' && <><h1 className="order-title">Appartment:</h1>
                    <input 
                        name='appartment' readOnly={!allowEdit} 
                        className={allowEdit ? "order-white-label mediumone edit-allow" :"order-white-label mediumone"}  
                        onChange={handleChangeOrder} 
                        value={copyOrder.appartment}/></>}</div>
                </div>

                <div className="order-row">
                    <div><h1 className="order-title">Index: </h1>
                    <input 
                        name='index' readOnly={!allowEdit} 
                        className={allowEdit ? "order-white-label mediumone edit-allow" :"order-white-label mediumone"}  
                        onChange={handleChangeOrder} 
                        value={copyOrder.index}/></div>

                    <div><h1 className="order-title">Phone: </h1>
                    <input 
                        name='phone' readOnly={!allowEdit} 
                        className={allowEdit ? "order-white-label mediumone edit-allow" :"order-white-label mediumone"} 
                        onChange={handleChangeOrder} 
                        value={copyOrder.phone}/></div>
                </div>

                <h1 className="order-title">Email: </h1>
                <input 
                    name='email' readOnly={!allowEdit} 
                    className={allowEdit ? "order-white-label mediumone edit-allow" :"order-white-label mediumone"}  
                    onChange={handleChangeOrder} 
                    value={copyOrder.email}/>

                <div className="order-row">
                    <div>
                        <h1 className="order-title">Details: </h1>
                        <div className="order-white-label smallfit">{copyOrder.variant}: 
                        {copyOrder.variant === 'variant1' ? ` Dig. print. 15x22` : 'Offset pr. 14x20'}</div></div>
                    <div>
                        <h1 className="order-title">Created at: </h1>
                        <div className="order-white-label mediumone">{copyOrder.createdAt.split('T')[0]}</div>
                    </div>
                </div>
                
                <div className="order-row">
                    <div><h1 className="order-title">Quantity: </h1>
                    <div className="order-white-label mediumone">{copyOrder.quant}</div></div>
                    
                    <div><h1 className="order-title">Price: </h1>
                    <div className="order-white-label mediumone">861 ₽</div></div>
                </div>

                <div className="btn-row">
                    <button className="order-status delete" onClick={deleteOrder}>Delete</button>
                    <button className="order-status edit" onClick={toggleAllowEdit}>{allowEdit ? 'Save' : 'Edit'}</button>
                    {allowEdit && <button className="order-status undone" onClick={changeStatus}>{btnStatus()}</button>}
                </div>
            </>}
        </div>
    )
}

export default OrderItem