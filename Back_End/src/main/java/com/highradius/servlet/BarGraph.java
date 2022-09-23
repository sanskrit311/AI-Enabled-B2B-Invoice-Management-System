package com.highradius.servlet;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.HashMap;
import java.io.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.highradius.crud.DBConnection;


@WebServlet("/BarGraph")
public class BarGraph extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BarGraph() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
			HashMap<Object,Object> Response=new HashMap<Object,Object>();

			JSONObject jsonObject =  new JSONObject(jb.toString());
			System.out.println(jsonObject);
//			JSONArray array =jsonObject.optJSONArray("delid");
//			int slno=array.optInt(0);
//		 	
//			
//			String invoice_currency = jsonObject.getString("invoice_currency");
//			String cust_payment_terms = jsonObject.getString("cust_payment_terms");
//		   
//
//			Connection con = DBConnection.createConnect();
//			String query = "UPDATE winter_internship SET  invoice_currency= ?, cust_payment_terms = ? WHERE sl_no = ?";
//			
//			PreparedStatement st = con.prepareStatement(query);
//			st.setString(1, invoice_currency);
//			st.setString(2, cust_payment_terms);
//			st.setInt(3, slno);
//			
//			
//			if(st.executeUpdate()>0) {
//				Response.put("status", "Edit Successful");
//			}
//			else {
//				Response.put("status", "Edit  UnSuccessful");
//			}
			Gson gson=new Gson();
		    String jsonResponse=gson.toJson(Response);
		    response.setHeader("Access-Control-Allow-Origin","*");
		    response.getWriter().append(jsonResponse);
			
			
//			con.close();
		}
		
		catch(Exception ex){ex.printStackTrace();}  
	}
}


