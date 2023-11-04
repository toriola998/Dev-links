import NavBar from "../NavBar";
import PhonePreview from "../PhonePreview";

function ProfileDetails({ children, title, subtitle }) {
   return (
      <>
         <div className="bg-light-grey min-h-screen ">
            <NavBar />
            <div className="container">
               <main className="p-6 lg:flex gap-x-6">
                  <PhonePreview />
                  <div className="rounded-lg bg-white p-4 md:p-10 relative lg:w-[60%]">
                     <h1 className="title">{title}</h1>
                     <p className="sub-title">{subtitle}</p>
                     {children}
                  </div>
               </main>
            </div>
         </div>
      </>
   );
}

export default ProfileDetails;
