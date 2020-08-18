import React from "react"; 
import EmployeeDetails from './EmployeeDetails';


function ListEmployee (props) {
    // const username ='hard';
    // const password ='hard';
    // const[employees, setEmployees] = useState([]);
    // const[numberRows,setNumberRows] = useState(0);

    // const options = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Basic ' + btoa(username + ':' + password)
    //     }
    // };

    // useEffect(()=>{getEmployees()},[]);

    //  function getEmployees(){
    //     http(BASE_URL+'/list')
    //     .then(response=>response.json())
    //     .then(data=>{ 
    //         data = data.slice(0,15);
    //         setEmployees(data.slice(0,15));
    //         console.log('LENGTH',data.length)
    //         setNumberRows(data.length)
    //     })
    // }

    return (
        <div className="employee-container">   
        {/* <Pagination perPage={10} numberRows={props.numberRows}/> */}
    
        {props.employees.map(employee=>(
            <div className="employee-list-wrapper">
                <EmployeeDetails employee={employee} key={employee.uuid}/>
            </div>
            ))}
        </div>
    )
  }
  
  export default ListEmployee;