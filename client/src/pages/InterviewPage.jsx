import React from 'react'
import { useState } from 'react'
import Step1SetUp from '../components/Step1SetUp'
import Step2Interview from '../components/Step2Interview'
import Step3Report from '../components/Step3Report'
import { motion, AnimatePresence } from "motion/react"

function InterviewPage() {
    const [step, setStep] = useState(1)
    const [interviewData, setInterviewData] = useState(null)

    return (
        <div className='min-h-screen bg-slate-950 relative overflow-hidden'>

            {/* Background Glow */}
            <div className='fixed inset-0 pointer-events-none'>
                <div className='absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl' />
                <div className='absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl' />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl' />
            </div>

            <AnimatePresence mode="wait">

                {step === 1 && (
                    <motion.div
                        key="setup"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Step1SetUp
                            onStart={(data) => {
                                setInterviewData(data);
                                setStep(2);
                            }}
                        />
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="interview"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Step2Interview
                            interviewData={interviewData}
                            onFinish={(report) => {
                                setInterviewData(report);
                                setStep(3);
                            }}
                        />
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="report"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Step3Report report={interviewData} />
                    </motion.div>
                )}

            </AnimatePresence>

        </div>
    )
}

export default InterviewPage