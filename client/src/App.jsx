import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { PageNotFound } from "./pages/PageNotFound";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />}></Route>
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <Home></Home>
            </ProtectedRoutes>
          }
        ></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </div>
  );
};

export default App;
