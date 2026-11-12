import { useState } from "react";

const equipmentItems = [
  {
    id: 1,
    name: "Spectrophotometer",
    assetTag: "EQP-001",
    type: "Laboratory instrument",
    manufacturer: "Thermo Fisher",
    model: "GENESYS 150",
    serialNumber: "SP-1048",
    location: "Equipment room / Bay 1",
    condition: "Operational",
    lastService: "12 Sep 2026",
    nextService: "12 Mar 2027",
  },
  {
    id: 2,
    name: "Process transfer pump",
    assetTag: "EQP-008",
    type: "Centrifugal pump",
    manufacturer: "Flowserve",
    model: "Mark 3",
    serialNumber: "FP-8821",
    location: "Workshop / Line 2",
    condition: "Operational",
    lastService: "04 Oct 2026",
    nextService: "04 Apr 2027",
  },
  {
    id: 3,
    name: "Industrial mixer",
    assetTag: "EQP-012",
    type: "Top-entry mixer",
    manufacturer: "SPX Flow",
    model: "Lightnin XJ",
    serialNumber: "MX-3310",
    location: "Production / Vessel 4",
    condition: "Under maintenance",
    lastService: "21 Oct 2026",
    nextService: "—",
  },
];

function Equipment() {
  const [search, setSearch] = useState("");

  const filteredEquipment = equipmentItems.filter((item) => {
    const term = search.trim().toLowerCase();

    return [
      item.name,
      item.assetTag,
      item.type,
      item.manufacturer,
      item.model,
      item.serialNumber,
      item.location,
      item.condition,
    ].some((value) => value.toLowerCase().includes(term));
  });

  return (
    <section className="catalogue-page">
      <header className="catalogue-header">
        <div>
          <h1>Machinery &amp; Equipment</h1>
          <p>Equipment register and service dates</p>
        </div>
        <span>{filteredEquipment.length} items</span>
      </header>

      <div className="catalogue-toolbar">
        <input
          type="search"
          placeholder="Search name, asset tag, model, or location"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search machinery and equipment"
        />
      </div>

      <div className="catalogue-table-wrap">
        <table className="catalogue-table equipment-table">
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Type</th>
              <th>Manufacturer / model</th>
              <th>Serial number</th>
              <th>Location</th>
              <th>Condition</th>
              <th>Last service</th>
              <th>Next service</th>
            </tr>
          </thead>
          <tbody>
            {filteredEquipment.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.name}</strong>
                  <span>{item.assetTag}</span>
                </td>
                <td>{item.type}</td>
                <td>
                  {item.manufacturer}
                  <span>{item.model}</span>
                </td>
                <td>{item.serialNumber}</td>
                <td>{item.location}</td>
                <td>{item.condition}</td>
                <td>{item.lastService}</td>
                <td>{item.nextService}</td>
              </tr>
            ))}

            {filteredEquipment.length === 0 && (
              <tr>
                <td className="catalogue-empty" colSpan="8">
                  No matching machinery or equipment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Equipment;