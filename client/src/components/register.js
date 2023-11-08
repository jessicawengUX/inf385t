import React, { useState } from "react";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.css";
//import "bootstrap/dist/css/bootstrap.min.css";
 
export default function Register() {
 const [form, setForm] = useState({
   email: "",
   password: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newUser = { ...form };
 
   await fetch("http://localhost:5050/register", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newUser),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ email: "", password: ""});
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div className="container text-center">
     <h3>Register</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="email">Email</label>
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="password">Password</label>
         <input
           type="password"
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="confirmPassword"> Confirm Password</label>
         <input
           type="password"
           className="form-control"
           id="confirmPassword"
           value={form.confirmPassword}
           onChange={(e) => updateForm({ confirmPassword: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Register"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}