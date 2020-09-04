import React from "react"; 
import EmployeeDetails from './EmployeeDetails';


function ListEmployee (props) {
    return (
        <>
            <div className="employee-container">    
            {props.employees.map((employee,index)=>(
                <div className="employee-list-wrapper" key={employee.index}>
                    <EmployeeDetails employee={employee} key={employee.index}/>
                </div>
                ))}
            </div>
            {(!props.employees || props.employees.length==0) ? <div className="employee-container">No items found</div>:'' }
        </>

    )
  }
  
  export default ListEmployee;