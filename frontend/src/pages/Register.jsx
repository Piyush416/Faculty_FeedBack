import React, { useEffect, useState } from 'react'
import './Register.css'

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [enrol, setEnrol] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // useEffect(()=>{
    //     console.log(enrol);
    // },[enrol])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(firstName, lastName, enrol, email, password);
        const response = await fetch(`https://${VITE_API_URL}/user/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, enrol, email, password })
        })

        const resp = await response.json();

        if (response.ok) {
            alert(resp.message)

        }
        else {
            alert(resp.message)
        }
    }



    return (
        <div className="registerContainer">
            <div className="blurContainer">
                <form onSubmit={handleSubmit}>
                    <h2>Registration</h2>
                    <div className="linediv" />
                    <div className="input-filed_name">
                        <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required />
                        <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <input type="Number" placeholder="Enrollment Number" onChange={(e) => setEnrol(e.target.value)} required />
                    <input type="text" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} required />
                    <input type="submit" />
                </form>
            </div>
        </div>
    )
}

export default Register
