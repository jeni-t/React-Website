import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import MainPage from "./MainPage.jsx"

function App() {
  return (
       <BrowserRouter>
       <Routes>
       <Route index element={<MainPage />}/>
       </Routes>
       </BrowserRouter>
    
    
     )
  
}

export default App
