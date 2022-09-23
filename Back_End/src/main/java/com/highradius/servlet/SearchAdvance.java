package com.highradius.servlet;


import java.io.BufferedReader;
import java.io.IOException;

import java.sql.Connection;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.highradius.crud.DBConnection;
import com.highradius.pojo.Pojo;



/**
 * Servlet implementation class SearchInvoice
 */
@WebServlet("/SearchAdvance")
public class SearchAdvance extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SearchAdvance() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//	response.addHeader("Access-Control-Allow-Origin","*");


		StringBuffer jb = new StringBuffer();
	    String line = null;
	    try {
	        BufferedReader reader = request.getReader();
	        while ((line = reader.readLine()) != null) {
	            jb.append(line);
	        }
	    } catch (Exception e) {  }
	    
	    
		try {
			JSONObject jsonObject =  new JSONObject(jb.toString());
			
			System.out.println("json object "+jsonObject);
			Connection con = DBConnection.createConnect();
	        String doc_id = jsonObject.getString("doc_id"); 
            String invoice_id =jsonObject.getString("invoice_id");
	        String cust_number= jsonObject.getString("cust_number"); 
	        String buisness_year = jsonObject.getString("buisness_year"); 
	        if (doc_id=="") {doc_id="?";};
	        if (invoice_id=="") {invoice_id="?";};
	        if (cust_number=="") {cust_number="?";};
	        if (buisness_year=="") {buisness_year="?";};

             String query = "SELECT * FROM winter_internship WHERE doc_id LIKE " + "'%"+doc_id+"%'" + " OR invoice_id LIKE " + "'%"+invoice_id+"%'" + " OR cust_number LIKE " + "'%"+cust_number+"%'" + " OR buisness_year LIKE " + "'%"+buisness_year+"%'";
//             OR invoice_id =? OR cust_number =? OR buisness_year =?
//			PreparedStatement st = con.prepareStatement(query);
			Statement stmt = con.createStatement();
//			st.setString(1, doc_id);
//			st.setString(2, invoice_id);
//			st.setString(3, cust_number);
//			st.setString(4, buisness_year);
            System.out.println("query"+query);
            ResultSet rs = stmt.executeQuery(query);
           
           	ArrayList<Pojo> data = new ArrayList<>();
			while(rs.next()) {
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
				data.add(p);
			}
			
			
	
			Gson gson = new GsonBuilder().serializeNulls().create();
			String invoices  = gson.toJson(data);
			response.setContentType("application/json");
			try {
				response.getWriter().write(invoices);//getWriter() returns a PrintWriter object that can send character text to the client. 
			}
			catch(IOException e)
			{
				e.printStackTrace();
			}
			rs.close();
			stmt.close();
			con.close();
			
		}
		catch(SQLException e) {
			e.printStackTrace();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
