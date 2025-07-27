import React, { useState } from 'react'
import { FaRegMoon } from 'react-icons/fa'
import { GoSun } from 'react-icons/go'

function Navbar() {
    const [dark,setDark] = useState(0);
  return (
    <div className='w-[90%] mx-auto px-2 py-4 border-b border-gray-200'>
        <div className="flex justify-between items-center">
            <div className="text-3xl font-bold text-blue-500">ProStore</div>

            

            <div onClick={()=>{setDark(!dark)}} className=" border-gray-400 border p-2 rounded-lg cursor-pointer hover:bg-gray-200 ">{dark?<GoSun size={20}  />:<FaRegMoon size={20} />}
</div>
        </div>
      
    </div>
  )
}

export default Navbar
