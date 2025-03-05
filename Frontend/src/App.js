import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Schemes from "./pages/Schemes";
import Ecommerce from "./pages/Ecommerce";
import MarketPrice from "./pages/MarketPrice";
import CropDiseaseDetect from "./pages/CropDiseaseDetect";
import FertilizerDealer from "./pages/FertilizerDealer";
import News from "./pages/News";
import LoanPage from "./pages/LoanPage"; 
import YieldSellForm from "./pages/AddYield";
import RentProductForm from "./pages/RentProduct";
import ColdStorageLocator from "./pages/ColdStorageLocator";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Navbar />
        <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/market-price" element={<MarketPrice />} />
            <Route path="/crop-disease-detect" element={<CropDiseaseDetect />} />
            <Route path="/FertilizerDealer" element={<FertilizerDealer />} />
            <Route path="/news" element={<News />} />
            <Route path="/loans" element={<LoanPage />} />
            <Route path="/YieldSellForm" element={<YieldSellForm />} />
            <Route path="/RentProductForm" element={<RentProductForm />} />
            <Route path="/cold-storages" element={<ColdStorageLocator />} />  {/* ✅ Added Cold Storage Page */}

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
