function EmptyLinksState() {
   return (
      <div className="rounded-lg bg-light-grey px-4 py-10 my-6">
         <img
            src="/images/icons/get-started.svg"
            alt=""
            className="block mx-auto"
         />
         <p className="title py-6 text-center">Let's get you started</p>
         <p className="text-grey-1 text-center md:w-[488px] md:mx-auto">
            Use the “Add new link” button to get started. Once you have more
            than one link, you can reorder and edit them. We're here to help you
            share your profiles with everyone!
         </p>
      </div>
   );
}

export default EmptyLinksState;
