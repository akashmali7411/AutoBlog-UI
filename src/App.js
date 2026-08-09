import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import BlogMaster from "./components/BlogMaster";
import TopicMaster from "./components/TopicMaster";
import BlogPublish from "./components/BlogPublish";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/blog-master" element={<BlogMaster />} />
          <Route path="/topic-master" element={<TopicMaster />} />
          <Route path="/publish" element={<BlogPublish />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;