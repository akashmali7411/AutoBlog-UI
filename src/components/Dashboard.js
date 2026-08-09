import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h2 className="mb-4">📊 Dashboard</h2>

      <div className="row">

        <div className="col-md-3">
          <div className="card shadow p-3 text-center">
            <h5>Total Blogs</h5>
            <h3 className="text-primary">10</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-3 text-center">
            <h5>Total Topics</h5>
            <h3 className="text-success">25</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-3 text-center">
            <h5>Today Topics</h5>
            <h3 className="text-warning">5</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-3 text-center">
            <h5>Published Blogs</h5>
            <h3 className="text-danger">8</h3>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;