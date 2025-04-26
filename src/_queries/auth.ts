import { useMutation } from "@tanstack/react-query";
import {
  ForgotPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "../_utils/_api/auth";
import { toast } from "sonner";

export function useRegisterEmailPass() {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success('user Register successfully')
      console.log("User Created Successfully:", data);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message: string = error.response.data.error.message;
      toast.error(`Error creating data: ${message}`);
    },
  });
}

export function useLoginEmailPass() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success('user login successfully')
      console.log("User Created Successfully:", data);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message: string = error.response.data.error.message;
      toast.error(`Error creating data: ${message}`);
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: ForgotPassword,
    onSuccess: (data) => {
      console.log("User Created Successfully:", data);
    },
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message: string = error.response.data.error.message;
      toast.error(`Error creating data: ${message}`);
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      console.log("User Created Successfully:", data);
    },
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message: string = error.response.data.error.message;
      toast.error(`Error creating data: ${message}`);
    },
  });
}
