import React,{useState} from 'react';
import './Label.css';

const Search = (props) => {
    const[search,setSearch]=useState('');
    const handleClick=(e)=>{
        e.preventDefault();
        props.setSearch(search.trim())
        setSearch('');
    }
    return(
    <div className="employee-label-input">
        <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Type here"/>
        <button onClick={(e)=>{handleClick(e)}} className="employee-label-btn">Find</button>
    </div>
    )
}
export default Search;