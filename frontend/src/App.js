import React from 'react';
import PromotionsPage from './pages/PromotionsPage';
// import UserPromotionPage from './pages/UserPromotionPage'; 
import './styles/styles.css';

function App() {
  return (
    <div className="App">
      <PromotionsPage />
    </div>
  );
}

export default App;



// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import PromotionsPage from "./pages/PromotionsPage";
// import UserPromotionPage from "./pages/UserPromotionPage";
// import "./styles/styles.css";

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <nav className="p-4 bg-gray-200 flex gap-4">
//           <Link to="/">Promotions</Link>
//           <Link to="/manage">Manage Promotions</Link>
//         </nav>

        
//         <Routes>
//           <Route path="/" element={<PromotionsPage />} />
//           <Route path="/manage" element={<UserPromotionPage />} /> 
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
