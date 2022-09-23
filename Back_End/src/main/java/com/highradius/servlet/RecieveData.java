package com.highradius.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.highradius.crud.DBConnection;
import com.highradius.pojo.Pojo;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


@WebServlet("/RecieveData")
public class RecieveData extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
    public RecieveData() {
        super();
     
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
//		response.addHeader("Access-Control-Allow-Origin","*");

	
		try
		{
		Connection conn=DBConnection.createConnect();
		
		Statement st = conn.createStatement();
		String query = "SELECT sl_no, business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id,is_deleted,IFNULL(aging_bucket,'N/A')AS aging_bucket FROM winter_internship";
			
		ResultSet rs = st.executeQuery(query);
		
		ArrayList<Pojo> data = new ArrayList<>();
		
		
		while(rs.next())
			
		{
			if(rs.getInt("is_deleted")==1)continue;
			Pojo p=new Pojo();
			
			p.setSl_no(rs.getInt("sl_no"));
			p.setBusiness_code(rs.getString("business_code"));
			p.setCust_number(rs.getString("cust_number"));
			p.setClear_date(rs.getString("clear_date"));
			p.setBuisness_year(rs.getInt("buisness_year"));
			p.setDoc_id(rs.getString("doc_id"));
			p.setPosting_date(rs.getString("posting_date"));
			p.setDocument_create_date(rs.getString("document_create_date"));
			p.setDue_in_date(rs.getString("due_in_date"));
			p.setInvoice_currency(rs.getString("invoice_currency"));
			p.setDocument_type(rs.getString("document_type"));
			p.setPosting_id(rs.getInt("posting_id"));
			p.setTotal_open_amount(rs.getFloat("total_open_amount"));
			p.setBaseline_create_date(rs.getString("baseline_create_date"));
			p.setCust_payment_terms(rs.getString("cust_payment_terms"));
			p.setInvoice_id(rs.getInt("invoice_id"));
			p.setAging_bucket(rs.getString("aging_bucket"));
			data.add(p);
		}
		

		Gson gson = new GsonBuilder().serializeNulls().create();
		String invoices  = gson.toJson(data);
		response.setContentType("application/json");
		try {
			response.getWriter().write(invoices);
		}
		catch(IOException e)
		{
			e.printStackTrace();
		}
		rs.close();
		st.close();
		conn.close();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doGet(request, response);
	}

}