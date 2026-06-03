import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ServerUrl } from '../App'
import { FaArrowLeft } from 'react-icons/fa'
import { BsClockHistory, BsBarChart } from 'react-icons/bs'

function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(
                    ServerUrl + "/api/interview/get-interview",
                    { withCredentials: true }
                )
                setInterviews(result.data)
            } catch (error) {
                console.log(error)
            }
        }

        getMyInterviews()
    }, [])

    return (
        <div className='min-h-screen bg-slate-950 py-10 px-4'>

            <div className='max-w-6xl mx-auto'>

                {/* Header */}
                <div className='mb-12 flex items-start gap-4 flex-wrap'>

                    <button
                        onClick={() => navigate("/")}
                        className='mt-1 p-3 rounded-full bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition'
                    >
                        <FaArrowLeft />
                    </button>

                    <div>
                        <h1 className='text-4xl font-bold text-white'>
                            Interview History
                        </h1>

                        <p className='text-slate-400 mt-2'>
                            Track your interview performance and AI-generated reports
                        </p>
                    </div>

                </div>

                {/* Empty State */}
                {interviews.length === 0 ? (

                    <div className='bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center shadow-2xl'>

                        <div className='w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center mx-auto mb-5'>
                            <BsClockHistory className='text-blue-400 text-3xl' />
                        </div>

                        <h3 className='text-white text-xl font-semibold mb-3'>
                            No Interviews Yet
                        </h3>

                        <p className='text-slate-400 mb-6'>
                            Start your first AI interview and build your performance history.
                        </p>

                        <button
                            onClick={() => navigate("/interview")}
                            className='bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold'
                        >
                            Start Interview
                        </button>

                    </div>

                ) : (

                    <>
                        {/* Stats */}
                        <div className='grid md:grid-cols-3 gap-6 mb-10'>

                            <div className='bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl'>
                                <p className='text-slate-400 text-sm'>
                                    Total Interviews
                                </p>

                                <h2 className='text-3xl font-bold text-white mt-2'>
                                    {interviews.length}
                                </h2>
                            </div>

                            <div className='bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl'>
                                <p className='text-slate-400 text-sm'>
                                    Average Score
                                </p>

                                <h2 className='text-3xl font-bold text-blue-400 mt-2'>
                                    {(
                                        interviews.reduce(
                                            (acc, item) => acc + (item.finalScore || 0),
                                            0
                                        ) / interviews.length
                                    ).toFixed(1)}
                                    /10
                                </h2>
                            </div>

                            <div className='bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl'>
                                <p className='text-slate-400 text-sm'>
                                    Reports Generated
                                </p>

                                <h2 className='text-3xl font-bold text-violet-400 mt-2'>
                                    {interviews.filter(
                                        (item) => item.status === "completed"
                                    ).length}
                                </h2>
                            </div>

                        </div>

                        {/* History List */}
                        <div className='grid gap-6'>

                            {interviews.map((item, index) => (

                                <div
                                    key={index}
                                    onClick={() => navigate(`/report/${item._id}`)}
                                    className='group bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-blue-500/40 hover:shadow-2xl transition-all duration-300 cursor-pointer'
                                >

                                    <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>

                                        {/* Left */}
                                        <div>

                                            <div className='flex items-center gap-3 mb-3'>

                                                <div className='w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center'>
                                                    <BsBarChart className='text-blue-400' />
                                                </div>

                                                <h3 className='text-xl font-semibold text-white'>
                                                    {item.role}
                                                </h3>

                                            </div>

                                            <p className='text-slate-400 text-sm'>
                                                {item.experience} • {item.mode}
                                            </p>

                                            <p className='text-slate-500 text-sm mt-3'>
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </p>

                                        </div>

                                        {/* Right */}
                                        <div className='flex items-center gap-8'>

                                            <div className='text-right'>
                                                <p className='text-3xl font-bold text-blue-400'>
                                                    {item.finalScore || 0}/10
                                                </p>

                                                <p className='text-xs text-slate-500'>
                                                    Overall Score
                                                </p>
                                            </div>

                                            <span
                                                className={`px-4 py-2 rounded-full text-xs font-semibold border ${
                                                    item.status === "completed"
                                                        ? "bg-blue-500/10 border-blue-500/20 text-blue-300"
                                                        : "bg-yellow-500/10 border-yellow-500/20 text-yellow-300"
                                                }`}
                                            >
                                                {item.status}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default InterviewHistory