import {
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import History from "./pages/History";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/statistics"
          element={<Statistics />}
        />

        <Route
          path="/history"
          element={<History />}
        />
      </Routes>
    </Layout>
  );
}