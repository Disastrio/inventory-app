import { useState } from "react";

const chemicals = [
  {
    id: 1,
    name: "Nitric acid",
    sku: "CHEM-001",
    casNumber: "7697-37-2",
    grade: "ACS, 68%",
    quantity: 12,
    unit: "L",
    location: "Chemical store / Shelf A2",
    expiryDate: "30 Apr 2027",
    supplier: "Apex Chemical Supply",
  },
  {
    id: 2,
    name: "Hydrochloric acid",
    sku: "CHEM-002",
    casNumber: "7647-01-0",
    grade: "ACS, 37%",
    quantity: 80,
    unit: "L",
    location: "Chemical store / Shelf A3",
    expiryDate: "15 Aug 2027",
    supplier: "Apex Chemical Supply",
  },
  {
    id: 3,
    name: "Sulfuric acid",
    sku: "CHEM-003",
    casNumber: "7664-93-9",
    grade: "Reagent, 98%",
    quantity: 200,
    unit: "L",
    location: "Chemical store / Shelf B1",
    expiryDate: "02 Nov 2027",
    supplier: "Apex Chemical Supply",
  },
];

function Chemicals() {
  const [search, setSearch] = useState("");

  const filteredChemicals = chemicals.filter((chemical) => {
    const term = search.trim().toLowerCase();

    return [
      chemical.name,
      chemical.sku,
      chemical.casNumber,
      chemical.grade,
      chemical.supplier,
      chemical.location,
    ].some((value) => value.toLowerCase().includes(term));
  });

  return (
    <section className="catalogue-page">
      <header className="catalogue-header">
        <div>
          <h1>Chemicals</h1>
          <p>Chemical catalogue and storage details</p>
        </div>
        <span>{filteredChemicals.length} chemicals</span>
      </header>

      <div className="catalogue-toolbar">
        <input
          type="search"
          placeholder="Search name, SKU, CAS number, or supplier"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search chemicals"
        />
      </div>

      <div className="catalogue-table-wrap">
        <table className="catalogue-table chemicals-table">
          <thead>
            <tr>
              <th>Chemical</th>
              <th>CAS number</th>
              <th>Grade</th>
              <th>On hand</th>
              <th>Location</th>
              <th>Expiry</th>
              <th>Supplier</th>
            </tr>
          </thead>
          <tbody>
            {filteredChemicals.map((chemical) => (
              <tr key={chemical.id}>
                <td>
                  <strong>{chemical.name}</strong>
                  <span>{chemical.sku}</span>
                </td>
                <td>{chemical.casNumber}</td>
                <td>{chemical.grade}</td>
                <td>
                  <strong>{chemical.quantity}</strong> {chemical.unit}
                </td>
                <td>{chemical.location}</td>
                <td>{chemical.expiryDate}</td>
                <td>{chemical.supplier}</td>
              </tr>
            ))}

            {filteredChemicals.length === 0 && (
              <tr>
                <td className="catalogue-empty" colSpan="7">
                  No matching chemicals.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Chemicals;