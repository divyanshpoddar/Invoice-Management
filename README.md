# 🧾 **Invoice Management System - Frontend (React)**

Welcome to the **Invoice Management System** frontend! This is a **React-based app** that allows users to manage invoices. Users can create, view, update, delete, and search invoices. The frontend communicates with a **Django backend** through **RESTful APIs** to manage invoice data.

## ✨ **Features**

- **➕ Create Invoices**: Add new invoices with details like invoice number, customer name, date, and line items (description, quantity, unit price).
- **✏️ Edit Invoices**: Edit existing invoices by selecting an invoice from the list and updating its details.
- **🗑️ Delete Invoices**: Remove invoices from the system.
- **🔍 Search & Filter**: Search invoices by invoice number or customer name to filter the displayed invoices.
- **📱 Responsive Design**: The app is designed to be **mobile-friendly** and adjusts layout for smaller screen sizes.

## 🛠️ **Technologies Used**

- **React**: A JavaScript library for building the user interface.
- **Axios**: For making HTTP requests to the Django backend API.
- **CSS**: Basic styles to make the UI modern and responsive.
- **Django (Backend)**: The backend serves a RESTful API that handles CRUD operations (Create, Read, Update, Delete) on invoices.

## 💻 **Installation & Setup**

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-repo/invoice-management-frontend.git
cd invoice-management-frontend
```

### 2. **Install Dependencies**

Run the following command to install the necessary packages:

```bash
npm install
```

### 3. **Run the Application**

To start the development server, use the following command:

```bash
npm start
```

This will run the app on `http://localhost:3000`.

### 4. **Django Backend Setup**

Ensure that the Django backend is running and accessible at `http://localhost:8000`. If you haven't set up the backend yet, follow these steps:

1. Clone the backend repository.
2. Install the required Python packages.
3. Run the backend with the following command:

```bash
python manage.py runserver
```

## 🚀 **Frontend Functionality**

### 1. **Create a New Invoice**

- Fill out the form at the top of the page with the following fields:
  - **Invoice Number**
  - **Customer Name**
  - **Date**
  - **Details** (Description, Quantity, Unit Price)
- Click **Submit** to add the invoice to the system.

### 2. **Edit an Invoice**

- To edit an existing invoice, click the **Edit** button next to the invoice in the list.
- The form will be populated with the current data of the selected invoice.
- Modify the details and click **Update** to save the changes.

### 3. **Delete an Invoice**

- To delete an invoice, click the **Delete** button next to the invoice in the list.
- The invoice will be removed from both the frontend and backend.

### 4. **Search and Filter Invoices**

- Use the search bar to filter invoices by **Invoice Number** or **Customer Name**.
- As you type, the list will dynamically update based on the search query.

## 🗂️ **Folder Structure**

```
src/
├── components/
│   ├── InvoiceList.js       # Component for listing and managing invoices
│   ├── styles/
│       ├── InvoiceList.css  # Styling for the InvoiceList component
├── App.js                   # Main component that renders InvoiceList
├── index.js                 # Entry point for the app
├── api.js                   # API configuration for Axios requests
├── index.css                # Global styling
```

## 🖥️ **Backend API Endpoints (Django)**

The frontend communicates with the Django backend via the following API endpoints:

1. **GET /api/invoices/**: Fetch all invoices.
2. **POST /api/invoices/**: Create a new invoice.
3. **PUT /api/invoices/{id}/**: Update an existing invoice.
4. **DELETE /api/invoices/{id}/**: Delete an invoice.
