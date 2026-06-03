import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';

function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true })
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex justify-center px-4 pt-6'>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className='relative w-full max-w-6xl overflow-visible rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] px-6 md:px-8 py-4 flex justify-between items-center'
            >
                {/* Glow */}
                <div className='absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 via-violet-500/5 to-cyan-500/5 pointer-events-none' />

                {/* Logo */}
                <div
                    onClick={() => navigate("/")}
                    className='relative flex items-center gap-3 cursor-pointer'
                >
                    <div className='bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500 text-white p-3 rounded-2xl shadow-lg'>
                        <BsRobot size={20} />
                    </div>

                    <div className='hidden md:block'>
                        <h1 className='font-bold text-xl text-white tracking-tight'>
                            AceInterview.AI
                        </h1>
                        <p className='text-xs text-slate-400'>
                            AI-Powered Interview Practice
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className='relative flex items-center gap-4'>

                    {/* Credits */}
                    <div className='relative'>
                        <button
                            onClick={() => {
                                if (!userData) {
                                    setShowAuth(true)
                                    return;
                                }
                                setShowCreditPopup(!showCreditPopup);
                                setShowUserPopup(false)
                            }}
                            className='flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-white hover:bg-slate-700 transition-all duration-300'
                        >
                            <BsCoin size={18} className='text-yellow-400' />
                            <span className='font-medium'>
                                {userData?.credits || 0}
                            </span>
                        </button>

                        {showCreditPopup && (
                            <div className='absolute right-0 mt-3 w-72 rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl z-50'>
                                <div className='flex items-center gap-2 mb-3'>
                                    <BsCoin className='text-yellow-400' />
                                    <h3 className='text-white font-semibold'>
                                        Credits Balance
                                    </h3>
                                </div>

                                <p className='text-sm text-slate-400 mb-4'>
                                    Need more credits to continue practicing interviews?
                                </p>

                                <button
                                    onClick={() => navigate("/pricing")}
                                    className='w-full rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 py-3 text-white font-medium hover:opacity-90 transition'
                                >
                                    Buy More Credits
                                </button>
                            </div>
                        )}
                    </div>

                    {/* User */}
                    <div className='relative'>
                        <button
                            onClick={() => {
                                if (!userData) {
                                    setShowAuth(true)
                                    return;
                                }
                                setShowUserPopup(!showUserPopup);
                                setShowCreditPopup(false)
                            }}
                            className='w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500 text-white flex items-center justify-center font-semibold shadow-lg'
                        >
                            {userData
                                ? userData?.name.slice(0, 1).toUpperCase()
                                : <FaUserAstronaut size={16} />}
                        </button>

                        {showUserPopup && (
                            <div className='absolute right-0 mt-3 w-56 rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-2xl z-50'>
                                <div className='pb-3 border-b border-slate-800'>
                                    <p className='text-blue-400 font-semibold'>
                                        {userData?.name}
                                    </p>
                                    <p className='text-xs text-slate-500 mt-1'>
                                        Interview Candidate
                                    </p>
                                </div>

                                <button
                                    onClick={() => navigate("/history")}
                                    className='w-full text-left py-3 text-sm text-slate-300 hover:text-white transition'
                                >
                                    Interview History
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className='w-full text-left py-2 text-sm flex items-center gap-2 text-red-400 hover:text-red-300 transition'
                                >
                                    <HiOutlineLogout size={16} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </motion.div>

            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        </div>
    )
}

export default Navbar