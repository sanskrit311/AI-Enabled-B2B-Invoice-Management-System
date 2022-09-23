
package com.highradius.servlet;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.io.*;

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


@WebServlet("/PieChart")
public class PieChart extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PieChart() {
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
			
			String clear_date_end=jsonObject.getJSONObject("analyticsdata").getString("clear_date_end");
			String clear_date_start=jsonObject.getJSONObject("analyticsdata").getString("clear_date_start");
			String due_in_date_start=jsonObject.getJSONObject("analyticsdata").getString("due_in_date_start");
			String due_in_date_end=jsonObject.getJSONObject("analyticsdata").getString("due_in_date_end");
			String baseline_create_date_start=jsonObject.getJSONObject("analyticsdata").getString("baseline_create_date_start");
			String baseline_create_date_end=jsonObject.getJSONObject("analyticsdata").getString("baseline_create_date_end");

//			System.out.println(clear_date_start);
//			System.out.println(clear_date_end);
//			System.out.println(due_in_date_start);
//			System.out.println(due_in_date_end);
//			System.out.println(baseline_create_date_start);
//			System.out.println(baseline_create_date_end);
			

			Connection con = DBConnection.createConnect();
//			String query = "SELECT invoice_currency, COUNT(*) "
//					+ "FROM winter_internship"
//					+ " WHERE baseline_create_date >= ? AND baseline_create_date <= ?"
//					+ " AND clear_date >= ? AND clear_date<= ? "
//					+ "   AND due_in_date >= ? AND due_in_date<= ?"
//					+ " GROUP BY invoice_currency; ";
			
//			String query="SELECT invoice_currency, COUNT(*) "
//					+ "FROM winter_internship "
//					+ "WHERE baseline_create_date  BETWEEN ? AND  ? "
//					+ "AND clear_date BETWEEN ? AND ? "
//					+ "AND due_in_date BETWEEN ? AND ? GROUP BY invoice_currency;";
//					
			
			PreparedStatement st = con.prepareStatement("SELECT COUNT(invoice_currency) AS count_currency,invoice_currency FROM winter_internship WHERE clear_date>= ? AND clear_date <= ? AND due_in_date >=? AND due_in_date<=? AND baseline_create_date >=? AND baseline_create_date<=? GROUP BY invoice_currency");
			st.setString(5, baseline_create_date_start);
			st.setString(6, baseline_create_date_end);
			st.setString(1, clear_date_start);
			st.setString(2, clear_date_end);
			st.setString(3, due_in_date_start);
			st.setString(4, due_in_date_end);
			
			 ResultSet rs=st.executeQuery();
			  ArrayList<Integer> values = new ArrayList<Integer>();
			 while(rs.next())
					
				{
//				   Response.put(rs.getString("invoice_currency"),rs.getInt("count_currency"))   ;
				   values.add(rs.getInt("count_currency"));
			           System.out.println("Your count is" + rs.getInt("count_currency")); 
			
				}
				
			
				Gson gson = new GsonBuilder().serializeNulls().create();
				String invoices  = gson.toJson(values);
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
				con.close();
				}
			
                  catch(Exception ex)
				{
		         ex.printStackTrace();
		         }  
	}
}


