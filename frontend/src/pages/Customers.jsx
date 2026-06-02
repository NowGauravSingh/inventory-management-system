import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: ""
  });

  const loadCustomers = async () => {
    try {
      const res = await api.get("/customers/");
      setCustomers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/customers/", form);

      setForm({
        full_name: "",
        email: "",
        phone: ""
      });

      loadCustomers();
    } catch (err) {
      alert(
        err.response?.data?.detail ||
        "Unable to create customer"
      );
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await api.delete(`/customers/${id}`);
      loadCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow mb-4">
        <div className="card-header">
          <h4>Add Customer</h4>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>
            <div className="row">

              <div className="col-md-4 mb-3">
                <input
                  className="form-control"
                  placeholder="Full Name"
                  value={form.full_name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      full_name: e.target.value
                    })
                  }
                />
              </div>

              <div className="col-md-3 mb-3">
                <input
                  className="form-control"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value
                    })
                  }
                />
              </div>

              <div className="col-md-3 mb-3">
                <input
                  className="form-control"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value
                    })
                  }
                />
              </div>

              <div className="col-md-2 mb-3">
                <button
                  className="btn btn-success w-100"
                  type="submit"
                >
                  Add
                </button>
              </div>

            </div>
          </form>

        </div>
      </div>

      <div className="card shadow">

        <div className="card-header">
          <h4>Customers</h4>
        </div>

        <div className="card-body">

          <table className="table table-striped table-hover">

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {customers.map((customer) => (
                <tr key={customer.id}>

                  <td>{customer.id}</td>

                  <td>{customer.full_name}</td>

                  <td>{customer.email}</td>

                  <td>{customer.phone}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteCustomer(customer.id)
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

export default Customers;