function LinkList({linkList}) {
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
                     backgroundColor:
                        item.platform.name === "Github"
                           ? "black"
                           : item.platform.name === "Frontend Mentor"
                           ? "white"
                           : item.platform.name === "Twitter"
                           ? "#43B7E9"
                           : item.platform.name === "Linkedin"
                           ? "#2D68FF"
                           : item.platform.name === "YouTube"
                           ? "#EE3939"
                           : item.platform.name === "Facebook"
                           ? "#2442AC"
                           : item.platform.name === "Twitch"
                           ? "#EE3FC8"
                           : item.platform.name === "DevTo"
                           ? "#333"
                           : item.platform.name === "Codewars"
                           ? "#8A1A50"
                           : item.platform.name === "Codepen"
                           ? "#47Cf7c"
                           : item.platform.name === "freeCodeCamp"
                           ? "#302267"
                           : item.platform.name === "Gitlab"
                           ? "#EB4925"
                           : item.platform.name === "Hashnode"
                           ? "#0330D1"
                           : item.platform.name === "Stack Overflow"
                           ? "#EC7100"
                           : "",
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
