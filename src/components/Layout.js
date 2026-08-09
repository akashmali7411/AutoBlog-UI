import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="d-flex">
      
      {/* SIDEBAR */}
      <div
        style={{
          width: "250px",
          minHeight: "100vh",
          background: "#1e293b",
          color: "#fff"
        }}
        className="p-3"
      >
        <h4 className="text-center mb-4">🚀 AutoBlog AI</h4>

        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/">🏠 Dashboard</Link>
          </li>

          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/blog-master">📝 Blog Master</Link>
          </li>

          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/topic-master">⚙ Topic Master</Link>
          </li>

          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/publish">🚀 Blog Publish</Link>
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-grow-1 p-4 bg-light">
        {children}
      </div>
    </div>
  );
};

export default Layout;