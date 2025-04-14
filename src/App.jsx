import { Routes, Route } from "react-router-dom";
import Query from "./components/query";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Query />} />
    </Routes>
  );
}

export default App;
