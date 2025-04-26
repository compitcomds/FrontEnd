"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useResetPassword } from "@/_queries/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams ? searchParams.get("code") : null; // Extract the token from the URL

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-center text-xl font-bold mb-4">Reset Password</h1>
        <ChangePassword token={token} />
      </div>
    </div>
  );
}

interface ChangePasswordProps {
  token: string | null;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ token }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<{
    password: string;
    password2: string;
  }>();

  const mutation = useResetPassword();

  const onSubmit = (values: { password: string; password2: string }) => {
    if (!token) {
      console.error("Token is missing");
      return;
    }

    const data = {
      password: values.password,
      passwordConfirmation: values.password2,
      code: token,
    };
    mutation.mutate(data);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter new password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div>
        <Label htmlFor="password2">Confirm Password</Label>
        <Input
          id="password2"
          type="password"
          placeholder="Confirm password"
          {...register("password2", {
            required: "Please confirm your password",
            validate: value => value === watch("password") || "Passwords do not match!",
          })}
        />
        {errors.password2 && <p className="text-red-500 text-sm">{errors.password2.message}</p>}
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
};
