import axios from "axios";

// Create an instance of axios with the base URL configured
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Replace with your Django backend URL
});

// Function to fetch invoices
export const fetchInvoices = async () => {
  try {
    const response = await API.get("invoices/");  // Endpoint to get invoices
    return response.data;  // Return the invoices data
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;  // Rethrow error if something goes wrong
  }
};

export default API;
