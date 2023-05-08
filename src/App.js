import "./App.css";
import HomePage from "./pages/home/homePage";
import LoginPage from "./pages/authentication/LoginPage";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/authentication/SignupPage";
import UserEventPage from "./pages/userEvent/UserEventPage";
import CreatorHomePage from "./pages/creator home/CreatorHome";
import ForgetPasswordPage from "./pages/authentication/ForgetPasswordPage";
import { useSelector } from "react-redux";
import Footer from "./layouts/footer/Footer";
import CreatorEvents from "./pages/creator events/CreatorEvents";
import CreatorEventDetails from "./pages/CreatorEventDetails/CreatorEventDetails";
import addNotification from 'react-push-notification';
import { Notifications } from 'react-push-notification';
import { useEffect } from "react";

function App() {
  const user = useSelector((state) => state.user);
  
  const handleNotification = () => {
    addNotification({
        title: 'Warning',
        subtitle: 'This is a subtitle',
        message: 'This is a very long message',
        theme: 'darkblue',
        native: true
    });
} ;

  useEffect(() => {
   const interval = setInterval(() => handleNotification(), 1000);
   return () => clearInterval(interval);
  }, []);


  return ( 
    <>
      <Notifications />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user/event/:_id" element={<UserEventPage />} />
        <Route path="/create" element={<CreatorHomePage />} />
        <Route path="/events" element={<CreatorEvents />} />
        <Route path="/events/:id/*" element={<CreatorEventDetails />} />
        <Route path="/forgetPassword/:id" element={<ForgetPasswordPage/>}/>
      </Routes>

      {!user.isCreator && <Footer/>}
    </>
  );
}

export default App;
