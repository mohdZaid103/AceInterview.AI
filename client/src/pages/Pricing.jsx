import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free")
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "Best value for serious job preparation and confidence building.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Performance Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Most Popular",
    },
  ]

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)

      const amount = plan.price.replace("₹", "")

      const result = await axios.post(
        ServerUrl + "/api/payment/order",
        {
          planId: plan.id,
          amount,
          credits: plan.credits,
        },
        { withCredentials: true }
      )

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "AceInterview.AI",
        description: `Purchase ${plan.credits} AI Interview Credits`,
        order_id: result.data.id,

        handler: async function (response) {
          try {
            const verifyPayment = await axios.post(
              ServerUrl + "/api/payment/verify",
              {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              },
              { withCredentials: true }
            );

            dispatch(setUserData(verifyPayment.data.user));
            navigate("/");
          }
          catch (error) {
            console.log(error.response?.data);
          }
        },

        theme: {
          color: "#3b82f6",
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
      setLoadingPlan(null)

    } catch (error) {
      console.error("Error occurred while processing payment:", error)
      setLoadingPlan(null)
    }
  }

  return (
    <div className='min-h-screen bg-slate-950 py-16 px-6'>

      <div className='max-w-7xl mx-auto'>

        {/* Header */}
        <div className='mb-16 flex items-start gap-4'>

          <button
            onClick={() => navigate("/")}
            className='mt-2 p-3 rounded-full bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition'
          >
            <FaArrowLeft />
          </button>

          <div className='text-center w-full'>
            <h1 className='text-5xl font-bold text-white'>
              Choose Your Plan
            </h1>

            <p className='text-slate-400 mt-4 text-lg max-w-2xl mx-auto'>
              Unlock AI-powered interview practice, advanced feedback,
              analytics, and performance tracking.
            </p>
          </div>

        </div>

        {/* Pricing Cards */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>

          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id

            return (
              <motion.div
                key={plan.id}
                whileHover={!plan.default ? { y: -8 } : {}}
                onClick={() => !plan.default && setSelectedPlan(plan.id)}
                className={`
                  relative rounded-[32px] p-8 transition-all duration-300 border
                  ${
                    isSelected
                      ? "border-blue-500 bg-slate-900 shadow-[0_20px_60px_rgba(59,130,246,0.15)]"
                      : "border-slate-800 bg-slate-900"
                  }
                  ${plan.default ? "cursor-default" : "cursor-pointer"}
                `}
              >

                {/* Glow */}
                {isSelected && (
                  <div className='absolute inset-0 rounded-[32px] bg-gradient-to-r from-blue-500/5 via-violet-500/5 to-cyan-500/5 pointer-events-none' />
                )}

                {/* Badge */}
                {plan.badge && (
                  <div className='absolute top-6 right-6 bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xs px-4 py-2 rounded-full font-semibold'>
                    {plan.badge}
                  </div>
                )}

                {/* Default */}
                {plan.default && (
                  <div className='absolute top-6 right-6 bg-slate-800 text-slate-300 text-xs px-4 py-2 rounded-full border border-slate-700'>
                    Default
                  </div>
                )}

                {/* Plan Name */}
                <h3 className='text-2xl font-bold text-white'>
                  {plan.name}
                </h3>

                {/* Price */}
                <div className='mt-6'>
                  <span className='text-5xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent'>
                    {plan.price}
                  </span>

                  <p className='text-slate-400 mt-2'>
                    {plan.credits} Credits
                  </p>
                </div>

                {/* Description */}
                <p className='text-slate-400 mt-5 leading-relaxed'>
                  {plan.description}
                </p>

                {/* Features */}
                <div className='mt-8 space-y-4'>

                  {plan.features.map((feature, i) => (
                    <div
                      key={i}
                      className='flex items-center gap-3'
                    >
                      <FaCheckCircle className="text-blue-400 text-sm" />

                      <span className='text-slate-300 text-sm'>
                        {feature}
                      </span>
                    </div>
                  ))}

                </div>

                {/* Button */}
                {!plan.default && (
                  <button
                    disabled={loadingPlan === plan.id}
                    onClick={(e) => {
                      e.stopPropagation()

                      if (!isSelected) {
                        setSelectedPlan(plan.id)
                      } else {
                        handlePayment(plan)
                      }
                    }}
                    className={`
                      w-full mt-10 py-4 rounded-2xl font-semibold transition-all duration-300
                      ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 text-white shadow-xl"
                          : "bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
                      }
                    `}
                  >
                    {loadingPlan === plan.id
                      ? "Processing..."
                      : isSelected
                        ? "Proceed to Payment"
                        : "Select Plan"}
                  </button>
                )}

              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default Pricing