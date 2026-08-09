import React, { useEffect, useState } from "react";
import API from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import ReactMarkdown from "react-markdown";

const BlogPublish = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [selectedTopicId, setSelectedTopicId] = useState(null);

  const [form, setForm] = useState({
    topicName: "",
    blogName: "",
    keywordDensity: "",
    externalUrl: "",
    keyword: "",
    wordCount: ""
  });

  const [preview, setPreview] = useState("");

  // ✅ NEW STATES (EDITOR)
  const [isEditing, setIsEditing] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  // 🔍 Search Topic
  const handleSearch = async (value) => {
    setSearch(value);

    if (value.length < 2) return;

    try {
      const res = await API.get(`/BlogPublish/search?term=${value}`);
      setSuggestions(res.data);
    } catch {
      toast.error("Search failed");
    }
  };

  // ✅ Select Topic
  const handleSelect = async (item) => {
    setSearch(item.name);
    setSelectedTopicId(item.id);
    setSuggestions([]);

    setForm({
      topicName: item.name || "",
      blogName: item.blogName || item.blog_name || "",
      keywordDensity: item.keywordDensity || item.keyword_density || "",
      externalUrl: item.externalUrl || item.external_url || "",
      keyword: item.keyword || "",
      wordCount: item.wordCount || item.word_count || ""
    });
  };

  // 🚀 Publish
  const handlePublish = async () => {
    if (!selectedTopicId) {
      toast.warning("Select topic first");
      return;
    }

    try {
      const res = await API.post(`/BlogPublish/publish/${selectedTopicId}`);

      setPreview(res.data.blogPreview);
      setEditorContent(res.data.blogPreview); // ✅ editor ला data

      toast.success("Blog Generated 🚀");
    } catch {
      toast.error("Publish failed");
    }
  };

  const handleGooglePublish = async () => {
  try {
    await API.post(`/BlogPublish/publish-google/${selectedTopicId}`);
    toast.success("Published to Blogger 🚀");
  } catch {
    toast.error("Publish failed");
  }
};

  return (
    <div className="container mt-5">
      <ToastContainer />

      {/* SEARCH BOX */}
      <div className="card p-4 shadow-lg rounded-4 mb-4">
        <h3 className="text-center text-primary mb-3">
          🚀 Blog Publish
        </h3>

        <input
          type="text"
          className="form-control"
          placeholder="Search Topic..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <ul className="list-group mt-2">
            {suggestions.map((item) => (
              <li
                key={item.id}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelect(item)}
                style={{ cursor: "pointer" }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* DETAILS */}
      <div className="card p-4 shadow-lg rounded-4 mb-4">
        <h5 className="text-secondary mb-3">📋 Topic Details</h5>

        <div className="row">
          <div className="col-md-6 mb-2">
            <label>Blog Name</label>
            <input className="form-control" value={form.blogName} readOnly />
          </div>

          <div className="col-md-6 mb-2">
            <label>Keyword Density</label>
            <input className="form-control" value={form.keywordDensity} readOnly />
          </div>

          <div className="col-md-6 mb-2">
            <label>External URL</label>
            <input className="form-control" value={form.externalUrl} readOnly />
          </div>

          <div className="col-md-6 mb-2">
            <label>Word Count</label>
            <input className="form-control" value={form.wordCount} readOnly />
          </div>

          <div className="col-md-12 mb-2">
            <label>Keywords</label>
            <textarea className="form-control" value={form.keyword} readOnly />
          </div>
        </div>

        <button
          className="btn btn-success w-100 mt-3 rounded-pill"
          onClick={handlePublish}
        >
          🚀 Generate & Publish Blog
        </button>

        <button
  className="btn btn-danger w-100 mt-2"
  onClick={handleGooglePublish}
>
  🌍 Publish to Google Blogger
</button>
      </div>

      {/* PREVIEW */}
      {preview && (
        <div className="card p-4 shadow-lg rounded-4">
          <h4 className="text-success mb-3">🧠 AI Generated Blog</h4>

          {/* ✅ EDIT BUTTON */}
          <button
            className="btn btn-warning mb-3"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "👁 Preview" : "✏ Edit Blog"}
          </button>

          {/* ✅ EDITOR */}
          {isEditing ? (
            <textarea
              className="form-control"
              rows="12"
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
            />
          ) : (
           <div
  style={{ maxHeight: "400px", overflowY: "auto" }}
  dangerouslySetInnerHTML={{ __html: editorContent }}
/>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogPublish;