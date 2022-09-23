package com.highradius.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.*;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.highradius.crud.DBConnection;

@WebServlet("/AddInvoice")
public class AddInvoice extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddInvoice() {
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
		// TODO Auto-generated method stub
//		response.addHeader("Access-Control-Allow-Origin","http://localhost:3000");

		
		try {
			String Business_code =  request.getParameter("business_code");
			String Cust_number = request.getParameter("cust_number");
			String Clear_date = request.getParameter("clear_date");
			String Buisness_year = request.getParameter("buisness_year");
			String Doc_id=request.getParameter("doc_id");
			String Posting_date = request.getParameter("posting_date");
			String Document_create_date = request.getParameter("document_create_date");
			String Due_in_date = request.getParameter("due_in_date");
			String Invoice_currency = request.getParameter("invoice_currency");
			String Document_type = request.getParameter("document_type");
			String Posting_id = request.getParameter("posting_id");
			String Total_open_amount = request.getParameter("total_open_amount");
			String Baseline_create_date = request.getParameter("baseline_create_date");
			String Cust_payment_terms = request.getParameter("cust_payment_terms");
			String Invoice_id = request.getParameter("invoice_id");
			
			Connection con = DBConnection.createConnect();
			String query = "INSERT INTO winter_intership (business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id) values (?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?,?, ?,?)";		
			PreparedStatement st = con.prepareStatement(query);
			st.setString(1, Business_code);
			st.setString(2, Cust_number);
			st.setString(3, Clear_date);
			st.setString(4, Buisness_year);
			st.setString(5, Doc_id);
			st.setString(6, Posting_date);
			st.setString(7, Document_create_date);
			st.setString(8, Due_in_date);
			st.setString(9, Invoice_currency);
			st.setString(10, Document_type);
			st.setString(11, Posting_id);
			st.setString(12, Total_open_amount);
			st.setString(13, Baseline_create_date);
			st.setString(14, Cust_payment_terms);
			st.setString(15, Invoice_id);
			
			st.executeUpdate();
			con.close();
			

		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}

}
