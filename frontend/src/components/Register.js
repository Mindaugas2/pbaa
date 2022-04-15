import React from 'react'
import { useForm } from "react-hook-form";

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

    const onSubmit = async data => {
        const response = await fetch("http://localhost:8080/api/users", {
            method: "POST",
            headers: { 'Content-Type': 'application/hal+json' },
            body: JSON.stringify({
                "username": data.username,
                "email": data.email,
                "password": data.password
            })
        })
        console.log("Success!")
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className='mb-2'>Username</label>
                        <input {...register("username", { required: true })} className="form-control" />
                        {errors?.username?.type === "required" && <p>This field is required</p>}
                    </div>

                    <div className="form-group">
                        <label className='mb-2'>Email</label>
                        <input {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} className="form-control" />
                        {errors?.email?.type === "required" && <p>This field is required</p>}
                        {errors?.email?.type === "pattern" && <p>Must be a valid email address</p>}
                    </div>

                    <div className="form-group">
                        <label className='mb-2'>Password</label>
                        <input {...register("password", { required: true, minLength: 6, maxLength: 40 })} type="password" className='form-control' />
                        {errors?.password?.type === "required" && <p>This field is required</p>}
                        {errors?.password?.type === "minLength" && <p>Password should be between 6 and 40 characters long</p>}
                        {errors?.password?.type === "maxLength" && <p>Password should be between 6 and 40 characters long</p>}
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block mt-5" type='submit'>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}