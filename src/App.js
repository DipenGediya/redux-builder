import { Route, Routes } from "react-router-dom";
import UserNavbar from "./users/header/Navbar";
import Home from "./users/pages/Home";
import About from "./users/pages/About";
import Product from "./users/pages/Product";
import AdminNavbar from "./admin/header/Navbar";
import Dashborad from "./admin/pages/Dashborad";
import Manage from "./admin/pages/Manage";
function App() {

  let role = "admin";

  if (role == "user") {
    return (
        <>
          <UserNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/:id" element={<AddToCart />} />
          </Routes>
        </>

    );
  } else if (role == "admin") {
    return (
        <>
          <AdminNavbar />
          <Routes>
            <Route path="/" element={<Dashborad />} />
            <Route path="/manage" element={<Manage />} />
          </Routes>
        </>
    )
  }

}

export default App;
