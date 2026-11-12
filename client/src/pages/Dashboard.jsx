import { Link } from "react-router-dom";

const inventory = [
  {
    id: 1,
    name: "Nitric acid",
    sku: "CHEM-001",
    quantity: 12,
    unit: "L",
    reorderLevel: 20,
    location: "Chemical store / Shelf A2",
  },
  {
    id: 2,
    name: "Hydrochloric acid",
    sku: "CHEM-002",
    quantity: 80,
    unit: "L",
    reorderLevel: 25,
    location: "Chemical store / Shelf A3",
  },
  {
    id: 3,
    name: "Spectrophotometer",
    sku: "EQP-001",
    quantity: 2,
    unit: "units",
    reorderLevel: 3,
    location: "Equipment room / Bay 1",
  },
  {
    id: 4,
    name: "Sulfuric acid",
    sku: "CHEM-003",
    quantity: 200,
    unit: "L",
    reorderLevel: 30,
    location: "Chemical store / Shelf B1",
  }
];

const recentOrders = [
  {
    id: 1,
    number: "PO-2026-014",
    supplier: "Apex Chemical Supply",
    expected: "18 Nov 2026",
    status: "Submitted",
  },
  {
    id: 2,
    number: "PO-2026-013",
    supplier: "Meridian Process Equipment",
    expected: "14 Nov 2026",
    status: "Part received",
  },
  {
    id: 3,
    number: "PO-2026-012",
    supplier: "Northstar Lab Systems",
    expected: "10 Nov 2026",
    status: "Received",
  },
];

function Dashboard() {
  const lowStockItems = inventory.filter(
    (item) => item.quantity <= item.reorderLevel,
  );

  const chemicalCount = inventory.filter(
    (item) => item.sku.startsWith("CHEM"),
  ).length;

  const equipmentCount = inventory.length - chemicalCount;

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Inventory and purchasing overview</p>
        </div>
      </header>

      <section className="dashboard-summary" aria-label="Inventory summary">
        <div>
          <span>Tracked items</span>
          <strong>{inventory.length}</strong>
        </div>
        <div>
          <span>At reorder level</span>
          <strong>{lowStockItems.length}</strong>
        </div>
        <div>
          <span>Chemicals</span>
          <strong>{chemicalCount}</strong>
        </div>
        <div>
          <span>Equipment</span>
          <strong>{equipmentCount}</strong>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Items to review</h2>
            <p>Current quantity is at or below the reorder level.</p>
          </div>
          <Link to="/inventory">Open inventory</Link>
        </div>

        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Location</th>
                <th>On hand</th>
                <th>Reorder level</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                    <span>{item.sku}</span>
                  </td>
                  <td>{item.location}</td>
                  <td>
                    {item.quantity} {item.unit}
                  </td>
                  <td>
                    {item.reorderLevel} {item.unit}
                  </td>
                </tr>
              ))}

              {lowStockItems.length === 0 && (
                <tr>
                  <td className="dashboard-empty" colSpan="4">
                    No items are currently at reorder level.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Recent purchase orders</h2>
            <p>Latest order activity</p>
          </div>
          <Link to="/orders">Open orders</Link>
        </div>

        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Supplier</th>
                <th>Expected delivery</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td><strong>{order.number}</strong></td>
                  <td>{order.supplier}</td>
                  <td>{order.expected}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;