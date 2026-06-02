import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    customer_id: "",
    product_id: "",
    quantity: ""
  });

  const loadData = async () => {
    try {
      const ordersRes = await api.get("/orders/");
      const customersRes = await api.get("/customers/");
      const productsRes = await api.get("/products/");

      setOrders(ordersRes.data);
      setCustomers(customersRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createOrder = async (e) => {
    e.preventDefault();

    try {
      await api.post("/orders/", {
        customer_id: Number(form.customer_id),
        product_id: Number(form.product_id),
        quantity: Number(form.quantity)
      });

      setForm({
        customer_id: "",
        product_id: "",
        quantity: ""
      });

      loadData();
    } catch (err) {
      alert(
        err.response?.data?.detail ||
        "Failed to create order"
      );
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow mb-4">

        <div className="card-header">
          <h4>Create Order</h4>
        </div>

        <div className="card-body">

          <form onSubmit={createOrder}>

            <div className="row">

              <div className="col-md-4 mb-3">
                <select
                  className="form-select"
                  value={form.customer_id}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      customer_id: e.target.value
                    })
                  }
                >
                  <option value="">
                    Select Customer
                  </option>

                  {customers.map((customer) => (
                    <option
                      key={customer.id}
                      value={customer.id}
                    >
                      {customer.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <select
                  className="form-select"
                  value={form.product_id}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      product_id: e.target.value
                    })
                  }
                >
                  <option value="">
                    Select Product
                  </option>

                  {products.map((product) => (
                    <option
                      key={product.id}
                      value={product.id}
                    >
                      {product.name}
                      {" "}
                      (Stock: {product.quantity})
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-2 mb-3">
                <input
                  className="form-control"
                  type="number"
                  placeholder="Quantity"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      quantity: e.target.value
                    })
                  }
                />
              </div>

              <div className="col-md-2 mb-3">
                <button
                  className="btn btn-primary w-100"
                  type="submit"
                >
                  Create
                </button>
              </div>

            </div>

          </form>

        </div>

      </div>

      <div className="card shadow">

        <div className="card-header">
          <h4>Orders</h4>
        </div>

        <div className="card-body">

          <table className="table table-striped table-hover">

            <thead>
              <tr>
                <th>ID</th>
                <th>Customer ID</th>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Total Amount</th>
              </tr>
            </thead>

            <tbody>

              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer_id}</td>
                  <td>{order.product_id}</td>
                  <td>{order.quantity}</td>
                  <td>₹{order.total_amount}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Orders;