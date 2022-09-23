
package com.highradius.servlet;

import java.io.BufferedReader;
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



@WebServlet("/DeleteInvoiceFake")
public class DeleteInvoiceFake extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
    public DeleteInvoiceFake() {
        super();
        
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		System.out.println(request);
		StringBuffer jb = new StringBuffer();
	    String line = null;
	    try {
	        BufferedReader reader = request.getReader();
	        while ((line = reader.readLine()) != null) {
	        	
	            jb.append(line);
	        }
	    } catch (Exception e) {  }
		
//		response.addHeader("Access-Control-Allow-Origin","*");

		try {
			HashMap<Object,Object> Response=new HashMap<Object,Object>();
			JSONObject obj =  new JSONObject(jb.toString());
			System.out.println(obj);
			JSONArray array = obj.optJSONArray("delid");
			System.out.println(array);
			for (int i = 0; i < array.length(); ++i) {
				System.out.println(array.optInt(i));

				
			Connection con = DBConnection.createConnect();
			String query = "UPDATE winter_internship SET is_deleted = 1 WHERE sl_no = ?";
			
				PreparedStatement st = con.prepareStatement(query);
				st.setInt(1,array.optInt(i));
				if(st.executeUpdate()>0) {
					Response.put("status", "Delete Successful");
				}
				else {
					Response.put("status", "Delete  UnSuccessful");
				}
					
			} 
			Gson gson=new Gson();
    String jsonResponse=gson.toJson(Response);
    response.setHeader("Access-Control-Allow-Origin","*");
    response.getWriter().append(jsonResponse);

			
	}
		catch(Exception e) {
			e.printStackTrace();
		}
		
   
}
}
