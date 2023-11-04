import { useState } from "react";

export function useToast() {
   const [showToast, setShowToast] = useState(false);
   const [toast, setToast] = useState({
      message: "",
      icon: "",
      toastBg: "",
   });

   function showSuccessToast(
      message = "Your changes have been successfully saved!"
   ) {
      setToast({
         message,
         icon: "saved.svg",
         toastBg: "bg-dark-grey",
      });
      setShowToast(true);
      setTimeout(() => {
         setShowToast(false);
      }, 3000);
   }

   function showErrorToast(errorMessage = "Error occurred") {
      setToast({
         message: errorMessage,
         icon: "error-white.svg",
         toastBg: "bg-red",
      });
      setShowToast(true);
      setTimeout(() => {
         setShowToast(false);
      }, 3000);
   }

   return {
      toast,
      showSuccessToast,
      showErrorToast,
      showToast,
   };
}
