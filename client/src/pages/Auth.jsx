import React from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth({ isModel = false }) {
    const dispatch = useDispatch()

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider)

            let User = response.user
            let name = User.displayName
            let email = User.email

            const result = await axios.post(
                ServerUrl + "/api/auth/google",
                { name, email },
                { withCredentials: true }
            )

            dispatch(setUserData(result.data))

        } catch (error) {
            console.log(error)
            dispatch(setUserData(null))
        }
    }

    return (
        <div
            className={`
        w-full
        ${
            isModel
                ? "py-4"
                : "min-h-screen bg-slate-950 flex items-center justify-center px-6 py-20"
        }
      `}
        >
            {!isModel && (
                <>
                    <div className="fixed top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="fixed bottom-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
                </>
            )}

            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`
          relative overflow-hidden
          w-full
          ${
              isModel
                  ? "max-w-md p-8 rounded-3xl"
                  : "max-w-xl p-10 md:p-12 rounded-[32px]"
          }
          bg-slate-900 border border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        `}
            >

                {/* Glow */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl" />

                <div className="relative z-10">

                    {/* Logo */}
                    <div className='flex items-center justify-center gap-3 mb-8'>
                        <div className='bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500 text-white p-3 rounded-2xl shadow-lg'>
                            <BsRobot size={22} />
                        </div>

                        <div>
                            <h2 className='font-bold text-xl text-white'>
                                AceInterview.AI
                            </h2>

                            <p className='text-xs text-slate-400'>
                                AI Interview Platform
                            </p>
                        </div>
                    </div>

                    {/* Heading */}
                    <div className='text-center mb-8'>
                        <h1 className='text-3xl md:text-4xl font-bold text-white leading-tight'>
                            Practice Interviews
                            <br />
                            With AI Assistance
                        </h1>

                        <div className='mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm'>
                            <IoSparkles size={16} />
                            Smart AI Interview Experience
                        </div>
                    </div>

                    {/* Description */}
                    <p className='text-slate-400 text-center leading-relaxed mb-10 max-w-md mx-auto'>
                        Sign in to access personalized mock interviews,
                        AI-generated feedback, performance analytics,
                        and resume-based interview preparation.
                    </p>

                    {/* Features */}
                    <div className='grid grid-cols-3 gap-3 mb-8'>
                        <div className='bg-slate-800 border border-slate-700 rounded-2xl p-3 text-center'>
                            <p className='text-blue-400 font-semibold text-sm'>
                                AI
                            </p>
                            <p className='text-slate-400 text-xs mt-1'>
                                Questions
                            </p>
                        </div>

                        <div className='bg-slate-800 border border-slate-700 rounded-2xl p-3 text-center'>
                            <p className='text-violet-400 font-semibold text-sm'>
                                Voice
                            </p>
                            <p className='text-slate-400 text-xs mt-1'>
                                Interviews
                            </p>
                        </div>

                        <div className='bg-slate-800 border border-slate-700 rounded-2xl p-3 text-center'>
                            <p className='text-cyan-400 font-semibold text-sm'>
                                Smart
                            </p>
                            <p className='text-slate-400 text-xs mt-1'>
                                Reports
                            </p>
                        </div>
                    </div>

                    {/* Login Button */}
                    <motion.button
                        onClick={handleGoogleAuth}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className='w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 text-white font-semibold shadow-xl'
                    >
                        <FcGoogle size={22} />
                        Continue with Google
                    </motion.button>

                    <p className='text-center text-slate-500 text-xs mt-5'>
                        By continuing, you agree to use AI-powered interview
                        preparation and analytics services.
                    </p>

                </div>
            </motion.div>
        </div>
    )
}

export default Auth