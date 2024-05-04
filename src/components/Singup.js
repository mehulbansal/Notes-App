import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
function Singup() {
  const host = 'http://localhost:5000/';
  let navigate = useNavigate();
  const [user, setUser] = useState({name:"", email:"", password:"", cpassword:""})

  const handleSubmit = async (e) =>{
    e.preventDefault(); 
        
    if(user.password === user.cpassword){
        const url = `${host}api/auth/createUser/`;
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
            "Content-Type": "application/json",
            },
            body : JSON.stringify({name: user.name, email: user.email, password: user.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
          localStorage.setItem('token',json.token);
          navigate('/');
      }
    }
      else{
        alert("Password didn't match");
      }
  }


  const onchange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="name" name='name' value={user.name} onChange={onchange} />

        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="email" name='email' value={user.email} onChange={onchange} />

        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={user.password} onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' value={user.cpassword} onChange={onchange} />
        </div>

        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Singup