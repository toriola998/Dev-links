function Toast({ icon, text, toastBg }) {
   return (
      <div className="centered-div w-[300px] md:w-[unset]">
         <div className={`${toastBg} px-2 md:px-6 py-4 rounded-xl flex-item gap-x-3`}>
            <img
               src={`/images/icons/${icon}`}
               alt=""
               role="presentation"
            />
            <p className="text-light-grey font-semibold">{text}</p>
         </div>
      </div>
   );
}

export default Toast;
