import "./App.css";
import HomePage from "./pages/home/homePage";
import LoginPage from "./pages/authentication/LoginPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignupPage from "./pages/authentication/SignupPage";
import NavBar from "./layouts/nav/NavBar";
import UserEventPage from "./pages/userEvent/UserEventPage";

function App() {
  return (
    // <div>
    //   <NavBar/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/event/user/:id" element={<UserEventPage />} />
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;
