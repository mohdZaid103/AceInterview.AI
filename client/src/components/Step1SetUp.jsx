import React from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
    FaRocket,
} from "react-icons/fa";
import { useState } from 'react';
import axios from "axios"
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Step1SetUp({ onStart }) {
    const { userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true)

        const formdata = new FormData()
        formdata.append("resume", resumeFile)

        try {
            const result = await axios.post(
                ServerUrl + "/api/interview/resume",
                formdata,
                { withCredentials: true }
            )

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);

            setAnalyzing(false);

        } catch (error) {
            console.log(error)
            setAnalyzing(false);
        }
    }

    const handleStart = async () => {
        setLoading(true)
        try {
            const result = await axios.post(
                ServerUrl + "/api/interview/generate-questions",
                { role, experience, mode, resumeText, projects, skills },
                { withCredentials: true }
            )

            if (userData) {
                dispatch(setUserData({
                    ...userData,
                    credits: result.data.creditsLeft
                }))
            }

            setLoading(false)
            onStart(result.data)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='min-h-screen bg-slate-950 px-4 py-10 flex items-center justify-center'
        >

            <div className='w-full max-w-7xl overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.45)] grid lg:grid-cols-2'>

                {/* LEFT PANEL */}
                <motion.div
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className='relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-violet-950 p-10 md:p-14 flex flex-col justify-center'
                >
                    <div className='absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl' />
                    <div className='absolute bottom-0 right-0 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl' />

                    <div className='relative z-10'>
                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 text-sm mb-6'>
                            <FaRocket />
                            AI Interview Assistant
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                            Practice Like It's Your Real Interview
                        </h2>

                        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                            Get role-specific questions, AI-driven feedback,
                            resume-based interviews, and performance insights
                            designed to help you crack your dream job.
                        </p>

                        <div className='space-y-4'>

                            {[
                                {
                                    icon: <FaUserTie className="text-blue-400 text-xl" />,
                                    text: "Role-Specific Questions"
                                },
                                {
                                    icon: <FaMicrophoneAlt className="text-violet-400 text-xl" />,
                                    text: "Voice-Based AI Interviews"
                                },
                                {
                                    icon: <FaChartLine className="text-cyan-400 text-xl" />,
                                    text: "Detailed Performance Analytics"
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + index * 0.15 }}
                                    whileHover={{ scale: 1.02 }}
                                    className='flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-5'
                                >
                                    {item.icon}
                                    <span className='text-slate-200 font-medium'>
                                        {item.text}
                                    </span>
                                </motion.div>
                            ))}

                        </div>
                    </div>
                </motion.div>

                {/* RIGHT PANEL */}
                <motion.div
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className='p-8 md:p-12 bg-slate-900'
                >

                    <h2 className='text-3xl font-bold text-white mb-2'>
                        Interview Setup
                    </h2>

                    <p className='text-slate-400 mb-8'>
                        Configure your interview preferences and get started.
                    </p>

                    <div className='space-y-6'>

                        {/* ROLE */}
                        <div className='relative'>
                            <FaUserTie className='absolute top-4 left-4 text-slate-500' />

                            <input
                                type='text'
                                placeholder='Enter Role (e.g. Frontend Developer)'
                                className='w-full bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 rounded-2xl py-3 pl-12 pr-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition'
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                            />
                        </div>

                        {/* EXPERIENCE */}
                        <div className='relative'>
                            <FaBriefcase className='absolute top-4 left-4 text-slate-500' />

                            <input
                                type='text'
                                placeholder='Experience (e.g. 2 Years)'
                                className='w-full bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 rounded-2xl py-3 pl-12 pr-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition'
                                onChange={(e) => setExperience(e.target.value)}
                                value={experience}
                            />
                        </div>

                        {/* MODE */}
                        <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className='w-full bg-slate-800 border border-slate-700 text-white rounded-2xl py-3 px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition'
                        >
                            <option value="Technical">Technical Interview</option>
                            <option value="HR">HR Interview</option>
                        </select>

                        {/* RESUME */}
                        {!analysisDone && (
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                onClick={() => document.getElementById("resumeUpload").click()}
                                className='border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-3xl p-8 text-center cursor-pointer transition bg-slate-800/40'
                            >

                                <FaFileUpload className='text-5xl mx-auto text-blue-400 mb-4' />

                                <input
                                    type="file"
                                    accept="application/pdf"
                                    id="resumeUpload"
                                    className='hidden'
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                />

                                <p className='text-slate-300 font-medium'>
                                    {resumeFile
                                        ? resumeFile.name
                                        : "Upload Resume (Optional)"}
                                </p>

                                <p className='text-slate-500 text-sm mt-2'>
                                    AI will analyze your experience, skills and projects
                                </p>

                                {resumeFile && (
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUploadResume()
                                        }}
                                        className='mt-5 bg-gradient-to-r from-blue-500 to-violet-600 text-white px-6 py-3 rounded-xl font-medium'
                                    >
                                        {analyzing ? "Analyzing..." : "Analyze Resume"}
                                    </motion.button>
                                )}

                            </motion.div>
                        )}

                        {/* ANALYSIS RESULT */}
                        {analysisDone && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='bg-slate-800 border border-slate-700 rounded-3xl p-6 space-y-5'
                            >
                                <h3 className='text-xl font-semibold text-white'>
                                    Resume Analysis
                                </h3>

                                {projects.length > 0 && (
                                    <div>
                                        <p className='text-slate-300 font-medium mb-2'>
                                            Projects
                                        </p>

                                        <ul className='space-y-2'>
                                            {projects.map((p, i) => (
                                                <li
                                                    key={i}
                                                    className='text-slate-400'
                                                >
                                                    • {p}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {skills.length > 0 && (
                                    <div>
                                        <p className='text-slate-300 font-medium mb-2'>
                                            Skills
                                        </p>

                                        <div className='flex flex-wrap gap-2'>
                                            {skills.map((s, i) => (
                                                <span
                                                    key={i}
                                                    className='px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/20 text-blue-300 text-sm'
                                                >
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* START BUTTON */}
                        <motion.button
                            onClick={handleStart}
                            disabled={!role || !experience || loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className='w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 disabled:bg-slate-700 disabled:cursor-not-allowed shadow-lg'
                        >
                            {loading ? "Starting..." : "Start Interview"}
                        </motion.button>

                    </div>

                </motion.div>

            </div>

        </motion.div>
    )
}

export default Step1SetUp