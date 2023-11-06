import supabase from "../../config/supabaseClient";
import { useToast } from "../hooks/useToast";

import { useDispatch } from "react-redux";
import { saveProfile } from "../redux/linksSlice";
import { saveLinks } from "../redux/linksSlice";

export function useUserData() {
   const { showErrorToast } = useToast();
   const dispatch = useDispatch();

   async function getPersonPhotoUrl(fileName) {
      try {
         const { data, error } = supabase.storage
            .from("images")
            .getPublicUrl(fileName);

         if(data) {
            return data;
         }else if(error){
            showErrorToast("Failed to get your profile photo!");
         }
      } catch (error) {
         console.log(error);
         showErrorToast("Something seems wrong, try again later!");
      }
   }

   async function getUserData(arg) {
      try {
         const { data, error } = await supabase
            .from("users")
            .select()
            .eq("email", arg);

         if (error) {
            //show error page
            showErrorToast("Error: failed to get user data!");
         } else if (data) {
            console.log(...data);
            const person_photo = await getPersonPhotoUrl(data?.[0]?.image)
            dispatch(
               saveProfile({
                  email: data?.[0]?.email,
                  firstName: data?.[0]?.first_name,
                  lastName: data?.[0]?.last_name,
                  photo: person_photo.publicUrl,
               })
            );
            dispatch(saveLinks(data?.[0]?.links));
         }
      } catch (error) {
         console.log(error);
         showErrorToast("Something seems wrong, try again later!");
      }
   }
   return {
      getUserData,
   };
}
