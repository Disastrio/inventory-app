import { useState } from "react";

const inventoryItems = [
  {
    id: 1,
    name: "Nitric acid",
    sku: "CHEM-001",
    category: "Chemical",
    batch: "NA-26041",
    location: "Chemical store / Shelf A2",
    quantity: 12,
    unit: "L",
    reorderLevel: 20,
    expiryDate: "2027-04-30",
  },
  {
    id: 2,
    name: "Hydrochloric acid",
    sku: "CHEM-002",
    category: "Chemical",
    batch: "HCL-26018",
    location: "Chemical store / Shelf A3",
    quantity: 80,
    unit: "L",
    reorderLevel: 25,
    expiryDate: "2027-08-15",
  },
  {
    id: 3,
    name: "Spectrophotometer",
    sku: "EQP-001",
    category: "Equipment",
    batch: "SP-1048",
    location: "Equipment room / Bay 1",
    quantity: 2,
    unit: "units",
    reorderLevel: 3,
    expiryDate: null,
  },
  {
    id: 4,
    name: "Sulfuric acid",
    sku: "CHEM-003",
    category: "Chemical",
    batch: "SA-25992",
    location: "Chemical store / Shelf B1",
    quantity: 200,
    unit: "L",
    reorderLevel: 30,
    expiryDate: "2027-11-02",
  }
];

function formatDate(date) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function Inventory() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const lowStockCount = inventoryItems.filter(
    (item) => item.quantity <= item.reorderLevel,
  ).length;

  const filteredItems = inventoryItems.filter((item) => {
    const term = search.trim().toLowerCase();

    const matchesSearch = [
      item.name,
      item.sku,
      item.batch,
      item.location,
    ].some((value) => value.toLowerCase().includes(term));

    const isLowStock = item.quantity <= item.reorderLevel;
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Reorder" && isLowStock) ||
      (statusFilter === "In stock" && !isLowStock);

    return matchesSearch && matchesStatus;
  });

  return (
    <section className="inventory-page">
      <header className="inventory-header">
        <div>
          <h1>Inventory</h1>
          <p>Stock by item, batch, and storage location</p>
        </div>

        <div className="inventory-count">
          <strong>{inventoryItems.length}</strong> items
          <span aria-hidden="true">·</span>
          <strong>{lowStockCount}</strong> at reorder level
        </div>
      </header>

      <div className="inventory-toolbar">
        <input
          type="search"
          placeholder="Search inventory"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search by item, SKU, batch, or location"
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter inventory by status"
        >
          <option value="All">All stock</option>
          <option value="Reorder">At reorder level</option>
          <option value="In stock">Above reorder level</option>
        </select>

        <span className="inventory-result-count">
          {filteredItems.length} of {inventoryItems.length} items
        </span>
      </div>

      <div className="inventory-table-wrap">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Batch / serial</th>
              <th>Location</th>
              <th>On hand</th>
              <th>Reorder level</th>
              <th>Expiry</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((item) => {
              const needsReorder = item.quantity <= item.reorderLevel;

              return (
                <tr key={item.id}>
                  <td>
                    <strong className="inventory-item-name">{item.name}</strong>
                    <span className="inventory-item-detail">
                      {item.sku} · {item.category}
                    </span>
                  </td>
                  <td>{item.batch}</td>
                  <td>{item.location}</td>
                  <td>
                    <strong>{item.quantity}</strong> {item.unit}
                  </td>
                  <td>
                    {item.reorderLevel} {item.unit}
                  </td>
                  <td>{formatDate(item.expiryDate)}</td>
                  <td>
                    {needsReorder ? "Reorder" : "In stock"}
                  </td>
                </tr>
              );
            })}

            {filteredItems.length === 0 && (
              <tr>
                <td className="inventory-empty" colSpan="7">
                  No matching inventory items.
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