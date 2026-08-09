import React, { useEffect, useState } from "react";
import API from "../services/api";
import { ToastContainer, toast } from "react-toastify";

const TopicMaster = () => {
  const [form, setForm] = useState({
    configId: 0,
    blogId: "",
    topicName: "",
    keywordDensity: "",
    externalUrl: "",
    keyword: "",
    wordCount: "" // ✅ NEW
  });

  const [blogs, setBlogs] = useState([]);
  const [data, setData] = useState([]);

  // Load Blog Master for dropdown
  const loadBlogs = async () => {
    try {
      const res = await API.get("/BlogMaster/get-all");
      setBlogs(res.data);
    } catch {
      toast.error("Error loading blogs");
    }
  };

  // Load Today Data
  const loadTodayData = async () => {
    try {
      const res = await API.get("/TopicMaster/get-today");
      setData(res.data);
    } catch {
      toast.error("Error loading today data");
    }
  };

  useEffect(() => {
    loadBlogs();
    loadTodayData();
  }, []);

  // Handle Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save
  const handleSubmit = async () => {
    if (!form.blogId || !form.topicName) {
      toast.warning("Fill required fields");
      return;
    }

    try {
      await API.post("/TopicMaster/save-update", form);
      toast.success("Saved Successfully 🚀");

      setForm({
        configId: 0,
        blogId: "",
        topicName: "",
        keywordDensity: "",
        externalUrl: "",
        keyword: "",
        wordCount: "" // ✅ RESET
      });

      loadTodayData(); // refresh grid
    } catch {
      toast.error("Error saving data");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/TopicMaster/delete/${id}`);
      toast.success("Deleted Successfully");
      loadTodayData();
    }
  };

  // Edit
  const handleEdit = (item) => {
    setForm({
      configId: item.configId,
      blogId: "", // keep same logic
      topicName: item.topicName,
      keywordDensity: item.keywordDensity,
      externalUrl: item.externalUrl,
      keyword: item.keyword,
      wordCount: item.wordCount // ✅ NEW
    });
  };

  return (
    <div className="container mt-5">
      <ToastContainer />

      {/* FORM */}
      <div className="card shadow-lg p-4 rounded-4">
        <h3 className="text-center text-primary mb-4">
          ⚙ Blog Config Master
        </h3>

        {/* Blog Dropdown */}
        <div className="mb-3">
          <label>Select Blog</label>
          <select
            className="form-control"
            name="blogId"
            value={form.blogId}
            onChange={handleChange}
          >
            <option value="">-- Select Blog --</option>
            {blogs.map((b) => (
              <option key={b.blogId} value={b.blogId}>
                {b.blogName}
              </option>
            ))}
          </select>
        </div>

        {/* Topic Name */}
        <div className="mb-3">
          <label>Topic Name</label>
          <input
            type="text"
            className="form-control"
            name="topicName"
            value={form.topicName}
            onChange={handleChange}
          />
        </div>

        {/* Keyword Density */}
        <div className="mb-3">
          <label>Keyword Density (%)</label>
          <input
            type="number"
            className="form-control"
            name="keywordDensity"
            value={form.keywordDensity}
            onChange={handleChange}
          />
        </div>

        {/* External URL */}
        <div className="mb-3">
          <label>External URL Count</label>
          <input
            type="number"
            className="form-control"
            name="externalUrl"
            value={form.externalUrl}
            onChange={handleChange}
          />
        </div>

        {/* Word Count */}
        <div className="mb-3">
          <label>Word Count</label>
          <input
            type="number"
            className="form-control"
            name="wordCount"
            value={form.wordCount}
            onChange={handleChange}
          />
        </div>

        {/* Keywords */}
        <div className="mb-3">
          <label>Keywords (comma separated)</label>
          <textarea
            className="form-control"
            rows="3"
            name="keyword"
            value={form.keyword}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          className="btn btn-success w-100 rounded-pill"
          onClick={handleSubmit}
        >
          Save Config
        </button>
      </div>

      {/* GRID */}
      <div className="card shadow-lg p-4 rounded-4 mt-4">
        <h4 className="text-center text-secondary mb-3">📅 Today Topics</h4>

        <div className="table-responsive">
          <table className="table table-hover table-bordered text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>Blog</th>
                <th>Topic</th>
                <th>Density</th>
                <th>URL</th>
                <th>Word Count</th> {/* ✅ NEW */}
                <th>Keywords</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.configId}>
                    <td className="fw-bold text-primary">
                      {item.blogName}
                    </td>

                    <td>{item.topicName}</td>

                    <td>
                      <span className="badge bg-success">
                        {item.keywordDensity}%
                      </span>
                    </td>

                    <td>
                      <span className="badge bg-warning text-dark">
                        {item.externalUrl}
                      </span>
                    </td>

                    <td>
                      <span className="badge bg-info">
                        {item.wordCount}
                      </span>
                    </td>

                    <td style={{ maxWidth: "200px" }}>
                      <small>{item.keyword}</small>
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
                        onClick={() => handleDelete(item.configId)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-muted">
                    No Data Today
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

export default TopicMaster;