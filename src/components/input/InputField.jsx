function InputField({
   label,
   name,
   icon,
   type,
   placeholder,
   errorMessage,
   fieldName,
}) {
   return (
      <div className="relative">
         <label
            htmlFor={name}
            className={`text-dark-grey text-xs ${
               errorMessage ? "text-red" : ""
            }`}
         >
            {label}
         </label>
         <div
            className={`input-wrapper relative ${
               errorMessage ? "input-error " : ""
            }`}
         >
            <div className="flex items-center w-full">
               <img
                  src={icon}
                  alt=""
                  role="presentation"
                  height="16"
                  width="16"
                  className="absolute left-4"
               />

               <input
                  type={type}
                  placeholder={placeholder}
                  id={name}
                  {...fieldName}
                  className="w-full pl-12 py-3 pr-4"
               />
            </div>
            {/* md:top-[unset] md:right-4 */}
            <p className="text-red text-xs absolute -top-[18px] right-0">
               {errorMessage}
            </p>
         </div>
      </div>
   );
}

export default InputField;
