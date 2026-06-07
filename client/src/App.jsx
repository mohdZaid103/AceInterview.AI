import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import InterviewPage from './pages/InterviewPage'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'
import PrivacyPolicy from './pages/PrivacyPolicy'
 import TermsConditions from './pages/TermsConditions'
import RefundPolicy from './pages/RefundPolicy'
 import ContactUs from './pages/ContactUs'
export const ServerUrl  = "https://aceinterview-ai-m2k3.onrender.com"

function App() {

  const dispatch = useDispatch()
  useEffect(()=>{
    const getUser = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user", {withCredentials:true})
        dispatch(setUserData(result.data))
      } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
      }
    }
    getUser()

  },[dispatch])
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/interview' element={<InterviewPage/>}/>

      <Route path='/history' element={<InterviewHistory/>}/>
      
      <Route path='/pricing' element={<Pricing/>}/>
      <Route path='/report/:id' element={<InterviewReport/>}/>
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms-and-conditions" element={<TermsConditions />} />
<Route path="/refund-policy" element={<RefundPolicy />} />
<Route path="/contact-us" element={<ContactUs />} />
    </Routes>
  )
}

export default App
