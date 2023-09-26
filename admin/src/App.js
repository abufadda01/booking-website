import Home from "./pages/home/Home";
import Login from './pages/login/Login'
import List from './pages/list/List'
import Single from './pages/single/Single'
import New from './pages/new/New' 
import { userInputs , productInputs } from "./formSource";

import { BrowserRouter as Router , Routes , Route, Navigate } from "react-router-dom";

import "./style/dark.scss"
import { useState } from "react";
import {useDarkModeContext} from "./context/darkModeContext"
import { useAuthContext } from "./context/AuthContext";



function App() {


  const {darkMode} = useDarkModeContext()
  
  
  const ProtuctedRoute = ({children}) => {
    
    const {user} = useAuthContext()
    
    if(!user) {
      return <Navigate to="/login" />
    }

    return children
  }



  return (
    <div className={darkMode ? "App dark" : "App"}>
      
      <Router>

        <Routes>

          <Route path="/">
            
            <Route path="login" element={<Login/>} />
            <Route index element={<ProtuctedRoute> <Home/> </ProtuctedRoute>} />

            <Route path="users">
              <Route index element={<ProtuctedRoute> <List/> </ProtuctedRoute>} />
              <Route path=":userId" element={<ProtuctedRoute> <Single/> </ProtuctedRoute>} />
              <Route path="new" element={<ProtuctedRoute> <New inputs={userInputs} title="Add a New User" btn="Add User" /> </ProtuctedRoute>} />
            </Route>

            <Route path="products">
              <Route index element={<ProtuctedRoute> <List/> </ProtuctedRoute> } />
              <Route path=":productId" element={<ProtuctedRoute> <Single/> </ProtuctedRoute> } />
              <Route path="new" element={<ProtuctedRoute> <New inputs={productInputs} title="Add a New Product" btn="Add Product" /> </ProtuctedRoute>} />
            </Route>

          </Route>

        </Routes> 
      
      </Router>

    </div>
  );
}

export default App;
