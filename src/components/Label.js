import React,{useState} from 'react';
import './Label.css';

const Label = (props) => {
    const[label,setLabel]=useState('');
    const handleClick=()=>{
        props.setLabel(label);
        setLabel('');
    }
    return(
    <div className="employee-label-input">
        <input type="text" value={label} onChange={(e)=>setLabel(e.target.value)} placeholder="Add label"/>
        <button onClick={(e)=>{handleClick()}} className="employee-label-btn">Add label</button>
    </div>
    )
}
export default Label;