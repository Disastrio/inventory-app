function ProductTable({products}){
    return(
        <table className="product-table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {products.map((product)=>(
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.sku}</td>
                        <td>{product.category}</td>
                        <td>{product.quantity}</td>
                        <td>{product.unit}</td>
                        <td>
                            <button>View</button>
                            <button>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ProductTable;