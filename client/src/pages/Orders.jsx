import { useState } from "react";

const orders = [
  {
    id: 1,
    number: "PO-2026-014",
    supplier: "Apex Chemical Supply",
    orderDate: "2026-10-28",
    expectedDate: "2026-11-18",
    itemCount: 3,
    total: 48600,
    status: "Submitted",
  },
  {
    id: 2,
    number: "PO-2026-013",
    supplier: "Meridian Process Equipment",
    orderDate: "2026-10-22",
    expectedDate: "2026-11-14",
    itemCount: 2,
    total: 72500,
    status: "Part received",
  },
  {
    id: 3,
    number: "PO-2026-012",
    supplier: "Northstar Lab Systems",
    orderDate: "2026-10-15",
    expectedDate: "2026-11-10",
    itemCount: 1,
    total: 18300,
    status: "Received",
  },
  {
    id: 4,
    number: "PO-2026-011",
    supplier: "Core Industrial Gases",
    orderDate: "2026-10-09",
    expectedDate: "2026-11-20",
    itemCount: 4,
    total: 31900,
    status: "Draft",
  },
];

function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function Orders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const term = search.trim().toLowerCase();

    const matchesSearch =
      order.number.toLowerCase().includes(term) ||
      order.supplier.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <section className="orders-page">
      <header className="orders-header">
        <div>
          <h1>Orders</h1>
          <p>Purchase orders and delivery status</p>
        </div>
        <span>{filteredOrders.length} orders</span>
      </header>

      <div className="orders-toolbar">
        <input
          type="search"
          placeholder="Search order number or supplier"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search orders"
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter orders by status"
        >
          <option value="All">All statuses</option>
          <option value="Draft">Draft</option>
          <option value="Submitted">Submitted</option>
          <option value="Part received">Part received</option>
          <option value="Received">Received</option>
        </select>
      </div>

      <div className="orders-table-wrap">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Supplier</th>
              <th>Order date</th>
              <th>Expected</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="order-number">{order.number}</td>
                <td>{order.supplier}</td>
                <td>{formatDate(order.orderDate)}</td>
                <td>{formatDate(order.expectedDate)}</td>
                <td>{order.itemCount}</td>
                <td>{formatCurrency(order.total)}</td>
                <td>{order.status}</td>
              </tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td className="orders-empty" colSpan="7">
                  No matching orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Orders;