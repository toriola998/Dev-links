function ProfileImage({ selectedImage, handleImageChange }) {
   return (
      <div className="bg-light-grey p-5 rounded-xl md:flex items-center justify-between">
         <p className="text-grey-1 mb-4 md:mb-0">Profile picture</p>
         <div className="md:flex items-center justify-between gap-x-6">
            <div
               className={`bg-light-purple rounded-xl w-[193px] h-[193px] flex-item justify-center ${
                  selectedImage ? "person-photo" : ""
               }`}
            >
               <div>
                  <input
                     type="file"
                     accept="image/jpg, image/png"
                     id="photo"
                     onChange={handleImageChange}
                     className="custom-file-input"
                  />
                  <label htmlFor="photo" className="font-semibold ">
                     {!selectedImage ? (
                        <>
                           <img
                              src="/images/icons/upload-image-purple.svg"
                              alt=""
                              className="block mx-auto mb-2"
                           />
                           <span className="flex justify-center">
                              <span className="text-purple">
                                 + Upload Image
                              </span>
                           </span>
                        </>
                     ) : (
                        <>
                           <img
                              src="/images/icons/upload-image-white.svg"
                              alt=""
                              className="block mx-auto mb-2"
                           />
                           <span className="flex justify-center">
                              <span className="text-white">Change Image</span>
                           </span>
                        </>
                     )}
                  </label>
               </div>
            </div>
            {selectedImage && (
               <div className="rounded-xl w-[193px] h-[193px] flex-item justify-center my-4">
                  <img
                     src={selectedImage}
                     alt=""
                     className="object-cover rounded-xl w-[193px] h-[193px]"
                  />
               </div>
            )}
            <p className="text-xs text-grey-1 md:w-[127px] mt-4 md:mt-0">
               Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
         </div>
      </div>
   );
}

export default ProfileImage;
