import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { LineAxisOutlined } from '@mui/icons-material';
import axios from 'axios';

const Buttons = () => {
  
  

    const [addopen, setaddOpen] = React.useState(false);
    const addOpen = () => setaddOpen(true);
    const addClose = () => setaddOpen(false);

    const [editopen, seteditOpen] = React.useState(false);
    const editOpen = () => seteditOpen(true);
    const editClose = () => seteditOpen(false);

    const [deleteopen, setdeleteOpen] = React.useState(false);
    const deleteOpen = () => setdeleteOpen(true);
    const deleteClose = () => setdeleteOpen(false);

    const [advanceopen, setadvanceOpen] = React.useState(false);
    const advanceOpen = () => setadvanceOpen(true);
    const advanceClose = () => setadvanceOpen(false);

    

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
        maxWidth: "210px",
        maxHeight: "30px", 
        minWidth: "215px",
        minHeight: "30px"
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

  
    //   constructor(props) {
    //   super(props)
    
    //   this.state = {
        
    //   business_code:'',
    //   cust_number:'',
    //   clear_date:'',
    //   buisness_year:'',
    //   doc_id:'',
    //   posting_date:'',
    //   document_create_date:'',
    //   due_in_date:'',
    //   invoice_currency:'',
    //   document_type:'',
    //   posting_id:'',
    //   total_open_amount:'',
    //   baseline_create_date:'',
    //   Cust_Payment_Terms:'',
    //   invoice_id:''
    //   }
    // }

    
    


  
  
  return (
    <div className='buttonComponent '>
<Box  style={{backgroundColor:'#2D4250'}} >
  <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{marginTop:'20px'}}>
    <Button sx={styles} style={btnstyle} >Predict</Button>
    <Button sx={styles} style={btnstyle} >ANALYTICS VIEW</Button>
    <Button sx={styles} style={btnstyle} onClick={advanceOpen} >ADVANCE SEARCH</Button>
      <Modal  open={advanceopen}  onClose={advanceClose}>

        <Box sx={style}>
          
          <Typography variant="h6" style={{ marginBottom: "10px", marginLeft: "6px" }}>   Advance Search </Typography>

          <TextField id="customer_id" label="Customer Id" style={textfield} variant="filled" size="small" type="number" />
          <TextField id="invoice_id" label="Invoice ID" style={textfield}  variant="filled" size="small"   type="number"  />
          
          <Divider />
         
          <TextField id="customer_no" label="Customer No" style={textfield} variant="filled" size="small" type="number"   />
          <TextField id="business_year" label="Business Year" style={textfield}  variant="filled" size="small" type="number"  />
         
          <Divider />
          
          <Button  color='inherit' style={modbtnstyle}   onClick={advanceClose} >CANCEL</Button>
          <Button  color='inherit' style={modbtnstyle}  >EDIT</Button>
        
        </Box>
        
      </Modal>
  </ButtonGroup>



  
  <TextField id="searchCustomer" style={textfield} sx={{marginTop:'10px'}} label="Search Customer Id" variant="filled" size="small" />




  <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{marginTop:'20px'}}>
    
    <Button sx={styles} style={btnstyle}  onClick={addOpen} >ADD</Button>
     <Modal keepMounted open={addopen} onClose={addClose}>
        <div>
        <Box sx={styleAdd}>
         <Typography id="keep-mounted-modal-title" variant="h6" component="h2">  Add   </Typography>

         <TextField id="business_code " label="business_code "   style={textfield} variant="filled" size="small"  />
         <TextField id="cust_number" label="customer_number" style={textfield} variant="filled" size="small"  type="number"  />
         <TextField id="clear_date "     label="clear_date"      style={textfield} variant="filled" size="small"  type="date"  defaultValue="2017-05-24" sx={{width: '218px'}}/>
         <TextField id="buisness_year"   label="buisness_year"   style={textfield} variant="filled" size="small" type='number'   />
         
         <TextField id="doc_id "    label="document_id"    style={textfield} variant="filled" size="small" type="number" />
         <TextField id="posting_date"    label="posting_date"   style={textfield} variant="filled" size="small" type="date"  defaultValue="2017-05-24" sx={{width: '218px'}} />
         <TextField id="document_create_date " label="document_create_date" style={textfield} variant="filled" size="small" type="date" defaultValue="2017-05-24"sx={{width: '218px'}} />
         <TextField id="due_in_date"        label="due_date"       style={textfield} variant="filled" size="small"  type="date" defaultValue="2017-05-24" sx={{width: '218px'}}/>
         
         <TextField id="invoice_currency " label="invoice_currency"  style={textfield} variant="filled" size="small"  />
         <TextField id="document_type"     label="document_type"     style={textfield} variant="filled" size="small"   />
         <TextField id="posting_id "       label="posting_id"        style={textfield} variant="filled" size="small"  type="number" />
         <TextField id="total_open_amount" label="total_open_amount" style={textfield} variant="filled" size="small"    />
         
         <TextField id="baseline_create_date "  label="baseline_create_date"   style={textfield} variant="filled" size="small" type="date" defaultValue="2017-05-24" sx={{width: '218px'}} />
         <TextField id="Cust_Payment_Terms" label="Customer_Payment_Terms" style={textfield} variant="filled" size="small"   />
         <TextField id="invoice_id "            label="invoice_id"             style={textfield} variant="filled" size="small"  type="number" />
         
         <Divider />

         <Button  color='inherit' style={{ maxWidth: "240px", maxHeight: "30px", minWidth:"480px", minHeight: "30px",  marginRight: "9px",  marginTop: "15px"}} onClick={addClose} >CANCEL</Button>
         <Button  color='inherit' style={{ maxWidth: "240px", maxHeight: "30px", minWidth:"480px", minHeight: "30px",  marginRight: "9px",  marginTop: "15px"}} >ADD</Button>

        </Box>
        </div>
      </Modal>


    <Button sx={styles} style={btnstyle} onClick={editOpen} >EDIT</Button>
      <Modal  keepMounted  open={editopen}  onClose={editClose} >

        <Box sx={style} >

          <Typography variant="h6" style={{ marginBottom: "10px", marginLeft: "6px" }}>  Edit </Typography>

          <TextField id="invoice_currency " label="Invoice Currency" style={textfield} variant="filled" size="small" />
          <TextField id="cust_payment_terms" label="Customer Payment Terms" style={textfield}  variant="filled" size="small"   />
         
          <Divider />

          <Button  color='inherit' style={modbtnstyle}   onClick={editClose} >CANCEL</Button>
          <Button  color='inherit' style={modbtnstyle}  >EDIT</Button>
        
        </Box>
        
      </Modal>
    <Button sx={styles} style={btnstyle} onClick={deleteOpen} >DELETE</Button>
    <Modal  keepMounted  open={deleteopen}  onClose={deleteClose}>
      
      <Box sx={style}>
        
        <Typography id="delete_field" variant="h6" component="h2"> Delete Records ? </Typography>
        <Typography id="delete_field_desc" sx={{ mt: 2 }}> Are you sure you want to delete these record[s] ?  </Typography>
        
        <Button  color='inherit' style={modbtnstyle}  onClick={deleteClose} >CANCEL</Button>
        <Button  color='inherit' style={modbtnstyle}  >DELETE</Button>
      </Box>
    </Modal>

  </ButtonGroup>
  
</Box>
  </div>
  )
}

export default Buttons