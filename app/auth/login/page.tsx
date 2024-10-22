"use client";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";

import axiosInstance from "@/lib/axiosInstance";

type TLoginInfo = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // For accessing URL query parameters
  const redirect = searchParams.get("redirect"); // Get redirect parameter from UR

  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);

  const togglePasswordVisibility = () =>
    setIsVisiblePassword(!isVisiblePassword);

  // submission
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TLoginInfo>();
  const password = watch("password");

  const onSubmit = async (user: TLoginInfo) => {
    try {
      const dataForBackend: TLoginInfo = {
        email: user.email,
        password: user.password,
      };
      const { data } = await axiosInstance.post(`/auth/login`, dataForBackend);

      console.log(data);

      // Check if the response is successful

      if (data.success) {
        localStorage.setItem("token", data?.data?.accessToken);
        toast.success("User logged in successfully!");
        // Navigate to the specific room if redirect is set, otherwise to the home page
        if (redirect) {
          router.push(`/rooms/${redirect}`);
        } else {
          router.push("/");
        }
      } else {
        toast.error("User login failed. Please try again");
      }
    } catch (error: any) {
      toast.error(error.response.data.message as string);
      console.log("An error occurred during user creation:", error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-col px-6 py-5">
        <h4 className="font-bold text-large">Please Login here!</h4>
      </CardHeader>

      <CardBody className="px-6 py-5">
        <Toaster position="top-center" theme="dark" />
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="text-red-600" role="alert">
              {errors?.email?.message as string}
            </p>
          )}
          {/* password */}
          <Input
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {isVisiblePassword ? (
                  <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <FaEye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            label="Password"
            type={isVisiblePassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <p className="text-red-600" role="alert">
              {errors.password.message}
            </p>
          )}

          {/* submission */}
          <Button className="w-full rounded-lg py-6" type="submit">
            Login
          </Button>
        </form>

        <div className="my-5 text-center">
          Don&apos;t have any account ?{" "}
          <Link className="text-green-500" href="/auth/register">
            Create New
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default Login;
