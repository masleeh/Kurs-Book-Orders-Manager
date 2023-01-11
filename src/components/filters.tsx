import React, { useState } from 'react'

interface FilterList {
    filterOrders: Function
}

interface filtersArray {
    name: string,
    active: boolean
}

const Filter:React.FC<FilterList> = ({filterOrders}) => {
    const [filters, setFilters] = useState<filtersArray[]>([
        {name: 'all', active: true}, {name: 'created', active: false}, {name: 'sent', active: false}, {name: 'done', active: false} 
    ])

    const filtersCompClick = (filterNumber:number, nameFilter:string) => {
        const newFilters = filters.map((element, index:number) => {
            if (index === filterNumber) {
                return {...element, active: true}
            }
            else {return {...element, active: false}}
        })
        setFilters(newFilters)
        filterOrders(nameFilter)
    }

    return (
        <><h1 className='filter-title'>Filters:</h1>
        <div className='filters-wrapper'>
            <button className={filters[0].active ? 'filter selected' : 'filter'} onClick={() => filtersCompClick(0, filters[0].name)}>All</button>
            <button className={filters[1].active ? 'filter selected' : 'filter'} onClick={() => filtersCompClick(1, filters[1].name)}>Created</button>
            <button className={filters[2].active ? 'filter selected' : 'filter'} onClick={() => filtersCompClick(2, filters[2].name)}>Sent</button>
            <button className={filters[3].active ? 'filter selected' : 'filter'} onClick={() => filtersCompClick(3, filters[3].name)}>Done</button>
        </div></>
    )
}

export default Filter