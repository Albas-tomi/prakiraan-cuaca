"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import CustomInput from "@/components/input/CustomInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();

  // submit login
  const handleSumbit = async (event: any) => {
    event.preventDefault();
    setLoading(false);
    setError("");
    try {
      setLoading(true);
      const response = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
      });
      if (response?.ok) {
        push("/");
        setLoading(false);
      }

      if (response?.error) {
        setError(response.error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen flex justify-center items-center p-5">
      <div className="bg-slate-50/50 p-6 rounded  w-full  max-w-[480px]">
        <h1 className="text-gray-700 font-bold mb-6 text-center text-2xl ">
          Sign in to your account
        </h1>
        {error && (
          <p className="text-center relative w-full justify-between  text-red-500 ">
            {error}
          </p>
        )}
        <form onSubmit={handleSumbit} className="w-full   ">
          <CustomInput
            type="email"
            placeholder="example@gmail.com"
            label="Your email"
            name="email"
            id="email"
          />
          <div className="relative w-full items-center justify-between mb-5">
            <CustomInput
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              label="Your password"
              name="password"
              id="password"
            />
            {!showPassword ? (
              <FaEye
                onClick={() => setShowPassword(true)}
                className="absolute z-10 top-[55%] right-5 translate-x-1 cursor-pointer"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setShowPassword(false)}
                className="absolute z-10 top-[55%] right-5 translate-x-1 cursor-pointer"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-gradient-to-bl from-blue-500 to-blue-700 text-white rounded-lg cursor-pointer text-md font-semibold transition-all duration-500 hover:bg-blue-300"
          >
            {loading ? (
              <span className="loading loading-spinner text-white loading-sm"></span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        <p className="text-center mt-5 text-base text-gray-700 ">
          Don&apos;t have an account yet?{" "}
          <Link href="/registrasi" className="text-blue-500 cursor-not-allowed">
            Sign up
          </Link>
        </p>
        <button
          onClick={() => {
            signIn("google");
          }}
          className="bg-white w-full p-3 text-base rounded-md gap-3 my-1  cursor-pointer flex justify-center items-center"
        >
          <Image
            src="/images/googleauth.png"
            width={20}
            height={20}
            alt="google"
          />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
