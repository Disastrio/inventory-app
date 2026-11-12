import { useState } from "react";

const inventoryItems = [
  {
    id: 1,
    name: "Nitric Acid (HNO3)",
    sku: "CHEM-001",
    category: "Chemical",
    quantity: 12,
    unit: "Litres",
    reorderLevel: 20,
    location: "Chemical Store A",
  },
  {
    id: 2,
    name: "Hydrochloric Acid",
    sku: "CHEM-002",
    category: "Chemical",
    quantity: 80,
    unit: "Litres",
    reorderLevel: 25,
    location: "Chemical Store A",
  },
  {
    id: 3,
    name: "Spectrophotometer",
    sku: "EQP-001",
    category: "Equipment",
    quantity: 2,
    unit: "Units",
    reorderLevel: 3,
    location: "Equipment Room",
  },
  {
    id: 4,
    name: "Sulfuric Acid",
    sku: "CHEM-003",
    category: "Chemical",
    quantity: 200,
    unit: "Litres",
    reorderLevel: 30,
    location: "Chemical Store B",
  },
];

function Inventory() {
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("All");

  const lowStockCount = inventoryItems.filter(
    (item) => item.quantity <= item.reorderLevel,
  ).length;

  const filteredItems = inventoryItems.filter((item) => {
    const searchTerm = search.trim().toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm) ||
      item.sku.toLowerCase().includes(searchTerm) ||
      item.location.toLowerCase().includes(searchTerm);

    const isLowStock = item.quantity <= item.reorderLevel;
    const matchesStock =
      stockFilter === "All" ||
      (stockFilter === "Low stock" && isLowStock) ||
      (stockFilter === "In stock" && !isLowStock);

    return matchesSearch && matchesStock;
  });

  return (
    <section className="inventory-page">
      <header className="inventory-header">
        <div>
          <h1>Inventory</h1>
          <p>Monitor quantities and reorder levels</p>
        </div>
      </header>

      <div className="inventory-summary">
        <article className="inventory-summary-card">
          <span>Total items</span>
          <strong>{inventoryItems.length}</strong>
        </article>

        <article className="inventory-summary-card low-stock-card">
          <span>Low stock items</span>
          <strong>{lowStockCount}</strong>
        </article>
      </div>

      <div className="inventory-controls">
        <input
          type="search"
          placeholder="Search name, SKU, or location"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search inventory"
        />

        <select
          value={stockFilter}
          onChange={(event) => setStockFilter(event.target.value)}
          aria-label="Filter stock status"
        >
          <option value="All">All stock</option>
          <option value="Low stock">Low stock</option>
          <option value="In stock">In stock</option>
        </select>
      </div>

      <div className="inventory-table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>SKU</th>
              <th>Location</th>
              <th>Quantity</th>
              <th>Reorder level</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((item) => {
              const isLowStock = item.quantity <= item.reorderLevel;

              return (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                    <span className="inventory-category">{item.category}</span>
                  </td>
                  <td>{item.sku}</td>
                  <td>{item.location}</td>
                  <td>
                    {item.quantity} {item.unit}
                  </td>
                  <td>
                    {item.reorderLevel} {item.unit}
                  </td>
                  <td>
                    <span
                      className={`stock-status ${
                        isLowStock ? "stock-status-low" : "stock-status-ok"
                      }`}
                    >
                      {isLowStock ? "Low stock" : "In stock"}
                    </span>
                  </td>
                </tr>
              );
            })}

            {filteredItems.length === 0 && (
              <tr>
                <td className="inventory-empty" colSpan="6">
                  No inventory items match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Inventory;