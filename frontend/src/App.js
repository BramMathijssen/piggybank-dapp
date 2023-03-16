import { Route, Routes} from "react-router-dom";
import Child from "./pages/Child";

import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Parent from "./pages/Parent";
import SelectUser from "./pages/SelectUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/select-user" element={<SelectUser />} />
      <Route path="/parent" element={<Parent />} />
      <Route path="/child" element={<Child />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
