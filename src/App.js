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
import { useEffect } from "react";
import AtendeeSummary from "./pages/atendee summary/AtendeeSummary";

function App() {
  const user = useSelector((state) => state.user);
  
  
  const sendPushNotification = async (title, tag, body) => {
    var canNotify = false;
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      canNotify = true;
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          canNotify = true;
        }
      });
    }
    console.log(canNotify);
    if (!canNotify) return;
    new Notification(
      title,
      {
        //Uncomment this to keep resending the notification with a sound
        // renotify: true,
        body: body,
        tag: tag,
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACvUlEQVR4AcVXA5AcQRSNbbMUm9u/Y9vJ/I5t27Zt2y6EZca27d3pyZmb+ZWc72b79mYrVfXWvf99v07ldrv/K5J3ACtkMDTeSgqYZGKzgXBOIj+sC7ZBIkwzunBwz0uVxnYCsiuvLpHvkgguE24PcEpkW5zdHMVTTMAfHYWkgD0SITLKgDpYsK7B+i/tamTxioBLY/UsPVbHA6MLlEoWAV3jnSVCkAm3TTCMrg6HCoEoz8PooL1gPwysVTJpAlE5R/hKB3yElx+xVuYkCUjkZxT+5KMu+LzfyGqRRwGdaxQ2n1vqGiyQCN89nTcEzE6UgN6VVfFQ7RFSg+luxLRJFZSzJ+SQAlZ5IBHwC2sVTUBACn7C4lCIIVgL1eGiI59gGQWNzY1DgPJiWfUam6JqnAaQoUE3ifDOgsTTOARovFpU752kxiulQ+9Sq5qBbJQUcFQifFAtSFfXmhWjCUiEFUn9kOZ+lMGf7etklwjNqAglwlUTft52hIGsR0wEBOxPOl98lq7BJolwlwrRvpbkM2MIIJxXOGQj+HsTw2On4JIPDdJUvUWLSSLv6uwMxRLMAanBDhsNSons4t/U8YZK21AKNiMFBt+RKKGQurpAZa8EiUvwdorGwqktSQFFhdMeSdavYSaJ8NvC8HVqP2pD1T+WyAaSY787sbxKgoTCaOU9pUnFMA0nqcHueOefkbIiUn5deTnTbOoEBIyuwD1KLwHbrJYRjXSFlvZLdBlFDSSVHtYRDpA3JLX8EMobGoyQCCdN/FQQJpM9CZJfvpoJOsJj95Aa6S0l2W/B69isB6PwlSKWHFEaaqPxn84ujgrJkuUkuUh+2RF2GlBeXUx+d6+RTxfskJdbMITWNl3nUnw1o0r/Jzj8lUazgCUkWH1yOaUFQ8qWLqcS4RgpaQNhnY4w1oVQN/aQsYGA7/EHOEBR4yVrWnMAAAAASUVORK5CYII=",
        badge: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACvUlEQVR4AcVXA5AcQRSNbbMUm9u/Y9vJ/I5t27Zt2y6EZca27d3pyZmb+ZWc72b79mYrVfXWvf99v07ldrv/K5J3ACtkMDTeSgqYZGKzgXBOIj+sC7ZBIkwzunBwz0uVxnYCsiuvLpHvkgguE24PcEpkW5zdHMVTTMAfHYWkgD0SITLKgDpYsK7B+i/tamTxioBLY/UsPVbHA6MLlEoWAV3jnSVCkAm3TTCMrg6HCoEoz8PooL1gPwysVTJpAlE5R/hKB3yElx+xVuYkCUjkZxT+5KMu+LzfyGqRRwGdaxQ2n1vqGiyQCN89nTcEzE6UgN6VVfFQ7RFSg+luxLRJFZSzJ+SQAlZ5IBHwC2sVTUBACn7C4lCIIVgL1eGiI59gGQWNzY1DgPJiWfUam6JqnAaQoUE3ifDOgsTTOARovFpU752kxiulQ+9Sq5qBbJQUcFQifFAtSFfXmhWjCUiEFUn9kOZ+lMGf7etklwjNqAglwlUTft52hIGsR0wEBOxPOl98lq7BJolwlwrRvpbkM2MIIJxXOGQj+HsTw2On4JIPDdJUvUWLSSLv6uwMxRLMAanBDhsNSons4t/U8YZK21AKNiMFBt+RKKGQurpAZa8EiUvwdorGwqktSQFFhdMeSdavYSaJ8NvC8HVqP2pD1T+WyAaSY787sbxKgoTCaOU9pUnFMA0nqcHueOefkbIiUn5deTnTbOoEBIyuwD1KLwHbrJYRjXSFlvZLdBlFDSSVHtYRDpA3JLX8EMobGoyQCCdN/FQQJpM9CZJfvpoJOsJj95Aa6S0l2W/B69isB6PwlSKWHFEaaqPxn84ujgrJkuUkuUh+2RF2GlBeXUx+d6+RTxfskJdbMITWNl3nUnw1o0r/Jzj8lUazgCUkWH1yOaUFQ8qWLqcS4RgpaQNhnY4w1oVQN/aQsYGA7/EHOEBR4yVrWnMAAAAASUVORK5CYII=",
      }
    );

  };

  // useEffect(() => {
  //   Notification.requestPermission();
  //  const interval = setInterval(() => 
  //   sendPushNotification("New Event!!",
  //                        "Event Created",
  //                        "Envie just launched a musical event!! Book your tickets quickly!"
  //                       ),
  //   10000);
  //  return () => clearInterval(interval);
  // }, []);


  return ( 
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user/event/:_id" element={<UserEventPage />} />
        <Route path="/create" element={<CreatorHomePage />} />
        <Route path="/events" element={<CreatorEvents />} />
        <Route path="/events/:id/*" element={<CreatorEventDetails />} />
        <Route path="/forgetPassword/:id" element={<ForgetPasswordPage/>}/>
        <Route path="/attendeeSummary/:id" element={<AtendeeSummary/>}/>
      </Routes>

      {!user.isCreator && <Footer/>}
    </>
  );
}

export default App;
