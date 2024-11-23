import React, { useState, useEffect } from "react";
import axios from "axios";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");  // State for search input
  const [editingInvoice, setEditingInvoice] = useState(null);  // Track the invoice being edited

  const [formData, setFormData] = useState({
    invoice_number: "",
    customer_name: "",
    date: "",
    details: [{ description: "", quantity: 0, unit_price: 0 }],
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle changes for invoice details
  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = [...formData.details];
    updatedDetails[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      details: updatedDetails,
    }));
  };

  // Handle Edit functionality
  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);  // Set the invoice to edit
    setFormData({
      invoice_number: invoice.invoice_number,
      customer_name: invoice.customer_name,
      date: invoice.date,
      details: invoice.details,
    });  // Populate the form with the invoice's data
  };

  // Submit new or updated invoice
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingInvoice) {
        // If we are editing, send a PUT request
        const response = await axios.put(
          `http://127.0.0.1:8000/api/invoices/${editingInvoice.id}/`,
          formData
        );
        // Update the invoice in the list
        setInvoices((prevInvoices) =>
          prevInvoices.map((invoice) =>
            invoice.id === response.data.id ? response.data : invoice
          )
        );
      } else {
        // If we are adding a new invoice, send a POST request
        const response = await axios.post(
          "http://127.0.0.1:8000/api/invoices/",
          formData
        );
        setInvoices((prevInvoices) => [...prevInvoices, response.data]);
      }
      setFormData({
        invoice_number: "",
        customer_name: "",
        date: "",
        details: [{ description: "", quantity: 0, unit_price: 0 }],
      });
      setEditingInvoice(null); // Reset editing state
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };

  // Fetch invoices
  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/invoices/");
        setInvoices(response.data);
      } catch (error) {
        console.error("Error loading invoices:", error);
      } finally {
        setLoading(false);
      }
    };
    loadInvoices();
  }, []);

  // Delete invoice
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/invoices/${id}/`);
      setInvoices((prevInvoices) =>
        prevInvoices.filter((invoice) => invoice.id !== id)
      );
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  // Filter invoices based on the search query
  const filteredInvoices = invoices.filter((invoice) => {
    const lowercasedSearch = search.toLowerCase();
    return (
      invoice.invoice_number.toLowerCase().includes(lowercasedSearch) ||
      invoice.customer_name.toLowerCase().includes(lowercasedSearch)
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Invoice List</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search invoices by number or name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Form to add or edit an invoice */}
      <form onSubmit={handleSubmit}>
        <h2>{editingInvoice ? "Edit Invoice" : "Add Invoice"}</h2>
        <label>
          Invoice Number:
          <input
            type="text"
            name="invoice_number"
            value={formData.invoice_number}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Customer Name:
          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <h3>Invoice Details</h3>
        {formData.details.map((detail, index) => (
          <div key={index}>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={detail.description}
                onChange={(e) => handleDetailChange(index, e)}
                required
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                name="quantity"
                value={detail.quantity}
                onChange={(e) => handleDetailChange(index, e)}
                required
              />
            </label>
            <label>
              Unit Price:
              <input
                type="number"
                name="unit_price"
                value={detail.unit_price}
                onChange={(e) => handleDetailChange(index, e)}
                required
              />
            </label>
            <hr />
          </div>
        ))}
        <button type="submit">{editingInvoice ? "Update" : "Submit"}</button>
      </form>

      {/* Invoice List */}
      <ul>
        {filteredInvoices.map((invoice) => (
          <li key={invoice.id}>
            {invoice.invoice_number} - {invoice.customer_name}
            <button onClick={() => handleEdit(invoice)}>Edit</button>
            <button onClick={() => handleDelete(invoice.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;