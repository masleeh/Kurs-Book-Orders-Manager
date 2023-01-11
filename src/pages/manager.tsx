import React from "react";
import SideBtns from "../components/side-btns";
import Orders from "../components/orders";
import {Route, Routes} from 'react-router-dom';
import Stats from "../components/statistics";

const Manager:React.FC = () => {
    return (
        <div className="grey-container">
            <div className="manager">
                <SideBtns />
                <Routes>
                    <Route path="orders" element={<Orders />}/>
                    <Route path="stats" element={<Stats />}/>
                </Routes>
            </div>
        </div>
    )
}


export default Manager