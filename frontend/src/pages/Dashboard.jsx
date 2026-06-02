import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/dashboard/")
      .then((res) => {
        setData(res.data);
      })
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="container mt-5">
        <h3>Loading Dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">
        Inventory Dashboard
      </h1>

      <div className="row">

        <div className="col-md-4 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Total Products</h5>
              <h2>{data.total_products}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Total Customers</h5>
              <h2>{data.total_customers}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Total Orders</h5>
              <h2>{data.total_orders}</h2>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow mt-4">
        <div className="card-header">
          Low Stock Products
        </div>

        <div className="card-body">

          {data.low_stock_products.length === 0 ? (
            <p>No low stock products.</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Stock</th>
                </tr>
              </thead>

              <tbody>
                {data.low_stock_products.map(
                  (product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.sku}</td>
                      <td>{product.quantity}</td>
                    </tr>
                  )
                )}
              </tbody>

            </table>
          )}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;