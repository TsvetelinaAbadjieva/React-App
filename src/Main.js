import React from 'react';
import {useState, useEffect} from 'react';
import ListEmployee from './components/ListEmployee';
import http from './http/http_hook';
import BASE_URL from './constants/constant';
import Pagination from './components/Pagination';
import Search from './components/Search';


function Main() {
  const perPage=20;
  const[employees, setEmployees] = useState([]);
  const[numberRows,setNumberRows] = useState(0);
  const[currentPage,setCurrentPage] = useState(1);
  const[search,setSearch] = useState('');
  const[filteredEmployees,setFilteredEmployees] = useState([]);
  const[date,setDate] = useState(new Date()); 

  useEffect(()=>{getEmployees()},[search,currentPage]);
  function getEmployees(){
    let params = {};
    setCurrentPage(currentPage);

    if(search){
      params={search:JSON.stringify(findByQuery())}
    }
    http(BASE_URL+'/list?page='+currentPage+'&per_page='+perPage,params)
      .then(res=>{ 
        setNumberRows(res.data.count)
        setFilteredEmployees(res.data.data);
        setEmployees(res.data.data);
        setDate(res.data.date);
      })
      .catch(error=>{
          console.log('Error',error)
      })
}
const findByQuery = () =>{
  let keys = Object.keys(localStorage);
  let foundItems = keys.filter(key=>JSON.parse(localStorage.getItem(key)).label.toLowerCase().includes(search.toLowerCase()))
  return foundItems;
}

const paginate = (page) => setCurrentPage(page);
let fromItem =(currentPage-1)*perPage;
let toItem = fromItem + perPage;

  return (
    <div className="App">
      <header className="App-header">Employee List</header>
        <Pagination perPage={perPage} numberRows={numberRows} paginate={paginate}/>        
        {/* <div key="0"><label>{date.toString()}</label></div> */}
        <div className="search-wrapper">
          <div className="search-container">
              <Search setSearch={setSearch} paginate={paginate}/>
          </div>
      </div>
      <ListEmployee employees={employees||[]}/>
    </div>
  );
}

export default Main;
