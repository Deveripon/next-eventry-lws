"use client";
import React from "react";
import { useAuth } from "../_hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginLogoutButtons = () => {
    const { auth, setAuth } = useAuth();
    const router = useRouter();
    function handleLogout() {
        setAuth(null);
        router.push("/auth/login");
    }
    return (
        <div>
            {!auth && <Link href='/auth/login'>Login</Link>}
            {auth && (
                <span>
                    <h4>{auth?.name}</h4>
                    <span className='mx-2'>|</span>
                    <button onClick={handleLogout}>Logout</button>
                </span>
            )}
        </div>
    );
};

export default LoginLogoutButtons;
