import React from 'react';
import {useState, useEffect} from 'react';
import  './EmployeeDetails.css';
import Label from './Label';
import BackgroundDropdown from './Dropdown';

export default function EmployeeDetails(props){
    let defaultStyle = {label:'',backgroundColor:'white'};

    const checkExistingStyle =()=>{
        let styleStr = localStorage.getItem(props.employee.index);
        let style = {};

        if(styleStr){
             style = JSON.parse(styleStr);
        }
        return !styleStr ? defaultStyle : style;
    }
    var _style = checkExistingStyle();

    const[display,setDisplay] = useState('none');
    const[label,setLabel] = useState(_style.label);
    const[backgroundColor,setBackgroundColor]=useState(_style.backgroundColor);
    const[styleChanged,setStyleChanged] = useState(false);

    useEffect(() => applyStyle(label,backgroundColor),[label,backgroundColor]);

    const applyStyle=(label,backgroundColor)=>{
        if(styleChanged){
            let style = Object.assign({},_style, {label:label,backgroundColor:backgroundColor});
            localStorage.setItem(props.employee.index,JSON.stringify(style));

            setStyleChanged(false);
        }
    }
    const setParentLabel = (label)=>{
        setLabel(label);
        setStyleChanged(true);
    }
    const setParentBackground = (backgroundColor)=>{
        setBackgroundColor(backgroundColor);
        setStyleChanged(true);
    }

    return(
        <div  className="employee-item" key={props.employee.uuid} style={{'backgroundColor':backgroundColor ? backgroundColor:'white'}}>
            <div className="avatar">
                <img src={props.employee.avatar} onClick={(e)=>{setDisplay('block');}}/>
                {/* <img src="../../images/profile_icon.png" onClick={(e)=>{setDisplay('block')}}/> */}
            </div>
            <div className="info">
                <h4>{props.employee.company}</h4>
                <p>{props.employee.name}</p>
                <p>{props.employee.title}</p>
                <p>{props.employee.bio}</p>
            </div>
            <div className="controls">
                <div className="label" style={{'display':label ? 'block':'none'}}>{label}</div>
                <Label setLabel={setParentLabel} />
                <BackgroundDropdown setBackgroundColor={setParentBackground} employee={props.employee}/>
            </div>
            <div key={props.employee.uuid} className="preview" style={{'display':display,'backgroundImage':`url(${props.employee.avatar})`,'backgroundRepeat':'no-repeat','backgroundSize':'cover','objectFit':'cover'}} onClick={(e)=>setDisplay('none')}></div>
            {/* <div key={props.employee.uuid} className="preview" style={{'display':display,'backgroundImage':`url(../../images/profile_icon.png)`,'backgroundRepeat':'no-repeat','backgroundSize':'cover','objectFit':'cover'}} onClick={(e)=>setDisplay('none')}></div> */}
        </div>
    );
}