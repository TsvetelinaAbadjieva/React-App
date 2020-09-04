import React from 'react';
import './Dropdown.css';
import {useState, useEffect} from 'react';
import colors from '../constants/colors';

const BackgroundDropdown=(props)=>{
    let currentItem = localStorage.getItem(props.employee.index);
    let background = currentItem ? JSON.parse(currentItem).backgroundColor:'white';
    const [backgroundColor,setBackgroundColor]=useState(background);
    useEffect(()=>props.setBackgroundColor(backgroundColor));

    return(
        <div className="dropdown">
            <button className="dropbtn">Background</button>
            <div className="dropdown-content">
                {colors.map((color,index)=><a href="#" key={index} style={{'backgroundColor':color.backgroundColor}} onClick={()=>{ setBackgroundColor(color.backgroundColor)}}>{color.label}</a>)}
            </div>
        </div>
    )
}
export default BackgroundDropdown;