import React from 'react';
import {useState, useEffect} from 'react';
import  './EmployeeDetails.css';
import Label from './Label';
import BackgroundDropdown from './Dropdown';

export default function EmployeeDetails(props){
    console.log(props.employee)
    let defaultStyle = {label:'',backgroundColor:'white'};

    const checkExistinStyle =()=>{
        let styleStr = window.localStorage.getItem(props.employee.uuid);
        console.log(styleStr)

        let style = {};
        if(styleStr){
             style = JSON.parse(styleStr);
             console.log('PARSED' ,style)

        }
        return !styleStr ? defaultStyle : style;
    }
    var _style = checkExistinStyle();

    const[display,setDisplay] = useState('none');
    const[label,setLabel] = useState(_style.label)
    const[backgroundColor,setBackgroundColor]=useState(_style.backgroundColor)

    useEffect(() => applyStyle(label,backgroundColor),[label,backgroundColor]);

    const applyStyle=(label,backgroundColor)=>{
        console.log('Label background',label,backgroundColor);
        if(label || backgroundColor){
            let style = Object.assign({},_style, {label:label,backgroundColor:backgroundColor});
            localStorage.setItem(props.employee.uuid,JSON.stringify(style));
        }
    }
    const setParentLabel = (label)=>{
        setLabel(label);
    }
    const setParentBackground = (backgroundColor)=>{
        setBackgroundColor(backgroundColor);
    }

    return(
        <div  className="employee-item" key={props.employee.uuid} style={{'background-color':backgroundColor ? backgroundColor:'white'}}>
            <div className="avatar">
                <img src={props.employee.avatar} onClick={(e)=>{setDisplay('block');}}/>
            </div>
            <div class="info">
                <h4>{props.employee.company}</h4>
                <p>{props.employee.name}</p>
                <p>{props.employee.title}</p>
                <p>{props.employee.bio}</p>
            </div>
            <div className="controls">
                <div class="label" style={{'display':label ? 'block':'none'}}>{label}</div>
                <Label setLabel={setParentLabel} />
                <BackgroundDropdown setBackgroundColor={setParentBackground} employee={props.employee}/>
            </div>
            <div key={props.employee.uuid} className="preview" style={{'display':display,'background':`url(${props.employee.avatar})`,'backgroundRepeat':'no-repeat','backgroundSize':'cover','objectFit':'cover'}} onClick={(e)=>setDisplay('none')}></div>

             {/* <img key={props.employee.uuid} src={props.employee.avatar} className="preview" style={{'display':display,'background':`url(${props.employee.avatar})`,'backgroundRepeat':'no-repeat','backgroundSize':'cover'}} onClick={(e)=>setDisplay('none')}/> */}
        </div>
    );
}