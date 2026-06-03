import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ServerUrl } from '../App';
import Step3Report from '../components/Step3Report';
import { motion } from "motion/react";
import { BsBarChart } from "react-icons/bs";

function InterviewReport() {
  const { id } = useParams()
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await axios.get(
          ServerUrl + "/api/interview/report/" + id,
          { withCredentials: true }
        )

        setReport(result.data);

      } catch (error) {
        console.log(error);
      }
    }

    fetchReport()
  }, [id])

  if (!report) {
    return (
      <div className='min-h-screen bg-slate-950 flex items-center justify-center px-4'>

        {/* Background Glow */}
        <div className='fixed inset-0 pointer-events-none'>
          <div className='absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl' />
          <div className='absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl' />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className='relative bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center shadow-2xl'
        >
          <div className='w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center mx-auto mb-5'>
            <BsBarChart className='text-blue-400 text-3xl' />
          </div>

          <h2 className='text-2xl font-bold text-white mb-3'>
            Loading Report
          </h2>

          <p className='text-slate-400 mb-6'>
            Fetching interview analytics and AI insights...
          </p>

          <div className='flex justify-center'>
            <div className='w-10 h-10 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin' />
          </div>
        </motion.div>

      </div>
    )
  }

  return (
    <div className='bg-slate-950 min-h-screen'>
      <Step3Report report={report} />
    </div>
  )
}

export default InterviewReport