import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextInput, PasswordInput } from "../components/TextInput";
import { cssReset, formContentWrapper, wrapper } from "../styles";
import toast, { Toaster } from "react-hot-toast";
import { Logo } from "../components/Logo";
import AuthWrapper from "../components/AuthWrapper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useToken from "../services/AuthProvider";
import { userLogin } from "../services/apis";
import React from "react";
const loginSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Kolom username tidak boleh kosong. ",
    })
    .max(100, {
      message: "Format username tidak sesuai",
    })
    .refine((value) => !/\.s/.test(value), {
      message: "Format username tidak sesuai.",
    }),
  password: z
    .string()
    .min(1, {
      message: "Kolom Kata Sandi tidak boleh kosong. ",
    })
    .min(6, {
      message: "Kata sandi tidak boleh kurang dari 6 karakter.",
    })
    .max(50, { message: "Kata sandi tidak sesuai" })
    .refine((value) => /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value), {
      message:
        "Kata sandi harus memiliki minimal 6 karakter kombinasi angka/huruf.",
    }),
});

export default function Login() {
  const navigate = useNavigate();
  const { setToken, setUserId } = useToken();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    addPosts(data.username, data.password);
  };

  const addPosts = async (username, password) => {
    try {
      const response = await userLogin(username, password);
      toast.success("Login berhasil!");
      console.log(username);
      console.log(password);
      setUserId(response.data.data.id);
      setToken(response.data.data.token);
      console.log(response);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/daftar-resep");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        toast.error("Username atau Kata sandi yang anda masukkan salah");
      } else {
        toast.error("Terjadi kesalahan server. Silahkan coba kembali.");
      }
      reset();
    }
  };

  return (
    <Box sx={wrapper}>
      <style>{cssReset}</style>
      <div>
        <Toaster />
      </div>
      <Logo />
      <AuthWrapper
        title="Login"
        linkText="Daftar Disini"
        url="/register"
        footerText="Belum punya Akun ?"
        showAboutAndContact={true}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={formContentWrapper}>
          <TextInput
            label="Username"
            fieldName="username"
            field={register}
            errors={errors}
            onChange={(e) => setEmail(e.target.value)}
          ></TextInput>
          <PasswordInput
            label="Kata sandi"
            fieldName="password"
            field={register}
            errors={errors}
            onChange={(e) => setPassword(e.target.value)}
          ></PasswordInput>
          <Button
            type="submit"
            text="Login"
            sx={{ width: "100%" }}
            color="primary"
            variant="contained"
          >
            Login
          </Button>
        </form>
      </AuthWrapper>
    </Box>
  );
}
