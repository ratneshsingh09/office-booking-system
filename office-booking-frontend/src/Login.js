import { useState } from "react";
import axios from "axios";

function Login({ setUser }) {

const [username,setUsername] = useState("")
const [password,setPassword] = useState("")

const login = async () => {

try{

const res = await axios.post(
"http://localhost:8080/api/auth/login",
{username,password}
)

localStorage.setItem("token",res.data.token)

setUser({username})

}
catch(err){
alert("Invalid login")
}

}



return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white shadow-lg rounded-lg p-8 w-80">

<h2 className="text-2xl font-bold text-center mb-6">
Office Booking Login
</h2>

<input
className="border p-2 rounded w-full mb-4"
placeholder="Username"
onChange={(e)=>setUsername(e.target.value)}
/>

<input
type="password"
className="border p-2 rounded w-full mb-4"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600"
onClick={login}
>
Login
</button>

</div>

</div>

)

}

export default Login