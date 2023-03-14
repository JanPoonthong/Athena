import { useState } from "react";
import "./App.css";
import WaterRising from "./Games/WaterRising";
import StoryBased from "./Games/StoryBased";
import Excel from "./Excel/excel";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from "./Pages/Dashboard";
import GSheetReader from './Excel/GSheetReader'
import Training from "./Pages/Training";

function App() {
  const fetch = GSheetReader;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/training" element={<Training />} />
          <Route path="/waterRising" element={<WaterRising />} />
          <Route path="/storyBased" element={<StoryBased />} />
          <Route path="/excel" element={<Excel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
