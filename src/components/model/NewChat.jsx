const removedProfile = 'https://cdn.nerdschalk.com/wp-content/uploads/2020/09/how-to-remove-profile-picture-on-zoom-12.png?width=500'

function NewChat({data, onHandleSelectUser}) {
  return (
    <div className='flex items-center gap-2.5 py-2 px-3 cursor-pointer rounded hover:bg-[#D9FFED54] hover:backdrop-blur-[3px] hover:shadow-5xl'
      onClick={() => onHandleSelectUser(data)}
    >
      <div className="flex items-center gap-3">
        <span className={`w-[7px] h-[7px] rounded-full bg-teal-500`}></span>
        <img
          src={data.raw_user_meta_data.profile_photo ? data.raw_user_meta_data.profile_photo : removedProfile}
          className="rounded-full h-5 w-5"
        />
        <p className="text-sm not-italic font-medium tracking-sm-medium text-gray-800">
          {data.raw_user_meta_data.name}
        </p>
      </div>
        <p className="text-xs not-italic font-normal tracking-sm-light text-gray-500">
          @{data.raw_user_meta_data.name?.split(' ')[0].toLowerCase()}
        </p>
    </div>
  )
}

export default NewChat