import { Router, Route, Routes, Navigate, Link } from "react-router-dom";

import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import SelectUser from "./pages/SelectUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/select-user" element={<SelectUser />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
