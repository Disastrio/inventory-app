import { useState } from "react";
import ProductTable from "../components/ProductTable";

const initialProducts = [
  {
    id: 1,
    name: "Nitric Acid (HNO3)",
    sku: "CHEM-001",
    category: "Chemical",
    quantity: 120,
    unit: "Litres",
  },
  {
    id: 2,
    name: "Hydrochloric Acid",
    sku: "CHEM-002",
    category: "Chemical",
    quantity: 80,
    unit: "Litres",
  },
  {
    id: 3,
    name: "Spectrophotometer",
    sku: "EQP-001",
    category: "Equipment",
    quantity: 4,
    unit: "Units",
  },
  {
    id: 4,
    name: "Sulfuric Acid",
    sku: "CHEM-003",
    category: "Chemical",
    quantity: 200,
    unit: "Litres",
  },
];

function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("Chemical");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("Litres");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filter === "All" || product.category === filter;

    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  function handleSubmit(event) {
    event.preventDefault();

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      sku: sku.trim().toUpperCase(),
      category,
      quantity: Number(quantity),
      unit: unit.trim(),
    };

    setProducts([...products, newProduct]);

    setName("");
    setSku("");
    setCategory("Chemical");
    setQuantity("");
    setUnit("Litres");
    setShowForm(false);
  }

  return (
    <div className="products-page">
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p>Manage your product catalogue</p>
        </div>

        <button
          className="add-product-btn"
          type="button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {showForm && (
        <form className="product-form" onSubmit={handleSubmit}>
          <label>
            Product name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Sodium hydroxide"
              required
            />
          </label>

          <label>
            SKU
            <input
              value={sku}
              onChange={(event) => setSku(event.target.value)}
              placeholder="e.g. CHEM-004"
              required
            />
          </label>

          <label>
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="Chemical">Chemical</option>
              <option value="Equipment">Equipment</option>
            </select>
          </label>

          <label>
            Quantity
            <input
              type="number"
              min="0"
              step="any"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              required
            />
          </label>

          <label>
            Unit
            <input
              value={unit}
              onChange={(event) => setUnit(event.target.value)}
              placeholder="e.g. Litres, Kilograms, Units"
              required
            />
          </label>

          <button className="add-product-btn" type="submit">
            Save Product
          </button>
        </form>
      )}

      <div className="product-controls">
        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="All">All Products</option>
          <option value="Chemical">Chemicals</option>
          <option value="Equipment">Equipment</option>
        </select>
      </div>

      <ProductTable products={filteredProducts} />
    </div>
  );
}

export default Products;