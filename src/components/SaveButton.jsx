function SaveButton({ linkList, isLoading }) {
   return (
      <div className="save-btn">
         <div className="md:flex justify-end">
            <button
               type="submit"
               disabled={!linkList.length}
               className={`purple-btn mt-6 w-full md:w-auto ${
                  linkList.length === 0 ? "btn-disabled" : ""
               }`}
            >
              {isLoading ? <span className="loader"></span> : 'Save'} 
            </button>
         </div>
      </div>
   );
}

export default SaveButton;
