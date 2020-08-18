import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import ListEmployee from './components/ListEmployee';
import http from './http/http_hook';
import BASE_URL from './constants/constant';
import Pagination from './components/Pagination';
import Search from './components/Search';


function App() {
  const perPage=20;
  const[employees, setEmployees] = useState([]);
  const[numberRows,setNumberRows] = useState(0);
  const[currentPage,setCurrentPage] = useState(1);
  const[search,setSearch] = useState('');
  const[filteredEmployees,setFilteredEmployees] = useState([]);

  useEffect(()=>{getEmployees()},[search,filteredEmployees]);

  function getEmployees(){
    if(search){
      filterEmplyeesByQuery();
      setEmployees(filteredEmployees);
      setCurrentPage(1);
      return
    }
    http(BASE_URL+'/list')
      .then(res=>{ 
          setNumberRows(res.data.length)
          setFilteredEmployees(res.data);
          setEmployees(res.data);
      })
      .catch(error=>{
          console.log('Error',error)
      })
}
const filterEmplyeesByQuery=()=>{
  let foundItems = findByQuery();
  let filtered = employees.filter(employee=>foundItems.includes(employee.uuid));
  setFilteredEmployees(filtered);
  setNumberRows(filtered.length);
}
const findByQuery = () =>{
  let keys = Object.keys(localStorage);
  let foundItems = keys.filter(key=>JSON.parse(localStorage.getItem(key)).label.toLowerCase()==search.toLowerCase())
  return foundItems;
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
      <Search setSearch={setSearch}/>
      <ListEmployee employees={currentEmployees} />
    </div>
  );
}

export default App;
