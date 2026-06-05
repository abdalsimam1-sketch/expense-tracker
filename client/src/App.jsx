import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./components/ProtectedRoutes";

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
      </Routes>
    </div>
  );
};

export default App;
