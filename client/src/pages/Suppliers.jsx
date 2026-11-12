import { useState } from "react";

const suppliers = [
  {
    id: 1,
    name: "Apex Chemical Supply",
    code: "SUP-001",
    contact: "Priya Sharma",
    email: "priya@apexchem.example",
    phone: "+91 22 4100 2100",
    supplies: "Industrial acids",
    status: "Active",
  },
  {
    id: 2,
    name: "Meridian Process Equipment",
    code: "SUP-002",
    contact: "Arjun Mehta",
    email: "arjun@meridian.example",
    phone: "+91 20 4200 3150",
    supplies: "Pumps and seals",
    status: "Active",
  },
  {
    id: 3,
    name: "Northstar Lab Systems",
    code: "SUP-003",
    contact: "Neha Rao",
    email: "neha@northstar.example",
    phone: "+91 80 4300 1280",
    supplies: "Lab instruments",
    status: "On hold",
  },
  {
    id: 4,
    name: "Core Industrial Gases",
    code: "SUP-004",
    contact: "Vikram Das",
    email: "vikram@coregases.example",
    phone: "+91 33 4400 6400",
    supplies: "Industrial gases",
    status: "Active",
  },
];

function Suppliers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredSuppliers = suppliers.filter((supplier) => {
    const term = search.trim().toLowerCase();

    const matchesSearch = [
      supplier.name,
      supplier.code,
      supplier.contact,
      supplier.supplies,
    ].some((value) => value.toLowerCase().includes(term));

    const matchesStatus =
      statusFilter === "All" || supplier.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <section className="suppliers-page">
      <header className="suppliers-header">
        <div>
          <h1>Suppliers</h1>
          <p>Supplier contacts and supplied materials</p>
        </div>
        <span>{filteredSuppliers.length} suppliers</span>
      </header>

      <div className="suppliers-toolbar">
        <input
          type="search"
          placeholder="Search supplier, contact, or supplied item"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search suppliers"
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter suppliers by status"
        >
          <option value="All">All statuses</option>
          <option value="Active">Active</option>
          <option value="On hold">On hold</option>
        </select>
      </div>

      <div className="suppliers-table-wrap">
        <table className="suppliers-table">
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Contact</th>
              <th>Email / phone</th>
              <th>Supplies</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>
                  <strong>{supplier.name}</strong>
                  <span className="supplier-code">{supplier.code}</span>
                </td>
                <td>{supplier.contact}</td>
                <td>
                  <a href={`mailto:${supplier.email}`}>{supplier.email}</a>
                  <span className="supplier-phone">{supplier.phone}</span>
                </td>
                <td>{supplier.supplies}</td>
                <td>{supplier.status}</td>
              </tr>
            ))}

            {filteredSuppliers.length === 0 && (
              <tr>
                <td colSpan="5" className="suppliers-empty">
                  No matching suppliers.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Suppliers;