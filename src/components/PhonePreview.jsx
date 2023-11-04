import LinkList from "./LinkList";
import ProfileData from "./ProfileData";
import { useSelector } from "react-redux";

function PhonePreview() {
   // const [divData, setLinks] = useState([
   //    { id: 1 },
   //    { id: 2 },
   //    { id: 3 },
   //    { id: 4 },
   //    { id: 5 },
   // ]);

   const profileData = useSelector((state) => state.linksList.profileDetails);
   const linkList = useSelector((state) => state.linksList.value);

   return (
      <div className="hidden rounded-lg bg-white p-4 md:p-10 lg:w-[40%] lg:flex justify-center">
         <div>
            <svg
               width="308"
               height="632"
               viewBox="0 0 308 632"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  d="M1 54.5C1 24.9528 24.9528 1 54.5 1H253.5C283.047 1 307 24.9528 307 54.5V577.5C307 607.047 283.047 631 253.5 631H54.5C24.9528 631 1 607.047 1 577.5V54.5Z"
                  stroke="#737373"
               />
               <path
                  d="M12 55.5C12 30.9233 31.9233 11 56.5 11H80.5C86.8513 11 92 16.1487 92 22.5C92 30.5081 98.4919 37 106.5 37H201.5C209.508 37 216 30.5081 216 22.5C216 16.1487 221.149 11 227.5 11H251.5C276.077 11 296 30.9233 296 55.5V576.5C296 601.077 276.077 621 251.5 621H56.5C31.9233 621 12 601.077 12 576.5V55.5Z"
                  fill="white"
                  stroke="#737373"
               />

               <foreignObject x="10" y="20" width="280" height="550">
                  <div
                     xmlns="http://www.w3.org/1999/xhtml"
                     className="flex justify-center mt-10"
                  >
                     <div>
                        {profileData ? (
                           <ProfileData textStyleClass="font-semibold text-[18px]" />
                        ) : (
                           <>
                              <div className="w-[96px] h-[96px] svg-preview" />
                              <div className="w-[160px] h-4 svg-preview mt-6 mb-3" />
                              <div className="w-[72px] h-2 svg-preview" />
                           </>
                        )}

                        <div className="flex flex-col gap-y-5 py-[56px]">
                           {/* {divData.map((item) => (
                              <div
                                 key={item.id}
                                 className="bg-grey-2 h-[44px] w-[237px] rounded-lg"
                              />
                           ))} */}
                           <LinkList linkList={linkList} />
                        </div>
                     </div>
                  </div>
               </foreignObject>
            </svg>
         </div>
      </div>
   );
}
export default PhonePreview;
