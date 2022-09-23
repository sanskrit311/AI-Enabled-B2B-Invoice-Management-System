import React from 'react';
import { useEffect,useState } from 'react';
import{ DataGrid} from '@mui/x-data-grid';
import axios from 'axios';
import { useDemoData } from '@mui/x-data-grid-generator';
import { makeStyles } from '@material-ui/core';
import { Opacity } from '@mui/icons-material';

const GridContainer = ({setSelected,selected,data,q,setnewData,getGrid,refetch}) => {
   setnewData(data);
  
  const [pageSize, setPageSize] = React.useState(10);

  const [searchParam] = useState(["cust_number"]);

  function search(data) {
    return data.filter((data) => {
      return searchParam.some((newItem) => {
          return (
              data[newItem]
                  .toString()
                  .toLowerCase()
                  .indexOf(q.toLowerCase()) > -1
          );
      });
  });
}

useEffect(()=>{

    getGrid();
  }, [refetch]);

   getGrid = async ()=>{
    await axios.get('http://localhost:8080/Highradius_B2B_project/RecieveData').then((res)=>{
    
    setnewData(res.data);
    })
  }
 

  const columns=[
{field :"sl_no" ,headerName:"sl_no"},
{field : "business_code",headerName:"business_code"},
{field :"cust_number" ,headerName:"cust_number"},
{field : "clear_date",headerName:"clear_date"},
{field :"buisness_year" ,headerName:"buisness_year"},
{field : "doc_id",headerName:"doc_id"},
{field : "posting_date",headerName:"posting_date"},
{field : "document_create_date",headerName:"document_create_date"},
{field : "due_in_date",headerName:"due_in_date"},
{field :"invoice_currency" ,headerName:"invoice_currency"},
{field :"document_type" ,headerName:"document_type"},
{field : "posting_id",headerName:"posting_id"},
{field : "total_open_amount",headerName:"total_open_amount"},
{field : "baseline_create_date",headerName:"baseline_create_date"},
{field : "cust_payment_terms",headerName:"cust_payment_terms"},
{field :"invoice_id" ,headerName:"invoice_id"},
{field :"aging_bucket" ,headerName:"aging_bucket"},
  ];

  const rows=search(data).map((row)=>({
    
    sl_no: row.sl_no,
    business_code: row.business_code,
    cust_number: row.cust_number,
    clear_date: row.clear_date,
    buisness_year: row.buisness_year,
    doc_id: row.doc_id,
    posting_date: row.posting_date,
    document_create_date: row.document_create_date,
    due_in_date: row.due_in_date,
    invoice_currency: row.invoice_currency,
    document_type: row.document_type,
    posting_id: row.posting_id,
    total_open_amount: row.total_open_amount,
    baseline_create_date: row.baseline_create_date,
    cust_payment_terms: row.cust_payment_terms,
    invoice_id: row.invoice_id,
    aging_bucket:row.aging_bucket
  }))
  const [selectedRows, setSelectedRows] = React.useState([]);

  return (
    <div style={{height:498,width:'100%',color:'#ffff', backgroundColor:'#283d4a' }}>
      <DataGrid
      sx={{
        boxShadow: 5,
       
          color: 'white',
          '& .MuiDataGrid-cell:checkBox': {
            color: 'white',
            
          },
        
        '& .MuiDataGrid-cell:hover': {
          color: 'white',
        },
        '& .MuiTablePagination-root':{
          color:'white',
        },
        '& .MuiTablePagination-actions':{
          color:'white',
        },
        '& .MuiCheckbox-colorPrimary':{
          color:'white',
        },
        '& .MuiDataGrid-columnSeparator':{
          opacity:0,
        }
      }}
      getRowId={(row) => row.sl_no}
      rows={rows}
      columns={columns}
      
      rowHeight={37}
      checkboxSelection
      
      onSelectionModelChange={(ids) => {
      
        const selectedIDs = new Set(ids);
        const selectedRowData = rows.filter((row) =>
         selectedIDs.has(row.sl_no),
         );
         
      setSelected(selectedRowData);
       console.log(selectedRowData);
      }}
      {...data}
      pageSize={pageSize}
      onPageSizeChange={(newPage) => setPageSize(newPage)}
      rowsPerPageOptions={[ 10, 20,100]}
      Pagination 
      
      />
    </div>
  )
}

export default GridContainer