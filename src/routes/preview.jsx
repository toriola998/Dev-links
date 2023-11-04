import { Link } from "react-router-dom";
import LinkList from "../components/LinkList";
import ProfileData from "../components/ProfileData";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";
import { useCheckAuthentication } from "../hooks/useCheckAuthentication";

function Preview() {
   const linkList = useSelector((state) => state.linksList.value);
   const { toast, showSuccessToast, showToast } = useToast();
   const { checkAuthentication, userData } = useCheckAuthentication();

   useEffect(() => {
      checkAuthentication();
   }, []);

   function copyLink() {
      const email = userData?.session?.user?.email;
      const username = email.split("@")[0];

      const userUrl =
         window.location.protocol +
         "//" +
         window.location.host +
         "/" +
         username;

      navigator.clipboard.writeText(userUrl);
      showSuccessToast();
   }

   return (
      <>
         {showToast && (
            <Toast
               text="The link has been copied to your clipboard!"
               toastBg={toast.toastBg}
               icon="copied.svg"
            />
         )}
         <div className="bg-[transparent] md:bg-purple h-0 md:h-[357px] rounded-br-[32px] rounded-bl-[32px] md:p-6">
            <nav className="flex-item justify-between p-4 md:bg-white rounded-xl">
               <Link className="outline-btn w-auto" to="/customize-links">
                  Back to Editor
               </Link>
               <button className="purple-btn" onClick={copyLink}>
                  Share Link
               </button>
            </nav>
         </div>

         <main className="preview-tree mb-40">
            <ProfileData textStyleClass="font-bold text-[32px]" />

            <div className="flex-item justify-center py-[56px]">
               <div className="flex flex-col gap-y-5">
                  <LinkList linkList={linkList} />
               </div>
            </div>
         </main>
      </>
   );
}

export default Preview;
