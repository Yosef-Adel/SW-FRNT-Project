import "./App.css";
import HomePage from "./pages/home/homePage";
import LoginPage from "./pages/authentication/LoginPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignupPage from "./pages/authentication/SignupPage";
import UserEventPage from "./pages/userEvent/UserEventPage";
import CreatorHomePage from "./pages/creator home/CreatorHome";


function App() {
  return (
    // <div>
    //   <NavBar/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user/event/:_id" element={<UserEventPage />} />
        <Route path="/create" element={<CreatorHomePage />} />
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;
