import React from "react";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import { m, motion } from "motion/react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
function Step3Report({ report }) {
  const navigate = useNavigate();
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading Report...</p>
      </div>
    );
  }
  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0,
  }));

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];
  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence";
  }

  const score = finalScore;
  const percentage = (score/10)*100;

  const downloadPDF = () =>{
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth= doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin *2;
    let currentY = 25;
    //TITLE
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(34,197,94);
    doc.text("AI Interview Performance Report", pageWidth/2,currentY,{
      align:"center",
    });
    currentY+=5;

    //underline
    doc.setDrawColor(34,197,94);
    doc.line(margin, currentY+2, pageWidth-margin,currentY+2);
    currentY+=15;

    //final score box
    doc.setFillColor(240,253,244);
    doc.roundedRect(margin,currentY,contentWidth, 20,4,4,"F");

    doc.setFontSize(14);
    doc.setTextColor(0,0,0);
    doc.text(
      `Final Score: ${finalScore}/10`,
      pageWidth/2,
      currentY+12,
      {align:"center"}
    );
    currentY+=30;

    //skill box
    doc.setFillColor(249,250,251);
    doc.roundedRect(margin,currentY,contentWidth,30,4,4,"F");

    doc.setFontSize(12);

    doc.text(`Confidence: ${confidence}`,margin+10, currentY+10);
    doc.text(`Communication: ${communication}`, margin+10, currentY+18);
    doc.text(`Correctness: ${correctness}`, margin+10, currentY+26);

    currentY+=45;

    //advice
    let  advice = "";
    if(finalScore>=8){
      advice= "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
    }else if(finalScore>=5){
      advice = "Good foundation shown. Imrpove clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
    }else{
      advice = "Significant imporvement required. Focus on structures thinking, clarity, and confident delivery. Practice answering aloud regulary."
    }

    doc.setFillColor(255,255,255);
    doc.setDrawColor(220);
    doc.roundedRect(margin, currentY, contentWidth, 35,4,4);

    doc.setFont("helvetica", "bold");
    doc.text("Proffessional Advice", margin+10, currentY+10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const splitAdvice = doc.splitTextToSize(advice, contentWidth-20);
    doc.text(splitAdvice, margin+10, currentY+20);

    currentY+=50;

    //question table
    autoTable(doc,{
      startY:currentY,
      margin:{left:margin,right:margin},
      head:[["#","Question","Score", "Feedback"]],
      body:questionWiseScore.map((q,i)=>[
        `${i+1}`,
        q.question,
        `${q.score}/10`,
        q.feedback,
      ]),
      styles:{
        fontSize:9,
        cellPadding:5,
        valign:"top",
      },
      headStyles:{
        fillColor:[34,197,94],
        textColor:255,
        halign:"center",
      },
      columnStyles:{
      0:{cellWidth:10,halign:"center"},//index
      1:{cellWidth:55},//question
      2:{cellWidth:20, halign:"center"},///score
      3:{cellWidth:"auto"},
      },
      alternateRowStyles:{
        fillColor:[249,250,251],
      },
    })
    doc.save("AI_Interview_Report.pdf");
  }
return (
  <div className="min-h-screen bg-slate-950 px-4 sm:px-6 lg:px-10 py-8">
    <div className="max-w-7xl mx-auto">

      <div className="mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="flex items-start gap-4">

          <button
            onClick={() => navigate("/history")}
            className="mt-1 p-3 rounded-full bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-4xl font-bold text-white">
              Interview Analytics
            </h1>

            <p className="text-slate-400 mt-2">
              AI-powered performance insights and interview analysis
            </p>
          </div>

        </div>

        <button
          onClick={downloadPDF}
          className="bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold shadow-xl hover:opacity-90 transition"
        >
          Download PDF Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN */}
        <div className="space-y-8">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl"
          >
            <h3 className="text-slate-400 mb-6">
              Overall Performance
            </h3>

            <div className="relative w-28 h-28 mx-auto">
              <CircularProgressbar
                value={percentage}
                text={`${score}/10`}
                styles={buildStyles({
                  textSize: "18px",
                  pathColor: "#3b82f6",
                  textColor: "#ffffff",
                  trailColor: "#334155",
                })}
              />
            </div>

            <div className="mt-6">
              <p className="font-semibold text-white">
                {performanceText}
              </p>

              <p className="text-slate-400 text-sm mt-2">
                {shortTagline}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              Skill Evaluation
            </h3>

            <div className="space-y-6">
              {skills.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">
                      {s.label}
                    </span>

                    <span className="font-semibold text-blue-400">
                      {s.value}
                    </span>
                  </div>

                  <div className="bg-slate-700 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-violet-500 h-full rounded-full"
                      style={{ width: `${s.value * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-8">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              Performance Trend
            </h3>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={questionScoreData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                  />

                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                  />

                  <YAxis
                    domain={[0, 10]}
                    stroke="#94a3b8"
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#3b82f6"
                    fill="#1e3a8a"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              Question Breakdown
            </h3>

            <div className="space-y-6">

              {questionWiseScore.map((q, i) => (
                <div
                  key={i}
                  className="bg-slate-800 border border-slate-700 p-6 rounded-3xl"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-5">

                    <div>
                      <p className="text-xs text-slate-500 mb-2">
                        Question {i + 1}
                      </p>

                      <p className="font-semibold text-white text-sm sm:text-base leading-relaxed">
                        {q.question || "Question not available"}
                      </p>
                    </div>

                    <div className="bg-blue-500/15 border border-blue-500/20 text-blue-300 px-4 py-2 rounded-full font-bold w-fit">
                      {q.score ?? 0}/10
                    </div>

                  </div>

                  <div className="bg-slate-900 border border-slate-700 p-4 rounded-2xl">

                    <p className="text-xs text-blue-400 font-semibold mb-2">
                      AI Feedback
                    </p>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {q.feedback && q.feedback.trim() !== ""
                        ? q.feedback
                        : "No feedback available for this question."}
                    </p>

                  </div>
                </div>
              ))}

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  </div>
);
}

export default Step3Report;
