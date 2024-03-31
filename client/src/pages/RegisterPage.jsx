import { useState } from "react"

export default function RegisterPage() {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");


    async function register(ev){
        ev.preventDefault();
        const response=await fetch('http://localhost:4000/register',{
            method:'POST',
            body:JSON.stringify({username,password,email}),
            headers:{'Content-Type':'application/json'},
        });
        if(response.status!==200){
            alert('registration failed');
        }
        else{
            alert('registration successfull');
        }

    }

  return (
    <form className="register" onSubmit={register} action="">
        <h1>Register</h1>
            <input type="text" name="" id="" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type="text" name="" id="" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" name="" id="" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button>Register</button>

        </form>
  )
}
