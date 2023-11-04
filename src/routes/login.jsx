import InputField from "../components/input/InputField";
import AuthLayout from "../components/layout/AuthLayout";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schemas from "../schemas";

import supabase from "../../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schemas.loginSchema),
   });
   const [loading, setLoading] = useState(false);

   const { toast, showErrorToast, showToast } = useToast();
   const navigate = useNavigate();

   async function onSubmit(formData) {
      try {
         setLoading(true);
         const { data, error } = await supabase.auth.signInWithPassword({
            email: formData?.email,
            password: formData?.password,
         });

         if (error) {
            showErrorToast("Invalid login credentials!");
         } else if (data) {
            return navigate("/customize-links");
         } else return null;
      } catch {
         showErrorToast("Something seems wrong, try again later!");
      } finally {
         setLoading(false);
      }
   }
   return (
      <>
         {showToast && (
            <Toast
               text={toast.message}
               toastBg={toast.toastBg}
               icon={toast.icon}
            />
         )}
         <AuthLayout
            title="Login"
            subtitle="Add your details below to get back into the app"
            authText="Don't have an account?"
            ctaText="Create Account"
            ctaLink="/signup"
         >
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="flex flex-col gap-6"
            >
               <InputField
                  name="email"
                  type="email"
                  label="Email Address"
                  icon="/images/icons/email.svg"
                  placeholder="e.g. alex@email.com"
                  fieldName={register("email")}
                  errorMessage={errors.email?.message}
               />
               <InputField
                  name="password"
                  type="password"
                  label="Password"
                  icon="/images/icons/password.svg"
                  placeholder="Enter your password"
                  fieldName={register("password")}
                  errorMessage={errors.password?.message}
               />
               <button className="purple-btn my-6">
                  {loading ? <span className="loader"></span> : "Login"}
               </button>
            </form>
         </AuthLayout>
      </>
   );
}

export default Login;
