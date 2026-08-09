import React, { useEffect, useState } from "react";
import API from "../services/api";
import { ToastContainer, toast } from "react-toastify";

const BlogMaster = () => {
  const [form, setForm] = useState({
    blogId: 0,
    blogName: "",
    blogCode: ""
  });

  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const res = await API.get("/BlogMaster/get-all");
      setData(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Error loading data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.blogName || !form.blogCode) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      await API.post("/BlogMaster/save-update", form);
      toast.success("Saved Successfully 🚀");

      setForm({
        blogId: 0,
        blogName: "",
        blogCode: ""
      });

      loadData();
    } catch {
      toast.error("Error saving data ❌");
    }
  };

  const handleEdit = (item) => {
    setForm({
      blogId: item.blogId,
      blogName: item.blogName,
      blogCode: item.blogCode
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await API.delete(`/BlogMaster/delete/${id}`);
        toast.success("Deleted Successfully");
        loadData();
      } catch {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />

      {/* FORM */}
      <div className="card shadow-lg p-4 rounded-4 mb-4">
        <h3 className="text-center text-primary mb-3">🚀 Blog Master</h3>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Blog Name"
          name="blogName"
          value={form.blogName}
          onChange={handleChange}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Blog Code"
          name="blogCode"
          value={form.blogCode}
          onChange={handleChange}
        />

        <button
          className={`btn w-100 rounded-pill ${
            form.blogId === 0 ? "btn-success" : "btn-warning"
          }`}
          onClick={handleSubmit}
        >
          {form.blogId === 0 ? "Save Blog" : "Update Blog"}
        </button>
      </div>

      {/* GRID */}
      <div className="card shadow-lg p-4 rounded-4">
        <h4 className="text-center text-secondary mb-3">📋 Blog List</h4>

        <div className="table-responsive">
          <table className="table table-hover table-bordered text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>Blog Name</th>
                <th>Blog Code</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.blogId}>
                    <td className="fw-bold text-primary">
                      {item.blogName}
                    </td>

                    <td>
                      <span className="badge bg-info text-dark">
                        {item.blogCode}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2 rounded-pill"
                        onClick={() => handleEdit(item)}
                      >
                        ✏ Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm rounded-pill"
                        onClick={() => handleDelete(item.blogId)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-muted text-center">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogMaster;