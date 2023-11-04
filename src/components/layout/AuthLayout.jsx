import Logo from "../Logo";
import { Link } from "react-router-dom";

function AuthLayout({ title, subtitle, authText, ctaText, ctaLink, children }) {
   return (
      <div className="px-8 md:bg-light-grey min-h-screen md:flex justify-center items-center">
         <div>
            <Logo />
            <main className="my-[72px] md:mt-[51px] md:bg-white md:rounded-lg md:w-[476px] md:p-10 md:mx-auto">
               <h1 className="text-dark-grey font-bold text-2xl md:text-3xl">
                  {title}
               </h1>
               <p className="text-grey-1 mt-2 mb-10">{subtitle}</p>
               {children}
               <div className="md:flex justify-center">
                  <p className="text-center text-grey-1 mr-1">{authText}</p>
                  <Link className="text-center text-purple block" to={ctaLink}>
                     {ctaText}
                  </Link>
               </div>
            </main>
         </div>
      </div>
   );
}

export default AuthLayout;
