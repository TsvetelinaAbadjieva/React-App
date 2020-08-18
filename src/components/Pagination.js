import React from 'react';
import './Pagination.css';
import { useState, useEffect } from 'react';


export default function Pagination({perPage,numberRows,paginate}){ 

    const[selectedPage,setSelectedPage] = useState(1);

    let numberPages = Math.ceil(numberRows/perPage);
    let pages = [];
    for(var i=1; i<=numberPages;i++){
        pages.push(i);
    }

    function handleClickPage(index){
        for(var i=1; i<numberPages;i++){
            setSelectedPage(0);
        }
        setSelectedPage(index);
        paginate(index);
    }

    return(
        <div className="pagination-container">
            <ul className="pagination">  
            {pages.map(page=> <li key={page} onClick={(e)=>{handleClickPage(page)}} className={selectedPage == page ? ' active':''}><a href="#" type="button" className={selectedPage == page ? ' active':''} >{page}</a></li>
            )}  
            </ul>
        </div>
    )
}
