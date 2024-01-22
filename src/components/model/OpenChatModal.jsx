

import { useEffect, useState } from "react"
import { supabase } from "../../supabaseClient"
import NewChat from "./NewChat"


export default function OpenChatModal({setUser}) {

    const [allUsers, setAllUsers] = useState()
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState([])
    const [searchUser, setSearchUser] = useState('')
    const user = JSON.parse(window.localStorage.getItem('user'))
    const [showUserList, setShowUserList] = useState(false)


    const handleSelectUser = (currUser) => {
        console.log(currUser)
        setSelectedUser(currUser)
        setSearchUser(currUser.raw_user_meta_data.name)
        setShowUserList(false)
        setUser(currUser)
    }

    const handleSearchUsers = async (text) => {
        setSearchUser(text)
        await supabase.from('profile')
            .select(
                `id,
         raw_user_meta_data
        `
            )
            .like('profile.raw_user_meta_data.name', `%${text}%`) //'%CaseSensitive%'
            .then((resp) => {
                console.log(resp.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function getAlltUsers() {

        await supabase.from('profile')
        .select(
        `id,
         raw_user_meta_data
        `
        )
        .then(async(resp) => {
            const usersWithoutMe = await resp.data.filter((usr) => usr.id !== user.id)
            setAllUsers(usersWithoutMe)
            //console.log(usersWithoutMe)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    useEffect(() => {
        getAlltUsers()
        console.log("allUsers : " + allUsers)
    },[])
    

    return (
        <div >

            <div className='bg-[#fff] p-[18px]'
                style={{ maxWidth: '550px', height: 'auto', display: 'block' }}>

                <div className="space-y-0 relative h-auto">

                    <div className="relative flex gap-2.5 items-center pl-3.5 pr-4 py-3 rounded-md border-[0.5px] border-gray-200">
                        <div className="flex items-center pointer-events-none z-20">
                            {searchIcon}
                        </div>
                        <input
                            type="text"
                            placeholder="Type name or user name"
                            className="block w-full text-[13px] font-normal leading-normal text-gray-400-text outline-none"
                            onChange={(e) => {
                                if (e.target.value.length > 0) {
                                    setShowUserList(true)
                                } else if (e.target.value.length < 1) setShowUserList(false)
                                handleSearchUsers(e.target.value)
                            }}
                            value={searchUser}
                        />
                    </div>

                    {showUserList && (
                        <div className="border border-gray-200 absolute top-[38%] z-50">
                            <div className="p-2">
                                {
                            allUsers && allUsers.map((data, i) => (
                                <NewChat data={data} key={i} onHandleSelectUser={handleSelectUser} />
                            ))
                        }
                            </div>
                        </div>)}

                    <div className="pt-2.5 pb-3.5 flex gap-1 flex-wrap">

                        {searchUser !== '' &&
                            <div className="inline-flex gap-1.5 items-center justify-between p-1.5 border border-gray-200 rounded-full">
                                <div className="flex gap-1.5 items-center">
                                    <img className="w-4 h-4 rounded-full"
                                        src={selectedUser && selectedUser.raw_user_meta_data && selectedUser.raw_user_meta_data.profile_photo ? selectedUser.raw_user_meta_data.profile_photo : 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'} />
                                    <p className="text-sm font-medium tracking-sm-medium text-gray-800">{selectedUser && selectedUser.raw_user_meta_data && selectedUser.raw_user_meta_data.name}</p>
                                </div>
                                <button className="p-1 bg-gray-200 rounded-full" onClick={() => {
                                    setSelectedUser([])
                                    setSearchUser('')
                                }}>
                                    x
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

const searchIcon = (
    <svg
        className="h-4 w-4 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 
      0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>)