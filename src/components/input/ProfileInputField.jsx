function InputField({
   label,
   name,
   type,
   placeholder,
   errorMessage,
   fieldName,
}) {
   return (
      <div className="relative md:flex items-center justify-between">
         <label
            htmlFor={name}
            className={`text-dark-grey md:text-grey-1 text-xs md:text-[16px] ${
               errorMessage ? "text-red" : ""
            }`}
         >
            {label}*
         </label>
         <div
            className={`input-wrapper md:w-[60%] ${
               errorMessage ? "input-error " : ""
            }`}
         >
            <div className="flex items-center w-full">
               <input
                  type={type}
                  placeholder={placeholder}
                  id={name}
                  {...fieldName}
                  className="w-full py-3 px-4"
               />
            </div>
            <p className="text-red text-xs absolute top-[9px] right-0 md:top-[unset] md:right-4">
               {errorMessage}
            </p>
         </div>
      </div>
   );
}

export default InputField;
