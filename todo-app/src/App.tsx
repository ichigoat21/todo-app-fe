import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Dashboard } from "./pages/dashboard"
import { SignUp } from "./pages/signup"
import { SignIn } from "./pages/signin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/signup"} element={<SignUp/>}/>
        <Route path={"/signin"} element={<SignIn/>}/>
        <Route path={"/dashboard"} element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
