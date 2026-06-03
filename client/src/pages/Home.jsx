import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from '../components/Footer';

function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-slate-950 flex flex-col'>
      <Navbar />

      <div className='flex-1 px-6 py-20'>
        <div className='max-w-7xl mx-auto'>

          {/* HERO BADGE */}
          <div className='flex justify-center mb-8'>
            <div className='bg-slate-900 border border-slate-800 text-slate-300 text-sm px-5 py-3 rounded-full flex items-center gap-2'>
              <HiSparkles size={16} className="text-blue-400" />
              AI-Powered Interview Preparation Platform
            </div>
          </div>

          {/* HERO */}
          <div className='text-center mb-32'>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-5xl md:text-7xl font-bold text-white leading-tight max-w-5xl mx-auto'
            >
              Master Interviews
              <br />
              With
              <span className='inline-block ml-4 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent'>
                AI Intelligence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className='text-slate-400 mt-8 max-w-3xl mx-auto text-xl leading-relaxed'
            >
              Practice role-based interviews, receive AI-generated feedback,
              improve communication skills, and track your growth through
              detailed performance analytics.
            </motion.p>

            <div className='flex flex-wrap justify-center gap-4 mt-12'>

              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/interview")
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className='bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 text-white px-10 py-4 rounded-2xl shadow-xl font-semibold'
              >
                Start Interview
              </motion.button>

              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/history")
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className='border border-slate-700 bg-slate-900 text-white px-10 py-4 rounded-2xl hover:bg-slate-800 transition'
              >
                View History
              </motion.button>

            </div>
          </div>

          {/* PROCESS */}
          <div className='flex flex-col lg:flex-row justify-center items-center gap-8 mb-36'>
            {[
              {
                icon: <BsRobot size={26} />,
                step: "STEP 1",
                title: "Role & Experience Setup",
                desc: "Customize interview difficulty based on your profile."
              },
              {
                icon: <BsMic size={26} />,
                step: "STEP 2",
                title: "AI Voice Interview",
                desc: "Dynamic questions and smart follow-up responses."
              },
              {
                icon: <BsClock size={26} />,
                step: "STEP 3",
                title: "Performance Evaluation",
                desc: "Receive detailed AI-generated interview analysis."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 + index * 0.15 }}
                whileHover={{ y: -8 }}
                className='bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-sm shadow-2xl'
              >
                <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500 flex items-center justify-center text-white mb-6'>
                  {item.icon}
                </div>

                <div className='text-blue-400 text-xs font-semibold tracking-wider mb-2'>
                  {item.step}
                </div>

                <h3 className='text-xl font-semibold text-white mb-3'>
                  {item.title}
                </h3>

                <p className='text-slate-400 leading-relaxed'>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* FEATURES */}
          <div className='mb-36'>

            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className='text-4xl md:text-5xl font-bold text-center text-white mb-16'
            >
              Advanced AI
              <span className='text-blue-400'> Features</span>
            </motion.h2>

            <div className='grid md:grid-cols-2 gap-8'>
              {[
                {
                  image: evalImg,
                  icon: <BsBarChart size={20} />,
                  title: "AI Answer Evaluation",
                  desc: "Measure communication skills, correctness and confidence."
                },
                {
                  image: resumeImg,
                  icon: <BsFileEarmarkText size={20} />,
                  title: "Resume Based Questions",
                  desc: "Generate project-specific and experience-focused interviews."
                },
                {
                  image: pdfImg,
                  icon: <BsFileEarmarkText size={20} />,
                  title: "PDF Performance Reports",
                  desc: "Download detailed interview performance summaries."
                },
                {
                  image: analyticsImg,
                  icon: <BsBarChart size={20} />,
                  title: "History & Analytics",
                  desc: "Track progress using AI-generated insights and trends."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  className='bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl'
                >
                  <div className='flex flex-col md:flex-row items-center gap-8'>

                    <div className='w-full md:w-1/2 flex justify-center'>
                      <img
                        src={item.image}
                        alt={item.title}
                        className='w-full max-h-64 object-contain'
                      />
                    </div>

                    <div className='w-full md:w-1/2'>

                      <div className='w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center mb-5'>
                        {item.icon}
                      </div>

                      <h3 className='text-xl font-semibold text-white mb-3'>
                        {item.title}
                      </h3>

                      <p className='text-slate-400 leading-relaxed'>
                        {item.desc}
                      </p>

                    </div>

                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* MODES */}
          <div className='mb-36'>

            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className='text-4xl md:text-5xl font-bold text-center text-white mb-16'
            >
              Interview
              <span className='text-violet-400'> Modes</span>
            </motion.h2>

            <div className='grid md:grid-cols-2 gap-8'>

              {[
                {
                  img: hrImg,
                  title: "HR Interview Mode",
                  desc: "Behavioral and communication-focused evaluation."
                },
                {
                  img: techImg,
                  title: "Technical Interview",
                  desc: "Role-specific technical questions and assessment."
                },
                {
                  img: confidenceImg,
                  title: "Confidence Detection",
                  desc: "Analyze speaking patterns and confidence indicators."
                },
                {
                  img: creditImg,
                  title: "Credits System",
                  desc: "Flexible interview credits and premium sessions."
                }
              ].map((mode, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  className='bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl'
                >
                  <div className='flex items-center justify-between gap-6'>

                    <div className='w-1/2'>
                      <h3 className='text-xl font-semibold text-white mb-3'>
                        {mode.title}
                      </h3>

                      <p className='text-slate-400 leading-relaxed'>
                        {mode.desc}
                      </p>
                    </div>

                    <div className='w-1/2 flex justify-end'>
                      <img
                        src={mode.img}
                        alt={mode.title}
                        className='w-28 h-28 object-contain'
                      />
                    </div>

                  </div>
                </motion.div>
              ))}

            </div>

          </div>

        </div>
      </div>

      {showAuth && (
        <AuthModel onClose={() => setShowAuth(false)} />
      )}

      <Footer />
    </div>
  )
}

export default Home