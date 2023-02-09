import { useState } from "react";
import { AuthState } from "../Context/AuthContext";

export const useLogin = () => {
    const { dispatch } = AuthState()
    const [error,setError] = useState(null)
    const [isLoading,setLoading] = useState(null)

    const login = async (email,password) => {
        setLoading(true)
        setError(null)
        const response = await fetch('https://web-store-mern.vercel.app/login',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({email,password})
        })
        const json = await response.json()
        // handle when response fails
        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }
        if(response.ok){
            // save user to localstorage
            localStorage.setItem('user',JSON.stringify(json))
            // update auth context
            dispatch({type: 'LOGIN',payload: json})
            setLoading(false)
        }
    }

    return { login ,isLoading, error }
}