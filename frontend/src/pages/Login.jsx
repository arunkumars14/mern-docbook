import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const { token, backendUrl, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState("Sign Up")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if(state === "Sign Up"){
        const {data} = axios.post(backendUrl + '/api/user/register', {name, email, password})
        if(data?.success){
          localStorage.setItem("token", data?.token)
          setToken(data?.token)
        }else{
          toast.error(data?.message)
        }
      }else{
        const {data} = await axios.post(backendUrl + '/api/user/login', {email, password})
        if(data?.success){
          localStorage.setItem("token", data?.token)
          setToken(data?.token)
        }else{
          toast.error(data?.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    if(token){
      navigate("/")
    }
  }, [token])

  return (
    <form action="" onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className="flex flex-col gap-3 m-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">{state === "Sign Up" ? "Create Account" : "Login your Account"}</p>
        <p className="">Please {state === "Sign Up" ? "sign up" : "sign in"} to book appointment</p>

        {
          state === "Sign Up" && <div className="w-full">
            <p className="">Full Name</p>
            <input type="text" className="border border-zinc-300 w-full p-2 mt-1" onChange={(e) => setName(e.target.value)} value={name} required />
          </div>
        }
        <div className="w-full">
          <p className="">Email</p>
          <input type="email" className="border border-zinc-300 w-full p-2 mt-1" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>
        <div className="w-full">
          <p className="">Password</p>
          <input type="password" className="border border-zinc-300 w-full p-2 mt-1" onChange={(e) => setPassword(e.target.value)} value={password} required />
        </div>

        <button type='submit' className="bg-primary text-white w-full py-2 rounded-md text-base">{state === "Sign Up" ? "Create Account" : "Login"}</button>

        {
          state === "Sign Up" ? <p className="">Already have an account? <span className="text-primary underline cursor-pointer" onClick={() => setState("Login")}>Login here</span></p> : <p className="">Create a new account <span className="text-primary underline cursor-pointer" onClick={() => setState("Sign Up")}>click here</span> </p>
        }

      </div>

    </form>
  )
}

export default Login