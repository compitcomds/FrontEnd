"use client";

import { useForm } from "react-hook-form";
import { useRegisterEmailPass } from "@/_queries/auth";
import { Registeruser } from "@/_lib/interface";
import GoogleLogin from "../_component/googleLogin";
import { getAccessToken } from "@/_action/action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Record<string, unknown>>({});

  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const mutation = useRegisterEmailPass();
  const router = useRouter();

  const onSubmit = (values: Record<string, unknown>) => {
    console.log("Received values of form:", values);

    const data: Registeruser = {
      email: values.email as string,
      password: values.password as string,
      username: values.email as string,
      phone: values.phone as number,
      address: values.address as string,
      full_name: values.full_name as string,
    };
    mutation.mutate(data);
  };
  if (mutation.isSuccess) {
    router.push("/dashboard");
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          {...register("email", { required: "E-mail is required" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{String(errors.email.message)}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">
            {String(errors.password.message)}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="full_name">Full Name</Label>
        <Input
          id="full_name"
          type="text"
          {...register("full_name", { required: "Full Name is required" })}
        />
        {errors.full_name && (
          <p className="text-red-500 text-sm">
            {String(errors.full_name.message)}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone number should be exactly 10 digits",
            },
          })}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{String(errors.phone.message)}</p>
        )}
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          type="text"
          {...register("address", { required: "Address is required" })}
        />
        {errors.address && (
          <p className="text-red-500 text-sm">
            {String(errors.address.message)}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="policy"
          checked={isPolicyChecked}
          onChange={(e) => setIsPolicyChecked(e.target.checked)}
          className="w-4 h-4"
        />
        <Label htmlFor="policy" className="text-sm">
          I confirm that I have read and agree to the policy.
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={!isPolicyChecked}>
        Register
      </Button>

      {mutation.isSuccess && (
        <p className="text-green-500">Data submitted successfully!</p>
      )}
      {mutation.isError && (
        <p className="text-red-500">Error submitting data.</p>
      )}
    </form>
  );
};

export default function RegisterPage() {
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
        <RegisterForm />
      </div>
    </div>
  );
}
