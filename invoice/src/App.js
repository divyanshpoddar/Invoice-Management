import React from "react";
import InvoiceList from "./components/InvoiceList";  // Import the InvoiceList component

function App() {
  return (
    <div>
      <h1>Welcome to the Invoice Management System</h1>
      <InvoiceList />  {/* Render the InvoiceList component */}
    </div>
  );
}

export default App;
