package com.highradius.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
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
@WebServlet("/SearchInvoice")
public class SearchInvoice extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SearchInvoice() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		response.addHeader("Access-Control-Allow-Origin","*");


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
			Connection con = DBConnection.createConnect();
			System.out.println("json object "+jsonObject);
			String Cust_number = jsonObject.getString("searchCustomer");
			
			System.out.println("customer number :"+Cust_number);
			if(Cust_number==null) {
				
			}
			
			Statement stmt = con.createStatement();
			String sql_statement = "SELECT * FROM winter_internship WHERE cust_number LIKE " + "'%"+Cust_number+"%'";
			ResultSet rs = stmt.executeQuery(sql_statement);

			ArrayList<Pojo> data = new ArrayList<>();
			while(rs.next()) {
				Pojo p=new Pojo();
//				System.out.println(rs.getString("cust_number")+" :");
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
