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

function Signup() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schemas.signupSchema),
   });
   const [loading, setLoading] = useState(false);

   const { toast, showErrorToast, showToast } = useToast();
   const navigate = useNavigate();

   async function checkUserExists(email) {
      try {
         const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email);

         if (error) {
            showErrorToast("Error checking user existence!");
            return false; // Return false to indicate an error occurred
         }

         return data.length > 0; // Return true if user with the given email exists
      } catch (error) {
         showErrorToast("Something seems wrong, try again later!");
         return false; // Return false to indicate an error occurred
      }
   }

   async function saveUserId(id, email) {
      try {
         if (id) {
            const userExists = await checkUserExists(email);

            if (userExists) {
               showErrorToast("User with this email already exists!");
            } else {
               const { data, error } = await supabase
                  .from("users")
                  .insert(
                     {
                        user_id: id, // User's unique ID
                        email: email,
                     },
                  )
                  .select();

               if (error) {
                  showErrorToast("Error saving user ID!");
               } else if (data) {
                  return navigate("/customize-links");
               }
            }
         } else {
            showErrorToast("User ID is empty!");
         }
      } catch (error) {
         showErrorToast("Something seems wrong, try again later!");
      }
   }

   async function onSubmit(formData) {
      setLoading(true);
      try {
         const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
         });

         if (data) {
            saveUserId(data?.user.id, formData.email);
         } else if (error) {
            showErrorToast("Error creating user account!");
         }
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
            title="Create Account"
            subtitle="Let's get you started sharing your links!"
            authText="Already have an account?"
            ctaText="Login"
            ctaLink="/login"
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
                  placeholder="At least 8 characters"
                  fieldName={register("password")}
                  errorMessage={errors.password?.message}
               />
               <InputField
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  icon="/images/icons/password.svg"
                  placeholder="At least 8 characters"
                  fieldName={register("confirmPassword")}
                  errorMessage={errors.confirmPassword?.message}
               />
               <button className="purple-btn my-6">
                  {loading ? (
                     <span className="loader"></span>
                  ) : (
                     "Create new account"
                  )}
               </button>
            </form>
         </AuthLayout>
      </>
   );
}

export default Signup;
