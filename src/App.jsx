import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// * components
import MainNavBar from "./components/_partials/MainNavBar";

// * pages
import Index from "./pages/public/Index";
import Cartelera from "./pages/public/Cartelera";

// * subpages

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <div>
          <MainNavBar />
        </div>

        <div className="p-2 w-screen h-screen">
          <Routes>
            <Route index element={<Index />} />
            <Route path="/cartelera" element={<Cartelera />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
