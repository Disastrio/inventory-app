import "./App.css"

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="layout">
        <Sidebar />

        <main className="main-content">
          <h1>Dashboard</h1>
        </main>
      </div>
    </div>
  );
}

export default App;