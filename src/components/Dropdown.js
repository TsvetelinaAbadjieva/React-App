import React from 'react';
import './Dropdown.css';
import {useState, useEffect} from 'react';

const BackgroundDropdown=(props)=>{
    const colors=[{
        backgroundColor:'rgb(0, 184, 217)',
        label:'Ocean'
    },{
        backgroundColor:'rgb(13 80 204)',
        label:'Blue'
    },{
        backgroundColor:'rgb(82, 67, 170)',
        label:'Purple'
    },{
        backgroundColor:'rgb(255, 86, 48)',
        label:'Red'
    },{
        backgroundColor:'rgb(255, 139, 0)',
        label:'Yellow'
    },{
        backgroundColor:'rgb(0, 135, 90)',
        label:'Forest'
    },{
        backgroundColor:'rgb(37, 56, 88)',
        label:'Slate'
    },{
        backgroundColor:'white',
        label:'White'
    },
]
    let currentItem = localStorage.getItem(props.employee.uuid);
    let background = currentItem ? JSON.parse(currentItem).backgroundColor:'white';
    const [backgroundColor,setBackgroundColor]=useState(background);
    useEffect(()=>props.setBackgroundColor(backgroundColor));

    return(
        <div class="dropdown">
            <button class="dropbtn">Dropdown</button>
            <div class="dropdown-content">
                {colors.map((color,index)=><a href="#" key={index} style={{'backgroundColor':color.backgroundColor}} onClick={()=>{ setBackgroundColor(color.backgroundColor)}}>{color.label}</a>)}
            </div>
        </div>
    )
}
export default BackgroundDropdown;