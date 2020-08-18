import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import ListEmployee from './components/ListEmployee';
import http from './http/http_hook';
import BASE_URL from './constants/constant';
import Pagination from './components/Pagination';


function App() {
  const username ='hard';
  const password ='hard';
  const perPage=20;
  const[employees, setEmployees] = useState([]);
  const[numberRows,setNumberRows] = useState(0);
  const[currentPage,setCurrentPage] = useState(1);

  useEffect(()=>{getEmployees()},[]);

  function getEmployees(){
    http(BASE_URL+'/list')
    // .then(response=>response.json())
    .then(data=>{ 
        setNumberRows(data.data.length)
        setEmployees(data.data);
        console.log('LENGTH',data.length)
    })
    .catch(error=>console.log(error))
}
const paginate = (page) => setCurrentPage(page);
let fromItem =(currentPage-1)*perPage;
let toItem = fromItem + perPage;

const currentEmployees = employees.slice(fromItem,toItem);
console.log(currentEmployees)

  return (
    <div className="App">
      <header className="App-header">Employee List</header>
      <Pagination perPage={perPage} numberRows={numberRows} paginate={paginate}/>
      <ListEmployee employees={currentEmployees} />
    </div>
  );
}

export default App;
