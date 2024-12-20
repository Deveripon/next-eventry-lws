"use client";
import { loginUser } from "@/app/_actions/actions";
import { useAuth } from "@/app/_hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
    const [error, setError] = useState(null);
    const { setAuth } = useAuth();
    const router = useRouter();
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            if (!formData.get("email") || !formData.get("email")) {
                throw new Error("Please provide Email and Password");
            }
            const foundUser = await loginUser(formData);
            if (foundUser) {
                setAuth(foundUser);
                router.push("/");
            } else {
                throw new Error("Email or Password Not Matched");
            }
        } catch (error) {
            setError(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='login-form'>
            <p className='error-message text-red-500'>{error?.message}</p>
            <div>
                <label htmlFor='email'>Email Address</label>
                <input type='email' name='email' id='email' />
            </div>
            {/* password */}
            <div>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' id='password' />
            </div>
            <button
                type='submit'
                className='btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800'>
                Login
            </button>
        </form>
    );
};

export default LoginForm;
