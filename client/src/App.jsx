import "./App.css"

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Chemicals from "./pages/Chemicals";
import Equipment from "./pages/Equipment";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Suppliers from "./pages/Suppliers";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <div className="layout">
          <Sidebar />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />}/>
              <Route path="/products" element={<Products />}/>
              <Route path="/chemicals" element={<Chemicals />}/>
              <Route path="/equipment" element={<Equipment />}/>
              <Route path="/inventory" element={<Inventory />}/>
              <Route path="/suppliers" element={<Suppliers />}/>
              <Route path="/orders" element={<Orders />}/>
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;