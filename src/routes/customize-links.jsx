import EmptyLinksState from "../components/EmptyLinksState";
import ProfileLayout from "../components/layout/ProfileLayout";
import SaveButton from "../components/SaveButton";
import InputField from "../components/input/InputField";
import SelectDropdown from "../components/input/SelectDropdown";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";
import { useCheckAuthentication } from "../hooks/useCheckAuthentication";

import { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

// import { yupResolver } from "@hookform/resolvers/yup";
// import schemas from "../schemas";

import { useDispatch, useSelector } from "react-redux";
import { saveLinks } from "../redux/linksSlice";
import supabase from "../../config/supabaseClient";

function CustomizeLinks() {
   const dispatch = useDispatch();

   const { toast, showSuccessToast, showErrorToast, showToast } = useToast();
   const { checkAuthentication, userData } = useCheckAuthentication();

   // Get the form data from the Redux store
   const formDataFromRedux = useSelector((state) => state.linksList.value);

   useEffect(() => {
      checkAuthentication();
   }, []);

   const {
      register,
      handleSubmit,
      formState: { errors },
      control,
      watch,
      setValue,
   } = useForm({
      //resolver: yupResolver(schemas.linkSchema),
      // defaultValues: {
      //    items: [],
      // },
      defaultValues: formDataFromRedux || { items: [] }, // Use Redux store data or an empty array if no data is available
   });

   const { fields, append, remove } = useFieldArray({
      name: "items",
      control,
   });

   const [selectedPlatform, setSelectedPlatform] = useState(
      fields.map(() => ({
         name: "Github",
         icon: "github.svg",
      }))
   );
   const [loading, setLoading] = useState(false);

   async function saveUserLinks(arg) {
      setLoading(true);
      try {
         if (arg) {
            const { data, error } = await supabase
               .from("users")
               .update({ links: arg })
               .eq("email", userData?.session?.user?.email)
               .select();

            if (error) {
               showErrorToast("Error saving your details!");
            } else if (data) {
               showSuccessToast();
            }
         } else {
            showErrorToast("Links can't be empty!");
         }
      } catch (error) {
         showErrorToast("Something seems wrong, try again later!");
      } finally {
         setLoading(false);
      }
   }

   function onSubmit(data) {
      console.log(data);
      dispatch(saveLinks(data));
      saveUserLinks(data);
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
            title="Customize your links"
            subtitle="Add/edit/remove links below and then share all your profiles with the world!"
         >
            <button
               className="outline-btn"
               type="button"
               onClick={() => {
                  append({
                     link: "",
                     platform: { name: "Github", icon: "github.svg" },
                  });
               }}
            >
               + Add new link
            </button>
            {fields.length === 0 && <EmptyLinksState />}
            <form onSubmit={handleSubmit(onSubmit)}>
               {fields.length >= 1 && (
                  <div>
                     {fields.map((field, index) => {
                        return (
                           <section
                              key={field.id}
                              className="rounded-lg bg-light-grey p-4 mt-6"
                           >
                              <div className="flex-item justify-between">
                                 <div className="flex-item gap-x-2">
                                    <img
                                       src="/images/icons/highlight.svg"
                                       alt=""
                                    />
                                    <p className="text-grey-1 font-bold">
                                       Link #{index + 1}
                                    </p>
                                 </div>
                                 <button
                                    className="text-grey-1"
                                    type="button"
                                    onClick={() => remove(index)}
                                 >
                                    Remove
                                 </button>
                              </div>
                              <SelectDropdown
                                 selectedPlatform={selectedPlatform[index]} // Pass the specific selectedPlatform
                                 setSelectedPlatform={(platform) => {
                                    const updatedPlatforms = [
                                       ...selectedPlatform,
                                    ];
                                    updatedPlatforms[index] = platform;
                                    setSelectedPlatform(updatedPlatforms);
                                 }}
                                 setValue={setValue}
                                 watch={watch}
                                 index={index}
                              />
                              <InputField
                                 name="link"
                                 type="text"
                                 label="Link"
                                 icon="/images/icons/links.svg"
                                 placeholder="https://www.github.com/benwright"
                                 fieldName={register(`items.${index}.link`)}
                                 errorMessage={
                                    errors?.items?.[index]?.link?.message
                                 }
                              />
                           </section>
                        );
                     })}
                  </div>
               )}

               <SaveButton linkList={fields} isLoading={loading} />
            </form>
         </ProfileLayout>
      </>
   );
}

export default CustomizeLinks;
