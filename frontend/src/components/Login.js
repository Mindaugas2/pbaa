import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import AuthService from "../services/auth.service";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const onSubmit = data => AuthService.login(data.email, data.password)
        .then(() => {
            navigate("/welcome")
            window.location.reload();
        })
        .catch(() => setMessage("Email or password is incorrect"));

    return (


        <section className="vh-100">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-5">
                    <div className="col-xl-12 col-lg-11">
                        <div className="card text-black" style={{ borderRadius: "25px" }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                                    </div>
                                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                        <form onSubmit={handleSubmit(onSubmit)}>

                                            <p className="text-center h1 fw-normal mb-5 mx-1 mx-md-4 mt-4">Sign in</p>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                                                <input {...register("email", { required: true })} className="form-control" />
                                                {errors?.email?.type === "required" && <p>This field is required</p>}
                                            </div>

                                            <div className="form-outline mb-3">

                                                <label className="form-label" htmlFor="form3Example4">Password</label>
                                                <input {...register("password", { required: true })} type="password" className='form-control' />
                                                {errors?.password?.type === "required" && <p>This field is required</p>}
                                                {message && message}
                                            </div>

                                            <div className="text-lg-start mt-4 pt-2">
                                                <button type="submit" className="btn btn-primary btn-lg"
                                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Log in</button>

                                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to={"/register"} className="link-danger">Register</Link></p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >





    )
}

{/* < div className = "col-md-12" >
            <div className="card card-container">
                <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className='mb-2'>Email</label>
                        <input {...register("email", { required: true })} className="form-control" />
                        {errors?.email?.type === "required" && <p>This field is required</p>}
                    </div>
                    <div className="form-group">
                        <label className='mb-2'>Password</label>
                        <input {...register("password", { required: true })} type="password" className='form-control' />
                        {errors?.password?.type === "required" && <p>This field is required</p>}
                        {message && message}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block mt-5" type='submit'>Log in</button>
                    </div>
                </form>
            </div>
        </div > */}









