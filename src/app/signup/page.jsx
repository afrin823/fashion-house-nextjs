"use client"
import Link from "next/link";

const SignUpPage = () => {

  const handleSignUp = async(event) => {
    event.preventDefault();
    const newUser = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.email.value
    }
    console.log(newUser);
  }

    return (
        <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8  py-20 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 dark:bg-gray-100 dark:text-gray-800">
      <div className="flex flex-col justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold leading-tight lg:text-5xl">Let s talk!</h2>
          <div className="dark:text-gray-600">Vivamus in nisl metus? Phasellus.</div>
        </div>
        {/* <Lottie animationData={signUp} data-aos="fade-right" className="h-52 md:h-64 lg:h-full" /> */}
        <img className="h-52 md:h-64 lg:h-full" src="https://png.pngtree.com/png-clipart/20230825/original/pngtree-signing-up-for-a-course-isolated-cartoon-vector-illustrations-picture-image_8710389.png" alt="" />
      </div>
      <form onSubmit={handleSignUp} className="space-y-6">
        <h1 className="text-center text-3xl font-bold ">Sign Up!
        </h1>
        <div className="form-control font-semibold">
          <label className="label">
            <span className="font-normal text-sm">Name</span>
          </label>
          <input
            type="text"
             name="name"
            placeholder="Name"
            className="input input-bordered"
            required
          
          />
        </div>

        <div className="form-control font-semibold">
          <label className="label">
            <span className="font-normal text-sm">Email</span>
          </label>
          <input
            type="email" name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />

        </div>
        <div className="form-control font-semibold relative">
          <label className="label">
            <span className="font-normal text-sm">Password</span>
          </label>
          <input
           type="password" name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control text-2xl font-semibold ">
          <button className="btn text-base font-semibold bg-[#3498db] text-white">
            Sign Up
          </button>
        </div>
        <div className="text-center text-sm">
          Already Have Account? Please
          <Link href="/login" className="btn text-sm btn-link">Log In</Link>
          <p className="divider px-6 pt-0">Continue With</p>
        </div>
        {/* <SocialLogin></SocialLogin> */}
      </form>
    </div>
    );
};

export default SignUpPage;