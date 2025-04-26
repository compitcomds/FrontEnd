"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import GoogleLogin from "../_component/googleLogin";
// import { useLoginEmailPass } from "@/app/_queries/auth";
// import { LoginUser } from "@/app/_lib/interface";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LoginUser } from "@/_lib/interface";
import { useLoginEmailPass } from "@/_queries/auth";
import { getAccessToken } from "@/_action/action";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  interface LoginFormValues {
    identifier: string;
    password: string;
    remember: boolean;
  }
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { remember: false },
  });

  const mutation = useLoginEmailPass();

  const onSubmit = (values: LoginFormValues) => {
    console.log("Received values of form:", values);
    const data: LoginUser = {
      identifier: values.identifier,
      password: values.password,
      remeber: values.remember,
    };
    mutation.mutate(data);
    mutation.mutate(data);
   
  };
  if(mutation.isSuccess){
    router.push('/dashboard')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <Label htmlFor="identifier">Username</Label>
        <Input
          id="identifier"
          placeholder="Username"
          {...register("identifier", { required: "Username is required" })}
        />
        {errors.identifier && (
          <p className="text-red-500 text-sm">{errors.identifier.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="flex justify-between items-center">
        <label className="flex items-center space-x-2">
          <Checkbox {...register("remember")} />
          <span>Remember me</span>
        </label>
        <Link href="/forgotPassword" className="text-blue-500 text-sm">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full">
        Log in
      </Button>

      <p className="text-center text-sm">
        or{" "}
        <Link href="/register" className="text-blue-500">
          Register now!
        </Link>
      </p>
    </form>
  );
};

export default function LoginPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAccessToken();
      if (token) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    };
    fetchToken();
  }, []);
  if (loading) {
    return <p>loading...</p>;
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <GoogleLogin />
        <LoginForm />
      </div>
    </div>
  );
}
