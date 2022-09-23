package com.highradius.crud;
import java.sql.*;


public class DBConnection {
	public static Connection createConnect() {
		Connection con = null;
		String JdbcURL = "jdbc:mysql://localhost:3306/highradius";
		String Username = "root";
		String password = "123456789";
		
		try {
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
			}
			catch (ClassNotFoundException e)
			{
				e.printStackTrace();
			}
			con = DriverManager.getConnection(JdbcURL, Username, password);
			System.out.println("Post establishing a DB connection - " +con);
	
		}
		catch(SQLException e)
		{
			System.out.println("Error Occurred");
			e.printStackTrace();
		}
		return con;
		
	}

}
