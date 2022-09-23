package com.highradius.servlet;



import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.google.gson.Gson;
import com.highradius.crud.DBConnection;


@WebServlet("/AddInvoice1")
public class AddInvoice1 extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public AddInvoice1() {
        super();
       
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{ 
//		response.addHeader("Access-Control-Allow-Origin","*");

		StringBuffer jb = new StringBuffer();
	    String line = null;
	    try {
	        BufferedReader reader = request.getReader();
	        while ((line = reader.readLine()) != null) {
	            jb.append(line);
	        }
	    } catch (Exception e) {  }

		
		
	  
		try
		{
			HashMap<Object,Object> Response=new HashMap<Object,Object>();

			JSONObject jsonObject =  new JSONObject(jb.toString());
			System.out.println(jsonObject);
			
			
	        String business_code = jsonObject.getString("business_code");
	        String cust_number= jsonObject.getString("cust_number"); 
	        String clear_date = jsonObject.getString("clear_date"); 
	        String buisness_year = jsonObject.getString("buisness_year"); 
	        String doc_id = jsonObject.getString("doc_id"); 
	        String posting_date = jsonObject.getString("posting_date"); 
	        String document_create_date= jsonObject.getString("document_create_date"); 
	        String due_in_date = jsonObject.getString("due_in_date"); 
	        String invoice_currency = jsonObject.getString("invoice_currency"); 
	        String document_type= jsonObject.getString("document_type"); 
	        String posting_id =jsonObject.getString("posting_id"); 
	        String total_open_amount =jsonObject.getString("total_open_amount");
	        String baseline_create_date = jsonObject.getString("baseline_create_date");
	        String cust_payment_terms = jsonObject.getString("cust_payment_terms");
	        String invoice_id =jsonObject.getString("invoice_id");
		
	        
	        Connection conn=DBConnection.createConnect();
	        
	        String query="INSERT INTO winter_internship(business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	        PreparedStatement st=conn.prepareStatement(query);
	        
	        
	        st.setString(1, business_code);
	        st.setString(2, cust_number);
	        st.setString(3, clear_date);
	        st.setString(4, buisness_year);
	        st.setString(5, doc_id);
	        st.setString(6, posting_date);
	        st.setString(7, document_create_date);
	        st.setString(8, due_in_date);
	        st.setString(9, invoice_currency);
	        st.setString(10, document_type);
	        st.setString(11, posting_id);
	        st.setString(12, total_open_amount);
	        st.setString(13, baseline_create_date);
	        st.setString(14, cust_payment_terms);
	        st.setString(15, invoice_id);
	        
	        if(st.executeUpdate()>0) {
				Response.put("status", "Edit Successful");
			}
			else {
				Response.put("status", "Edit  UnSuccessful");
			}
			Gson gson=new Gson();
		    String jsonResponse=gson.toJson(Response);
		    response.setHeader("Access-Control-Allow-Origin","*");
		    response.getWriter().append(jsonResponse);
			
	        conn.close();
	        
	        
	        
	        
	        
	        
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}

}