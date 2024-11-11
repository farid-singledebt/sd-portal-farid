import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import Auth from "./utility/Auth";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import Login from "./pages/Login";
import ReportChange from "./pages/ReportChange";
import AdvocateLawyer from "./pages/AdvocateLawyer";
import ParaLegal from "./pages/ParaLegal";
import MakePayment from "./pages/MakePayment";
import AccountManager from "./pages/AccountManager";
import Documents from "./pages/Documents";
import ToDo from "./pages/ToDo";
import Journal from "./pages/Journal";
import Ticket from "./pages/Ticket";
import Help from "./pages/Help";
import TermsConditions from "./pages/TermsConditions";
import FAQ from "./pages/FAQ";

const App = () => {
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<Auth Component={Home} />} />
        <Route path="/userdetails" element={<Auth Component={UserDetails} />} />
        <Route
          path="/reportchange"
          element={<Auth Component={ReportChange} />}
        />
        <Route
          path="/advocatelawyer"
          element={<Auth Component={AdvocateLawyer} />}
        />
        <Route path="/paralegal" element={<Auth Component={ParaLegal} />} />
        <Route path="/makepayment" element={<Auth Component={MakePayment} />} />
        <Route
          path="/accountmanager"
          element={<Auth Component={AccountManager} />}
        />
        <Route path="/documents" element={<Auth Component={Documents} />} />
        <Route path="/todo" element={<Auth Component={ToDo} />} />
        <Route path="/journal" element={<Auth Component={Journal} />} />
        <Route path="/ticket" element={<Auth Component={Ticket} />} />
        {/*  */}
        <Route path="/help" element={<Help />} />
        {/*  */}
        <Route path="/login" element={<Login />} />
        {/*  */}
        <Route path="/termsconditions" element={<TermsConditions />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </AppContextProvider>
  );
};

export default App;
