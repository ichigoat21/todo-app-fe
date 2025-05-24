import { useRef } from "react";
import { Button } from "../components/button"
import { InputBox } from "../components/input"
import axios from "axios";
import { BACKENR_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const navigate = useNavigate()
    // @ts-ignore - useRef without proper typing
    const userRef = useRef();
    // @ts-ignore - useRef without proper typing
    const passRef = useRef();

    async function signup(){
        // @ts-ignore - userRef.current might be null or untyped
        const username = userRef.current.value;
        // @ts-ignore - passRef.current might be null or untyped (also fixed bug: was userRef instead of passRef)
        const password = passRef.current.value;
        
        axios.post(`${BACKENR_URL}/users/signup`, {
            username,
            password
        })
        navigate("/signin")
    }

    return <div className="h-screen flex flex-col  items-center gap-4 items-center justify-center">
        <div className= "m-20 p-6 border shadow-md rounded-md flex gap-2">
        <div>
          <InputBox reference={userRef} placeholder="Username" />
          <InputBox reference={passRef} placeholder="Password"/>
          <div className="flex justify-center items-center mt-3">
          <Button onclick={signup} text={"Sign Up"}/>
          </div>
         
        </div>
         </div>
         </div>
}