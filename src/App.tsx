import { Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed/Feed";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />          {/* Landing page */}
        <Route path="/signin" element={<SignIn />} />  {/* Dedicated page */}
        <Route path="/signup" element={<SignUp />} />  {/* Dedicated page */}
      </Routes>
      <Footer />
    </>
  );
}
