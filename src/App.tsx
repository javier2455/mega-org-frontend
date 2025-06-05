import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/dashboard/Dashboard"
import Projects from "./pages/projects/Projects"
import Tasks from "./pages/tasks/Tasks"
import Users from "./pages/users/Users"
import { Layout } from "./components/shared/Layout"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App