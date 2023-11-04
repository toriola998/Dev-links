import { useSelector } from "react-redux";

function ProfileData({ textStyleClass }) {
   const profileData = useSelector((state) => state.linksList.profileDetails);

   let firstName = profileData?.firstName;
   let lastName = profileData?.lastName;
   let initials = firstName?.charAt(0) + "." + lastName?.charAt(0);

   const getInitials = () => {
      if (initials) {
         return;
      } else {
         null;
      }
   };

   return (
      <>
         {!profileData?.photo ? (
            <div className="initials photo">{getInitials()}</div>
         ) : (
            <img src={profileData?.photo} alt="" className="photo" />
         )}
         <p
            className={`${textStyleClass} font-bold text-[32px] text-dark-grey mt-6 mb-2 text-center`}
         >
            {firstName} {lastName}
         </p>
         <a
            href={`mailto: ${profileData?.email}`}
            className="text-grey-1 text-center block"
         >
            {profileData?.email}
         </a>
      </>
   );
}

export default ProfileData;
