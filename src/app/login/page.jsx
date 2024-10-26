"use client"
import Link from 'next/link';
import React from 'react';

const LoginPage = () => {
    const handleLogIn = async() => {

    }
    return (
        <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-20 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 dark:bg-gray-100 dark:text-gray-800">
        
        <div className="flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold leading-tight lg:text-5xl">Let s talk!</h2>
            <div className="dark:text-gray-600">Vivamus in nisl metus? Phasellus.</div>
          </div>
          <img className="h-52 md:h-64 lg:h-full" src="https://cdni.iconscout.com/illustration/premium/thumb/login-page-illustration-download-in-svg-png-gif-file-formats--app-developing-development-secure-mobile-webapp-and-pack-design-illustrations-3783954.png" alt="" />
        </div>
        <form onSubmit={handleLogIn} className="card-body">
          <h1 className="text-center text-3xl font-bold">Login!</h1>
          <div className="form-control font-normal">
            <label className="label">
              <span className="text-sm">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              autoComplete="on"
              required
              className="input input-bordered text-sm"
            />
            <p className="text-red-500">emailError</p>
          </div>
  
          <div className="form-control font-normal relative">
            <label className="label">
              <span className="text-sm">Password</span>
            </label>
            <input
            //   type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              autoComplete="on"
              required
              className="input input-bordered text-sm"
            />
            <p className="text-red-500">passwordError</p>
            {/* <span
              className="absolute top-3 right-8 mt-10 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <GoEyeClosed /> : <FiEye />}
            </span> */}
            <label className="label font-normal">
              <a href="#" className="text-sm link link-hover">
                Forgot password?
              </a>
            </label>
            <div className="form-control mt-6">
              <button className="btn text-base font-semibold bg-[#3498db] text-white">
                Login
              </button>
            </div>
          </div>
          <p className="text-center text-base">
            Don&apos;t have an Account?
            <Link href="/signup" className="btn text-base btn-link"> Sign Up</Link>
            <div className="divider px-6">Continue With</div>
          </p>
          {/* <SocialLogin></SocialLogin> */}
        </form>
      </div>
    );
};

export default LoginPage;