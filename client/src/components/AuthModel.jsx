import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from "react-icons/fa";
import Auth from '../pages/Auth';

function AuthModel({onClose}) {
    const {userData} = useSelector((state)=>state.user)

    useEffect(()=>{
        if(userData){
            onClose()
        }

    },[userData , onClose])

  return (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/70 backdrop-blur-md px-4">
    <div className="relative w-full max-w-md">
      
      {/* Glow Effect */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 opacity-30 blur-xl" />

      {/* Modal Container */}
      <div className="relative rounded-3xl border border-slate-700/50 bg-slate-900/90 shadow-2xl backdrop-blur-xl overflow-hidden">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/80 text-slate-300 transition-all duration-200 hover:bg-slate-700 hover:text-white"
        >
          <FaTimes size={16} />
        </button>

        {/* Decorative Header */}
        <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500" />

        {/* Auth Component */}
        <div className="p-1">
          <Auth isModel={true} />
        </div>

      </div>
    </div>
  </div>
)
}

export default AuthModel
