"use client";

import React from "react";
import { useForgotPassword } from "@/_queries/auth";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface LoginFormValues {
  email: string;
}

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const mutation = useForgotPassword();

  const onSubmit = (values: LoginFormValues) => {
    console.log("Received values of form:", values);
    mutation.mutate({ email: values.email });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-4 rounded-md shadow-md border border-gray-200 w-96">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
          </div>

          <Button type="submit" className="w-full">
            Log in
          </Button>

          <p className="text-center text-sm">
            or <a href="" className="text-blue-500">Register now!</a>
          </p>
        </form>
      </div>
    </div>
  );
}
