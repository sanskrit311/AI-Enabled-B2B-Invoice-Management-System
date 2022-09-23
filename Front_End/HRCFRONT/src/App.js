
import './App.css';
import React, { useState } from 'react';
import { Header } from './Components/Header';
import { Toolbar } from '@mui/material';

import { Container } from '@mui/material';
import { Footer } from './Components/Footer';
import Buttons from './Components/Buttons';
import GridContainer from './Components/GridContainer';
import Btn from './Components/Btn';

var cors = require('cors')
var app=cors();
function App() {
const [q, setQ] = useState("");
const [selected,setSelected]=useState([])
const [data,setnewData]=useState([]);
const [refetch,setrefetch]=useState(false);


  return (<>
    
     <Header/>

      <Btn selected={selected}  setQ={setQ} data={data} setrefetch={setrefetch} refetch={refetch} setnewData={setnewData} />
     
      <GridContainer setSelected={setSelected} selected={selected} q={q} setrefetch={setrefetch} refetch={refetch} setnewData={setnewData} data={data}/>

      {/*<Bargraph/>  */}
     <Footer/>
  
    </>
  );
}

export default App;
