import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: ""
  });

  const loadProducts = async () => {
    try {
      const res = await api.get("/products/");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/products/", {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity)
      });

      setForm({
        name: "",
        sku: "",
        price: "",
        quantity: ""
      });

      loadProducts();
    } catch (err) {
      alert(
        err.response?.data?.detail ||
        "Failed to create product"
      );
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      loadProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow mb-4">
        <div className="card-header">
          <h4>Add Product</h4>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-3 mb-3">
                <input
                  className="form-control"
                  placeholder="Product Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value
                    })
                  }
                />
              </div>

              <div className="col-md-2 mb-3">
                <input
                  className="form-control"
                  placeholder="SKU"
                  value={form.sku}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      sku: e.target.value
                    })
                  }
                />
              </div>

              <div className="col-md-2 mb-3">
                <input
                  className="form-control"
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      price: e.target.value
                    })
                  }
                />
              </div>

              <div className="col-md-2 mb-3">
                <input
                  className="form-control"
                  type="number"
                  placeholder="Stock"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      quantity: e.target.value
                    })
                  }
                />
              </div>

              <div className="col-md-3 mb-3">
                <button
                  className="btn btn-primary w-100"
                  type="submit"
                >
                  Add Product
                </button>
              </div>

            </div>

          </form>

        </div>
      </div>

      <div className="card shadow">

        <div className="card-header">
          <h4>Products</h4>
        </div>

        <div className="card-body">

          <table className="table table-striped table-hover">

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {products.map((product) => (
                <tr key={product.id}>

                  <td>{product.id}</td>

                  <td>{product.name}</td>

                  <td>{product.sku}</td>

                  <td>₹{product.price}</td>

                  <td>{product.quantity}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteProduct(product.id)
                      }
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}

export default Products;