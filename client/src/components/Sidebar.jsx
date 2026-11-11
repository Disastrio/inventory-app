import { NavLink } from "react-router-dom";

function Sidebar(){
    return(
        <aside className="sidebar">
            <ul>
                <li>
                    <NavLink to="/">Dashboard</NavLink>
                </li>

                <li>
                    <NavLink to="/products">Products</NavLink>
                </li>

                <li>
                    <NavLink to="/chemicals">Chemicals</NavLink>
                </li>

                <li>
                    <NavLink to="/equipment">Machinery & Equipment</NavLink>
                </li>

                <li>
                    <NavLink to="/inventory">Inventory</NavLink>
                </li>

                <li>
                    <NavLink to="/suppliers">Suppliers</NavLink>
                </li>

                <li>
                    <NavLink to="/orders">Orders</NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
