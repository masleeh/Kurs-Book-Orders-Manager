import React, {useState} from 'react'

interface ISort {
    sortOrders: Function
}

const Sort:React.FC<ISort> = ({sortOrders}) => {
    const [sorts, setSorts] = useState([{name: 'date', active: false}, {name: 'name', active: false}])

    const sortsCompClick = (sortsNumber:Number, nameSorts:string) => {
        const newSorts = sorts.map((element, index:number) => {
            if (index === sortsNumber) {
                return {...element, active: true}
            }
            else {return {...element, active: false}}
        })
        setSorts(newSorts)
        sortOrders(nameSorts)
    }


    return (
        <><h1 className='filter-title'>Sort by:</h1>
        <div className='filters-wrapper'>
            <button className={sorts[0].active ? 'filter selected' : 'filter'} onClick={() => sortsCompClick(0, sorts[0].name)}>Date</button>
            <button className={sorts[1].active ? 'filter selected' : 'filter'} onClick={() => sortsCompClick(1, sorts[1].name)}>Name</button>
        </div></>
    )
}

export default Sort