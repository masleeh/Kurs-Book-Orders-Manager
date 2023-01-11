import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

interface ISideBtns {
    name: string,
    active: boolean,
    navigate: string
}

const SideBtns:React.FC = () => {

    const [sideBtns, setSideBtns] = useState<ISideBtns[]>([{
        name: 'Orders',
        active: true,
        navigate: 'orders'
    }, {
        name: 'Stats',
        active: false,
        navigate: 'stats'
    }])

    const navigateSide = useNavigate()

    const sideBtnsClick = (navigate:string, btnNumber:number) => {
        const newSideBtns = sideBtns.map((item, index) => {
            if (index === btnNumber) {
                return {...item, active: true}
            }
            else {
                return {...item, active: false}
            }
        })
        setSideBtns(newSideBtns)
        navigateSide(`/manager/${navigate}`)
    }

    const renderSideBtns = sideBtns.map((element:ISideBtns, index:number) => {
        return (
            <div key={element.name} className={element.active ? "side-select side-select-active":"side-select"} onClick={() => sideBtnsClick(element.navigate, index)}>{element.name}</div> 
        )
    })

    return (
        <div className="manager-side-btns">
            <div className="manager-side-btns-wrapper">
                {renderSideBtns}
            </div>
        </div>
    )
}

export default SideBtns