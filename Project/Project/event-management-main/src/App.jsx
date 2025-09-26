import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EmployeeManagementHome from "./components/Home";
import EmployeeList from "./components/EmployeeList";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";

function App() {
  return (
   
      <Routes>
        {/* Layout wraps all pages so navbar is persistent */}
        <Route path="/" element={<Layout />}>
          <Route index element={<EmployeeManagementHome />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
   
  );
}

export default App;
