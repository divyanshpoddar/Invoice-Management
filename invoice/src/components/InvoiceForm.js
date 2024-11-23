import React, { useState } from "react";
import { createInvoice, updateInvoice } from "../api";
import "./styles/InvoiceForm.css";
import axios from 'axios';


const InvoiceForm = ({ existingInvoice, onSuccess }) => {
  const [invoice, setInvoice] = useState(
    existingInvoice || {
      invoice_number: "",
      customer_name: "",
      date: "",
      details: [{ description: "", quantity: 0, unit_price: 0 }],
    }
  );

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...invoice.details];
    updatedDetails[index][field] = value;
    setInvoice({ ...invoice, details: updatedDetails });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingInvoice) {
      await updateInvoice(existingInvoice.id, invoice);
    } else {
      await createInvoice(invoice);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="invoice-form">
      <h2>{existingInvoice ? "Edit Invoice" : "Create Invoice"}</h2>
      <input
        type="text"
        placeholder="Invoice Number"
        value={invoice.invoice_number}
        onChange={(e) =>
          setInvoice({ ...invoice, invoice_number: e.target.value })
        }
        required
      />
      <input
        type="text"
        placeholder="Customer Name"
        value={invoice.customer_name}
        onChange={(e) =>
          setInvoice({ ...invoice, customer_name: e.target.value })
        }
        required
      />
      <input
        type="date"
        value={invoice.date}
        onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
        required
      />
      <h3>Invoice Details</h3>
      {invoice.details.map((detail, index) => (
        <div key={index} className="invoice-detail">
          <input
            type="text"
            placeholder="Description"
            value={detail.description}
            onChange={(e) =>
              handleDetailChange(index, "description", e.target.value)
            }
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={detail.quantity}
            onChange={(e) =>
              handleDetailChange(index, "quantity", e.target.value)
            }
            required
          />
          <input
            type="number"
            placeholder="Unit Price"
            value={detail.unit_price}
            onChange={(e) =>
              handleDetailChange(index, "unit_price", e.target.value)
            }
            required
          />
        </div>
      ))}
      <button type="submit" className="submit-btn">Save</button>
    </form>
  );
};

export default InvoiceForm;
