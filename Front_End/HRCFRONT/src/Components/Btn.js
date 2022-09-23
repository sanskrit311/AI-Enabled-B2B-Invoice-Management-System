
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ReplayIcon from '@mui/icons-material/Replay';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';



const Btn = ({selected,data,setQ,setnewData,getGrid,refetch,setrefetch}) => {
  
// console.log(selected);
    const [addopen, setaddOpen] = useState(false);
    const addOpen = () => setaddOpen(true);
    const addClose = () => setaddOpen(false);

    const [editopen, seteditOpen] = useState(false);
    const editOpen = () => seteditOpen(true);
    const editClose = () => seteditOpen(false);

    const [deleteopen, setdeleteOpen] = useState(false);
    const deleteOpen = () => setdeleteOpen(true);
    const deleteClose = () => setdeleteOpen(false);

    const [advanceopen, setadvanceOpen] = useState(false);
    const advanceOpen = () => setadvanceOpen(true);
    const advanceClose = () => setadvanceOpen(false);

    const [analyticseopen, setanalyticsOpen] = useState(false);
    const analyticsOpen = () => setanalyticsOpen(true);
    const analyticsClose = () => setanalyticsOpen(false);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    
    
    let delid = [];
    for(let i=0;i<selected.length;i++){
      delid.push(selected[i]["sl_no"])  
    }
    let predictid = [];
    for(let i=0;i<selected.length;i++){
      predictid.push(Number(selected[i]["doc_id"]))  
    }
    // console.log(predictid);
    
    
    
    
    const styles = {
         
        "&.MuiButton-outlined": {
            color: "white"
        },
        ":hover": {
            backgroundColor: "#6DB2E9"
        }



    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        bgcolor: '#2a3e4c',
        borderRadius: "5px",
        boxShadow: 24,
        color: "white",
        paddingTop: '8px',
        paddingRight: '20px',
        paddingBottom: '8px',
        paddingLeft: '20px',
       
    };
    const styleAdd = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1050,
        bgcolor: '#2a3e4c',
        borderRadius: "5px",
        boxShadow: 24,
        color: "white",
        p: 4,
    };
    const btnstyle={
        maxWidth: "200px",
        maxHeight: "33px", 
        minWidth: "200px",
        minHeight: "33px"
    }
    const modbtnstyle={
         maxWidth: "240px",
          maxHeight: "30px",
           minWidth:"240px",
            minHeight: "30px",
              marginRight: "9px",
              marginTop: "15px"
    }
     const textfield={
      backgroundColor: "white",
       marginLeft: "10px",
        marginRight: "10px",
        marginBottom:"30px",
        marginTop: "5px",
         borderRadius: "5px",
         color:'inherit',
         p:"7px"
         
        
    }


/********************add******************* */
    const url="http://localhost:8080/Highradius_B2B_project/AddInvoice1"
    const[adddata,setaddData]= useState({

          business_code:"",
          cust_number:"",
          clear_date:"",
          buisness_year:"",
          doc_id:"",
          posting_date:"",
          document_create_date:"",
          due_in_date:"",
          invoice_currency:"",
          document_type:"",
          posting_id:"",
          total_open_amount:"",
          baseline_create_date:"",
          cust_payment_terms:"",
          invoice_id:""
    })
function handle(e){
   const newData={...adddata}
   newData[e.target.id] = e.target.value
   setaddData(newData)
   console.log(newData)
}

    function submit(e)

   {

    e.preventDefault();



        axios.post(url,{

            business_code:adddata.business_code,

            cust_number:adddata.cust_number,

            clear_date:adddata.clear_date,

            buisness_year:adddata.buisness_year,

            doc_id:adddata.doc_id,

            posting_date:adddata.posting_date,

            document_create_date:adddata.document_create_date,

            due_in_date:adddata.due_in_date,

            invoice_currency:adddata.invoice_currency,

            document_type:adddata.document_type,

            posting_id:adddata.posting_id,

            total_open_amount:adddata.total_open_amount,

            baseline_create_date:adddata.baseline_create_date,

            cust_payment_terms:adddata.cust_payment_terms,

            invoice_id:adddata.invoice_id

        }).then(response => {

                console.log("response",response);
                reloaddatagrid()

                alert(response.data.status);
                addClose();

            });
            }
  
/****************Delete******************* */

const deleteCustomerByIds=()=>{
 
  console.log( "initial array",delid);
 
  axios
  .post('http://localhost:8080/Highradius_B2B_project/DeleteInvoiceFake',{'delid':delid})
  .then(response=>{
    console.log("response",response);
    reloaddatagrid();

    alert(response.data.status);
    deleteClose();
  })
   .catch(err=>alert(err));
}

 /****************Edit******************* */

 const [editdata,setEditdata]=useState({

  invoice_currency:"",
  cust_payment_terms:"",
 })

 function handleedit(e){
    const neweditData={...editdata}
    neweditData[e.target.id] = e.target.value
    setEditdata(neweditData)
    console.log(neweditData)
  }
 const editCustomerByIds=()=>{
 
  console.log( "initial array",selected);
 
  axios
  .post('http://localhost:8080/Highradius_B2B_project/EditInvoice',
  {'delid':delid,
  invoice_currency:editdata.invoice_currency,
  cust_payment_terms:editdata.cust_payment_terms,
  })
  .then(response=>{
    console.log("response",response);
    
    reloaddatagrid();
    alert(response.data.status);
     editClose();

   })
    .catch(err=>alert(err));
}
///////////////////////search////////////////////// 

// const [filterdata,setfilterdata]=useState([]);

// const handlefilter =(event)=>{
//   const searchword=event.target.value;
//   const newfilter=Data.filter((value)=>{
//     return value.cust_number.includes(searchword);
//   });
  // setfilterdata(newfilter);
 // setnewData(newfilter);
//   console.log(newfilter);
// }


// const [searchdata,setSearchdata]=useState({
//   searchCustomer:"",
//  })

// function handlesearch(e){
//   const newsearchData={...searchdata}
//   newsearchData[e.target.id] = e.target.value
//   setSearchdata(newsearchData)
//   console.log(newsearchData)
// }

// const searchCustomerByIds=()=>{
 
//   console.log( "initial array",selected);
 
//   axios
//   .post('http://localhost:8080/Highradius_B2B_project/SearchInvoice',
//   {
//     searchCustomer:searchdata.searchCustomer,
//   })
//   .then(response=>{
//    setnewData(response.data)
//     console.log("response",response);
//     // window.location.reload(true);

//   }).catch(err=>alert(err));
//   alert("Record searched sucessfully");
  
// }
 ///////////////////////adv search//////////////////////
 const [advsearchdata,setadvSearchdata]=useState({

  doc_id:"",
  invoice_id:"",
  cust_number:"",
  buisness_year:""
 })

function handleadv(e){
  const newsearchData={...advsearchdata}
  newsearchData[e.target.id] = e.target.value
  setadvSearchdata(newsearchData)
  console.log(newsearchData)
}

 function searchadvCustomer(e){
  console.log(advsearchdata);
  axios
  .post('http://localhost:8080/Highradius_B2B_project/SearchAdvance',
  {
  doc_id:  advsearchdata.doc_id,
  invoice_id:   advsearchdata.invoice_id,
  cust_number:  advsearchdata.cust_number,
  buisness_year:advsearchdata.buisness_year
  })
  .then(response=>{
    setnewData(response.data)
    console.log("response",response);
    // window.location.reload(true);

  })
   .catch(err=>alert(err));
}

/****************reload data grid***********************/
const reloaddatagrid=()=>{
  setrefetch(!refetch)
}

/*******************predict********************************/
const [predictdata,setpredictdata]=useState({
 })

const predict=()=>{
  axios
  .post('http://127.0.0.1:5000/get_prediction',{predictid})
  
  .then(response=>{
    
    console.log("response",response);
    

  })
  
}


const [analyticsdata,setsnalyticsdata]=useState({

  clear_date_start:"",
  due_in_date_start:"",
  baseline_create_date_start:"",
  clear_date_end:"",
  due_in_date_end:"",
  baseline_create_date_end:"",
  invoice_currency:""
 })

function handlegraph(e){
  const newanalyticsData={...analyticsdata}
  newanalyticsData[e.target.id] = e.target.value
  setsnalyticsdata(newanalyticsData)
  // console.log(newanalyticsData)
}

  return (
    <div className='buttonComponent '>
<Box  style={{backgroundColor:'#2D4250'}} >
  <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{marginTop:'20px'}}>
    <Button sx={styles} style={btnstyle} onClick={predict} >Predict</Button>
    <Button sx={styles} style={btnstyle} onClick={analyticsOpen} >ANALYTICS VIEW</Button>

    <Modal  keepMounted open={analyticseopen}  onClose={analyticsClose}>

        <Box sx={style} style={{padding: '20px',width: '650px'}}>
        <Typography id="keep-mounted-modal-title" sx={{paddingBottom: '20px'}}variant="h5" component="h2">  Analytics View  </Typography>                                                                                                                      
        <Box> 
        <Box sx={{width:'250px',float: 'right'}}>
        <Typography id="keep-mounted-modal-title"  component="h3">  Due Date   </Typography>
        
        <TextField id="due_in_date_start"        label="due_date_start"       style={textfield} variant="filled" size="small"  type="date"  sx={{width: '218px'}} InputLabelProps={{ shrink: true }}   onChange={(e)=>handlegraph(e)} value={data.due_in_date_start}/>
        <TextField id="due_in_date_end"        label="due_date_end"       style={textfield} variant="filled" size="small"  type="date"  sx={{width: '218px'}} InputLabelProps={{ shrink: true }}   onChange={(e)=>handlegraph(e)} value={data.due_in_date_end}/>
        </Box>
        </Box>


        <Box sx={{width:'250px'}}>
        <Typography id="keep-mounted-modal-title"  component="h3">  Clear Date  </Typography>  

        <TextField id="clear_date_start"     label="clear_date_start"      style={textfield} variant="filled" size="small"  type="date" InputLabelProps={{ shrink: true}}    sx={{width: '218px' }} onChange={(e)=>handlegraph(e)} value={data.clear_date_start}/>
        <TextField id="clear_date_end"     label="clear_date_end"      style={textfield} variant="filled" size="small"  type="date" InputLabelProps={{ shrink: true }}    sx={{width: '218px' ,float: 'left'  }} onChange={(e)=>handlegraph(e)} value={data.clear_date_end}/>
       </Box>


        <Box sx={{width:'250px',float: 'right'}}>
        <Typography id="keep-mounted-modal-title"  component="h3">  Invoice Currency   </Typography>
        
        <TextField id="invoice_currency" label="invoice_currency"  style={textfield} variant="filled" size="small"  onChange={(e)=>handlegraph(e)} value={data.invoice_currency} />
        </Box>

        <Box sx={{width:'250px'}}>
        <Typography id="keep-mounted-modal-title"  component="h3">  Baseline create date   </Typography>
        
        <TextField id="baseline_create_date_start"  label="baseline_create_date_start"   style={textfield} variant="filled" size="small" type="date"  sx={{width: '218px'}}  InputLabelProps={{ shrink: true}}  onChange={(e)=>handlegraph(e)} value={data.baseline_create_date_start}/>
        <TextField id="baseline_create_date_end"  label="baseline_create_date_end"   style={textfield} variant="filled" size="small" type="date"  sx={{width: '218px'}} InputLabelProps={{ shrink: true }}  onChange={(e)=>handlegraph(e)} value={data.baseline_create_date_end}/>
        </Box>

        

        <Divider />

        <Button  color='inherit' style={{ maxWidth: "240px", maxHeight: "30px", minWidth: '290px', minHeight: "30px",  marginRight: "9px",  marginTop: "15px"}} onClick={analyticsClose} >CANCEL</Button>
        <Button  color='inherit' style={{ maxWidth: "240px", maxHeight: "30px", minWidth:"290px", minHeight: "30px",  marginRight: "9px",  marginTop: "15px"}} onClick={handleClickOpen} >SUBMIT</Button>
        
        </Box>
        
      </Modal>
    <Button sx={styles} style={btnstyle} onClick={advanceOpen} >ADVANCE SEARCH</Button>
      <Modal  keepMounted open={advanceopen}  onClose={advanceClose}>

        <Box sx={style}>
          
          <Typography variant="h6" style={{ marginBottom: "10px", marginLeft: "6px" }}>   Advance Search </Typography>

          <TextField id="doc_id" label="Document Id" style={textfield} variant="filled" size="small" type="number"  onChange={(e)=>handleadv(e)} value={advsearchdata.doc_id}/>
          <TextField id="invoice_id" label="Invoice ID" style={textfield}  variant="filled" size="small"   type="number"  onChange={(e)=>handleadv(e)} value={advsearchdata.invoice_id} />
          
          <Divider />
         
          <TextField id="cust_number" label="Customer No" style={textfield} variant="filled" size="small" type="number"  onChange={(e)=>handleadv(e)} value={advsearchdata.cust_number}  />
          <TextField id="buisness_year" label="Business Year" style={textfield}  variant="filled" size="small" type="number"  onChange={(e)=>handleadv(e)} value={advsearchdata.buisness_year} />
         
          <Divider />
          
          <Button  color='inherit' style={modbtnstyle}   onClick={advanceClose} >CANCEL</Button>
          <Button  color='inherit' style={modbtnstyle} onClick={()=>{searchadvCustomer()}} >SEARCH</Button>
        
        </Box>
        
      </Modal>
  </ButtonGroup>



  <Button sx={styles} variant="outlined" 
          aria-label="outlined button group"  
          onClick={()=>{reloaddatagrid()}}>
             < ReplayIcon fontSize="small"/>
             </Button>



  
    <TextField id="searchCustomer" 
          style={textfield} 
          InputProps={{
          startAdornment: <SearchIcon fontSize="small"sx={{marginTop:'10px'}}/>
          }}
          onChange={(e) => setQ(e.target.value)} 
        
          sx={{marginTop:'10px'}}
          label="Search Customer Id"
          variant="filled" size="small"
   />




  <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{marginTop:'20px'}}>
    
    <Button sx={styles} style={btnstyle}  onClick={addOpen} >ADD</Button>
     <Modal keepMounted open={addopen} onClose={addClose}>
        <div>
        <Box sx={styleAdd}>
         <Typography id="keep-mounted-modal-title" variant="h6" component="h2">  Add   </Typography>

         <TextField id="business_code" label="business_code "   style={textfield} variant="filled" size="small"  onChange={(e)=>handle(e)} value={data.business_code}/>
         <TextField id="cust_number" label="customer_number" style={textfield} variant="filled" size="small"  type="number"   onChange={(e)=>handle(e)} value={data.cust_number }/>
         <TextField id="clear_date"     label="clear_date"      style={textfield} variant="filled" size="small"  type="date" InputLabelProps={{ shrink: true, required: true }}    sx={{width: '218px'}} onChange={(e)=>handle(e)} value={data.clear_date}/>
         <TextField id="buisness_year"   label="buisness_year"   style={textfield} variant="filled" size="small" type='number'  onChange={(e)=>handle(e)} value={data.buisness_year}  />
         
         <TextField id="doc_id"    label="document_id"    style={textfield} variant="filled" size="small" type="number"  onChange={(e)=>handle(e)} value={data.doc_id}/>
         <TextField id="posting_date"    label="posting_date"   style={textfield} variant="filled" size="small" type="date"   sx={{width: '218px'}}InputLabelProps={{ shrink: true, required: true }}   onChange={(e)=>handle(e)} value={data.posting_date} />
         <TextField id="document_create_date" label="document_create_date" style={textfield} variant="filled" size="small" type="date" sx={{width: '218px'}} InputLabelProps={{ shrink: true, required: true }}   onChange={(e)=>handle(e)} value={data.document_create_date}/>
         <TextField id="due_in_date"        label="due_date"       style={textfield} variant="filled" size="small"  type="date"  sx={{width: '218px'}} InputLabelProps={{ shrink: true, required: true }}   onChange={(e)=>handle(e)} value={data.due_in_date}/>
         
         <TextField id="invoice_currency" label="invoice_currency"  style={textfield} variant="filled" size="small"  onChange={(e)=>handle(e)} value={data.invoice_currency} />
         <TextField id="document_type"     label="document_type"     style={textfield} variant="filled" size="small"   onChange={(e)=>handle(e)} value={data.document_type} />
         <TextField id="posting_id"       label="posting_id"        style={textfield} variant="filled" size="small"  type="number"  onChange={(e)=>handle(e)} value={data.posting_id} />
         <TextField id="total_open_amount" label="total_open_amount" style={textfield} variant="filled" size="small"   onChange={(e)=>handle(e)} value={data.total_open_amount}  />
         
         <TextField id="baseline_create_date"  label="baseline_create_date"   style={textfield} variant="filled" size="small" type="date"  sx={{width: '218px'}} InputLabelProps={{ shrink: true, required: true }}  onChange={(e)=>handle(e)} value={data.baseline_create_date}/>
         <TextField id="cust_payment_terms" label="Customer_Payment_Terms"     style={textfield} variant="filled" size="small"   onChange={(e)=>handle(e)} value={data.cust_payment_terms} />
         <TextField id="invoice_id"            label="invoice_id"             style={textfield} variant="filled" size="small"  type="number"  onChange={(e)=>handle(e)} value={data.invoice_id}/>
         
         <Divider />

         <Button  color='inherit' style={{ maxWidth: "240px", maxHeight: "30px", minWidth:"480px", minHeight: "30px",  marginRight: "9px",  marginTop: "15px"}} onClick={addClose} >CANCEL</Button>
         <Button  color='inherit' style={{ maxWidth: "240px", maxHeight: "30px", minWidth:"480px", minHeight: "30px",  marginRight: "9px",  marginTop: "15px"}} onClick={submit} >ADD</Button>

        </Box>
        </div>
      </Modal>


   
    <Button sx={styles} style={btnstyle} onClick={editOpen} disabled={(Object.keys(selected).length !== 1)} >EDIT</Button>
      <Modal  keepMounted  open={editopen}  onClose={editClose} >

        <Box sx={style} >

          <Typography variant="h6" style={{ marginBottom: "10px", marginLeft: "6px" }}>  Edit </Typography>

          <TextField id="invoice_currency" label="Invoice Currency" style={textfield} variant="filled" size="small"placeholder={selected.length>0?selected[0]["invoice_currency"]:""}  onChange={(e)=>handleedit(e)} value={editdata.invoice_currency}  />
          <TextField id="cust_payment_terms" label="Customer Payment Terms" style={textfield}  variant="filled" size="small"  onChange={(e)=>handleedit(e)} value={editdata.cust_payment_terms}  />
         
          <Divider />

          <Button  color='inherit' style={modbtnstyle}   onClick={editClose} >CANCEL</Button>
          <Button  color='inherit' style={modbtnstyle} onClick={()=>{editCustomerByIds()}}  >EDIT</Button>
        
        </Box>
        
      </Modal>


  

    <Button sx={styles} style={btnstyle} onClick={deleteOpen} disabled={(Object.keys(selected).length === 0)} >DELETE</Button>
    <Modal  keepMounted  open={deleteopen}  onClose={deleteClose}>
      
      <Box sx={style}>
        
        <Typography id="delete_field" variant="h6" component="h2"> Delete Records ? </Typography>
        <Typography id="delete_field_desc" sx={{ mt: 2 }}> Are you sure you want to delete these record[s] ?  </Typography>
        
        <Button  color='inherit' style={modbtnstyle}  onClick={deleteClose} >CANCEL</Button>
     
        <Button  color='inherit' style={modbtnstyle}  onClick={()=>{deleteCustomerByIds()}} >DELETE</Button>
      </Box>
    </Modal>

  </ButtonGroup>
  
</Box>
  </div>
  )
}

export default Btn