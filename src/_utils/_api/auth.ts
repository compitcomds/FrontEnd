// import { getAccessToken, setAccessToken } from "@/_action/action";
import { getAccessToken, setAccessToken } from "@/_action/action";
import axiosInstance from "@/_lib/axiosInstance";
import { LoginUser, Registeruser } from "@/_lib/interface";

async function registerUser(data: Registeruser) {
  const response = await axiosInstance.post("/api/auth/local/register", {
    username: data.username,
    email: data.email,
    password: data.password,
  });
  await setAccessToken(response.data.jwt, "3600");
  const token = await getAccessToken();
  if (token) {
    await updateUserDeatils(response.data.user.id, {
      full_name: data.full_name,
      phone: data.phone,
      address: data.address,
    });
    return response.data;
  }
}
async function updateUserDeatils(id: number, data: Registeruser) {
  await axiosInstance.put(`/api/users/${id}`, data);
}

async function ForgotPassword({ email }: { email: string }) {
  await axiosInstance.post(`/api/auth/forgot-password`, { email: email });
}

async function resetPassword(data: { password: string; passwordConfirmation: string; code: string }) {
  const response = await axiosInstance.post(`/api/auth/reset-password`, data);
  await setAccessToken(response.data.jwt, "3600");
  return response.data;
}


async function loginUser(data: LoginUser) {
  
  const response = await axiosInstance.post("/api/auth/local", data);

  if (data.remeber) {
    await setAccessToken(response.data.jwt, "3600");
  } else {
    await setAccessToken(response.data.jwt);
  }
}

export { registerUser, loginUser, ForgotPassword,resetPassword };
