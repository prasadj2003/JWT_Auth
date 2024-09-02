// import { useState } from 'react'
// import Signup from './components/Signup'
// import Signin from './components/Signin'
// import Dashboard from './components/Dashboard'
// import {BrowserRouter, Route, Routes} from "react-router-dom"


// function App() {

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/signup' element={<Signup />}></Route>
//         <Route path='/signin' element={<Signin />}></Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App


import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";

// Custom component for protected routes
function ProtectedRoute({ element, ...rest }) {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/signin" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated by looking for the token in local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* Protect the dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={<Dashboard />}
            />
          }
        />
        {/* Redirect to dashboard if authenticated */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
