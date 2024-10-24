"use client";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

import { TFormInput, TUserCreationData } from "@/types/registration.types";
import axiosInstance from "@/lib/axiosInstance";

const Register = () => {
  const router = useRouter();

  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = React.useState(false);

  const togglePasswordVisibility = () =>
    setIsVisiblePassword(!isVisiblePassword);
  const toggleConfirmVisibility = () => setIsVisibleConfirm(!isVisibleConfirm);

  // submission
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TFormInput>();
  const password = watch("password");

  const onSubmit = async (user: TFormInput) => {
    try {
      const dataForBackend: TUserCreationData = {
        name: {
          firstName: user.firstName,
          lastName: user.lastName,
        },
        email: user.email,
        password: user.password,
      };
      const { data } = await axiosInstance.post(
        `/users/create-user`,
        dataForBackend,
      );

      console.log(data);

      // Check if the response is successful
      if (data.success) {
        toast.success("User has been created");
        await router.push("/auth/login");
      } else {
        toast.error("User creation failed:", data.message);
      }
    } catch (error: any) {
      toast.error("Something went wrong. Please try again!");
      console.log(
        "An error occurred during user creation:",
        error.response.data.message as string,
      );
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-col px-6 py-5">
        <h4 className="font-bold text-large">Register New Account</h4>
      </CardHeader>

      <CardBody className="px-6 py-5">
        <Toaster position="top-center" theme="dark" />
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* name */}
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            {/* first name */}
            <div className="md:w-1/2">
              <Input
                label="First Name"
                type="text"
                {...register("firstName", { required: true })}
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              {errors.firstName?.type === "required" && (
                <p className="text-red-600" role="alert">
                  First name is required
                </p>
              )}
            </div>
            {/* last name */}
            <div className="md:w-1/2">
              <Input
                label="Last Name"
                type="text"
                {...register("lastName", { required: true })}
                aria-invalid={errors.lastName ? "true" : "false"}
              />
              {errors.lastName?.type === "required" && (
                <p className="text-red-600" role="alert">
                  Last name is required
                </p>
              )}
            </div>
          </div>
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
          {/* Confirm password */}
          <Input
            endContent={
              <button
                aria-label="toggle confirm password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleConfirmVisibility}
              >
                {isVisibleConfirm ? (
                  <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <FaEye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            label="Confirm password"
            type={isVisibleConfirm ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            aria-invalid={errors.confirmPassword ? "true" : "false"}
          />
          {errors.confirmPassword && (
            <p className="text-red-600" role="alert">
              {errors.confirmPassword.message}
            </p>
          )}
          {/* submission */}
          <Button className="w-full rounded-lg py-6" type="submit">
            Register
          </Button>
        </form>

        <div className="my-5 text-center">
          Already have an account?{" "}
          <Link className="text-green-500" href="/auth/login">
            Sign In
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default Register;
