function ProfileTop(){
    return(
        <div class="inset-shadow-sm shadow-lg ">
            <header className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-700"> | My Profile :</h1>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-300"></div>
          <span className="font-medium">Nisha</span>
        </div>
      </header>
        </div>
    )
}
export default ProfileTop;