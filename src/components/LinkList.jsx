import platformColors from "../data/platform-colors";

function LinkList({ linkList }) {
   return (
      <>
         {linkList?.length !== 0 &&
            linkList?.items.map((item, index) => (
               <a
                  href={item.link}
                  target="_blank"
                  key={index}
                  className="h-[44px] w-[237px] rounded-lg flex-item justify-between text-white px-4"
                  style={{
                     color:
                        item.platform.name === "Frontend Mentor" ? "#333" : "",
                     border:
                        item.platform.name === "Frontend Mentor"
                           ? "1px solid var(--grey)"
                           : "",
                     backgroundColor: platformColors[item.platform.name] || "",
                  }}
               >
                  <span className="flex-item gap-x-[14px]">
                     <img
                        src={`/images/icons/platforms/${item.platform.icon}`}
                        alt=""
                        style={{
                           filter:
                              item.platform.name === "Frontend Mentor"
                                 ? ""
                                 : "brightness(500%)",
                        }}
                     />
                     {item.platform.name}
                  </span>

                  <img src="/images/icons/right-arrow.svg" alt="" />
               </a>
            ))}
      </>
   );
}

export default LinkList;
