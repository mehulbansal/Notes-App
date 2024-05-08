import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Login (props) {
    const host = 'http://localhost:5000/';
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({email:"", password:""})

    const handleSubmit = async (e) =>{
        e.preventDefault(); 
        
        const url = `${host}api/auth/authUser/`;
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
            "Content-Type": "application/json",
            },
            body : JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json);


        if(json.success){
            localStorage.setItem('token',json.token);
            navigate('/');
            props.showAlert("Login Successful", "success");
        }
        else{
            props.showAlert("Check Credentials", "danger");
        }
    }

    const onchange = (e) =>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="email" name='email' value={credentials.email} onChange={onchange}/>

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange}/>
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login;