import { useState } from "react"
import { Navigate } from "react-router-dom";
import "./Form.css"

export default function RegisterPage() {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const [redirect,setRedirect]=useState(false);

    async function register(ev){
        ev.preventDefault();
        console.log("api call: ",username + password+ email);
        const response=await fetch('http://localhost:4000/register',{
            method:'POST',
            body:JSON.stringify({username,password,email}),
            headers:{'Content-Type':'application/json'},
        });
        console.log("response: ", response);
        if(response.status!==200){
            alert('registration failed');
        }
        else{
            alert('registration successfull');
            setRedirect(true);
        }

    }
    if(redirect){
        return <Navigate to={'/login'} />
    }

  return (
    <div className="container">
    <form id="contact" className="register" onSubmit={register} action="">
        <h1>Register</h1>
            <input type="text" name=""  placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type="text" name=""  placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" name=""  placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button>Register</button>

        </form>
        </div>
  )
}
