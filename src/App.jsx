import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
// components import
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
// pages import
import UserAuthForm from "./pages/userAuthForm";
import HomePage from "./pages/home";
import Editor from "./pages/editor";
import PageLoadingBar from "./components/PageLoadingBar";

export const UserContext = createContext({});

const App = () => {
   const [userAuth, setUserAuth] = useState({});

   useEffect(() => {
      const userInSession = lookInSession("user");
      userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null });
   }, []);

   return (
      <Router>
         <UserContext.Provider value={{ userAuth, setUserAuth }}>
            <PageLoadingBar />
            <Toaster />

            <Routes>
               <Route path="/" element={<Navbar />}>
                  <Route index element={<HomePage />} />
                  <Route path="/signin" element={<UserAuthForm type="signin" />} />
                  <Route path="/signup" element={<UserAuthForm type="signup" />} />
               </Route>

               <Route path="/editor" element={<Editor />} />
            </Routes>
         </UserContext.Provider>
      </Router>
   );
};

export default App;
