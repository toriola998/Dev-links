import ProfileLayout from "../components/layout/ProfileLayout";
import ProfileInputField from "../components/input/ProfileInputField";
import ProfileImage from "../components/input/ProfileImage";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";
import { useCheckAuthentication } from "../hooks/useCheckAuthentication";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schemas from "../schemas";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { saveProfile } from "../redux/linksSlice";
import supabase from "../../config/supabaseClient";

function ProfileDetails() {
   // Get the form data from the Redux store
   const formDataFromRedux = useSelector(
      (state) => state.linksList.profileDetails
   );
   console.log(formDataFromRedux)

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schemas.profileDetailsSchema),
      defaultValues: formDataFromRedux || {
         firstName: "",
         lastName: "",
         email: "",
         photo: ""
      },
   });

   const [selectedImage, setSelectedImage] = useState(formDataFromRedux.photo);
   const [loading, setLoading] = useState(false);
   const [imageFile, setImageFile] = useState(null);

   const { toast, showSuccessToast, showErrorToast, showToast } = useToast();
   const { checkAuthentication, userData } = useCheckAuthentication();

   useEffect(() => {
      checkAuthentication();
   }, []);

   const dispatch = useDispatch();

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         setSelectedImage(URL.createObjectURL(file));
         setImageFile(file);
      } else {
         setSelectedImage(null);
         return null;
      }
   };

   async function saveUserProfile(user) {
      setLoading(true);
      try {
         if (user) {
            const { data, error } = await supabase
               .from("users")
               .update({
                  first_name: user.firstName,
                  last_name: user.lastName,
                  user_email: user.email,
                  image: user.photo,
               })
               .eq("email", userData?.session?.user?.email)
               .select();

            if (error) {
               showErrorToast("Error saving your details!");
            } else if (data) {
               console.log(data);
               showSuccessToast();
            }
         } else {
            showErrorToast("User details can't be empty!");
         }
      } catch (error) {
         showErrorToast("Something seems wrong, try again later!");
      } finally {
         setLoading(false);
      }
   }

   async function onSubmit(data) {
      const fileExtension = imageFile?.name.split(".").pop();
      const userImageIdentifier = `${Date.now()}.${fileExtension}`;
      console.log(userImageIdentifier);

      setLoading(true);

      try {
         const { data: result, error } = await supabase.storage
            .from("images")
            .upload(userImageIdentifier, imageFile, {
               upsert: false,
            });

         if (result) {
            dispatch(saveProfile({ ...data, photo: selectedImage }));
            saveUserProfile({ ...data, photo: result.path });
         } else if (error) {
            showErrorToast("Error saving user image/profile!");
         }
      } catch (error) {
         showErrorToast("Something seems wrong, try again later!");
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

         <ProfileLayout
            title="Profile Details"
            subtitle="Add your details to create a personal touch to your profile."
         >
            <ProfileImage
               selectedImage={selectedImage}
               handleImageChange={handleImageChange}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="bg-light-grey p-5 rounded-xl mt-6 flex flex-col gap-2 md:gap-3">
                  <ProfileInputField
                     name="firstName"
                     type="text"
                     label="First name"
                     placeholder="Ben"
                     fieldName={register("firstName")}
                     errorMessage={errors.firstName?.message}
                  />
                  <ProfileInputField
                     name="lastName"
                     type="text"
                     label="Last name"
                     placeholder="Wright"
                     fieldName={register("lastName")}
                     errorMessage={errors.lastName?.message}
                  />
                  <ProfileInputField
                     name="email"
                     type="email"
                     label="Email Address"
                     placeholder="e.g. alex@email.com"
                     fieldName={register("email")}
                     errorMessage={errors.email?.message}
                  />
               </div>

               <div className="save-btn">
                  <div className="md:flex justify-end">
                     <button className="purple-btn my-6 w-full md:w-auto">
                        {loading ? <span className="loader"></span> : "Save"}
                     </button>
                  </div>
               </div>
            </form>
         </ProfileLayout>
      </>
   );
}

export default ProfileDetails;
