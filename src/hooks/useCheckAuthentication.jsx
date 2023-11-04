import supabase from "../../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function useCheckAuthentication() {
   const navigate = useNavigate();
   const [userData, setUser] = useState(null);
   async function checkAuthentication() {
      try {
         const { data: user, error } = await supabase.auth.getSession();

         if (error) {
            //show error page
            console.log(error, "Error checking if user is logged in");
         }

         if (user?.session === null) {
            return navigate("/login");
         } else {
            console.log(user);
            setUser(user);
            return;
         }
      } catch (error) {
         console.error("Error checking authentication");
      }
   }

   return {
      checkAuthentication,
      userData,
   };
}
