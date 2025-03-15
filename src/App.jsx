import "./App.css";
import Account from "./Pages/Account_page/Account";
import Myplaces from "./Pages/Account_page/Myplaces/Myplace";
import Booking from "./Pages/Account_page/Booking/Booking";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import Add_new_place from "./Pages/Account_page/Myplaces/Add_Place/Add_new_place";
import Home_place from "./Pages/Home_place/Home_place"
import Single_book from "./Pages/Account_page/Booking/single_booking/Single_book";
import Succes from "./Pages/payment_result/Succes";
import Fail from "./Pages/payment_result/Fail"
function App() {
  return (
    <>
      <div>
        <Routes>
        <Route path="/account" element={<Account />} />
        <Route path="/account/Booking" element={<Booking />} />
        <Route path="/account/Booking/:id" element={<Single_book />} />
        <Route path="/account/myplaces" element={<Myplaces/>} />
        <Route path="/account/myplaces/new" element={<Add_new_place/>} />
        <Route path="/account/places/:id" element={<Add_new_place/>} />
        <Route path="/home-place/:id" element={<Home_place/>} />
        <Route path="/success" element={<Succes />} />
        <Route path="/fail" element={<Fail />} />
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
