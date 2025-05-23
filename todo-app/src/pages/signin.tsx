import { useRef } from "react"
import { Button } from "../components/button"
import { InputBox } from "../components/input"
import axios from "axios";
import { BACKENR_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
    const userRef = useRef();
    const passRef = useRef();
    const navigate = useNavigate()

    async function signin(){
        const username = userRef.current.value;
        const password = passRef.current.value;

        const response = await axios.post(`${BACKENR_URL}/users/signin`, {
            username,
            password
        })
        const token = response.data.token;
        localStorage.setItem("token", token)
        navigate("/dashboard")
    }
    return <div className="h-screen flex flex-col  items-center gap-4 items-center justify-center">
        <div className= "m-20 p-6 border shadow-md rounded-md flex gap-2">
        <div>
          <InputBox reference={userRef} placeholder="Username" />
          <InputBox reference={passRef} placeholder="Password"/>
          <div className="flex justify-center items-center mt-3">
          <Button onclick={signin} text={"Sign Up"}/>
          </div>
         
        </div>
         </div>
         </div>
}