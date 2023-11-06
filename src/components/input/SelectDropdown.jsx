import { useState } from "react";
import platforms from "../../data/platforms";

function SelectDropdown({
   selectedPlatform,
   setSelectedPlatform,
   setValue,
   watch,
   index,
}) {
   const [dropdown, setDropdown] = useState(false);

   function toggleDropdown() {
      setDropdown(true);

      if (dropdown === true) {
         setDropdown(false);
      }
   }

   return (
      <div className="my-3 relative">
         <p className="text-dark-grey text-xs mb-1">Platform</p>
         <button
            aria-haspopup="listbox"
            aria-expanded="false"
            id="dropdown-button"
            onClick={toggleDropdown}
            type="button"
         >
            <span className="flex-item gap-x-[14px]">
               <img
                  src={`/images/icons/platforms/${selectedPlatform? selectedPlatform?.icon : "github.svg"}`}
                  alt=""
               />
               { selectedPlatform ? selectedPlatform?.name : "Github" }
            </span>
            <img
               src="/images/icons/dropdown.svg"
               alt=""
               className={dropdown ? "rotate-180 ease-in duration-100" : ""}
            />
         </button>

         {dropdown && (
            <ul
               role="listbox"
               aria-labelledby="dropdown-button"
               id="dropdown-list"
            >
               {platforms.map((option, i) => (
                  <li
                     key={i}
                     onClick={() => {
                        setSelectedPlatform(option);
                        setDropdown(false);
                        setValue(`items[${index}].platform`, option);
                     }}
                     // className={
                     //    watch(`items[${index}].platform`) === option.name
                     //       ? "selected"
                     //       : ""
                     // }
                  >
                     <span className="flex-item gap-x-[14px]">
                        <img
                           src={`/images/icons/platforms/${option.icon}`}
                           alt=""
                        />
                        {option.name}
                     </span>
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
}

export default SelectDropdown;
