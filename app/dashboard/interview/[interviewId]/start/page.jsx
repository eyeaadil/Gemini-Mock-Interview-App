'use client'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionSection from './_component/QuestionSection'
import RecordAnswerSection from './_component/RecordAnswerSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const StartInterview = ({params}) => {
    const[interviewData,setInterviewData]=useState();
    const[mockInterviewQuestion,setMockinterviewQuestion]=useState()
    const[activeQuestionIndex,setActiveQuestionIndex]=useState(0)

    useEffect(
        () => {
            // console.log("Start Interview")
            GetInterviewDetails()
            },[]
    )

    // used to get interviewDetails by MockId/InterviewId
	const GetInterviewDetails = async () => {
		const result = await db
			.select()
			.from(MockInterview)
			.where(eq(MockInterview.mockId, params.interviewId));
		// console.log("vsdsdhvbvfdvn ndf df ", result);
		setInterviewData(result[0]);

        const jsonMockResp = JSON.parse(result[0].jsonMockResp)
        // console.log(jsonMockResp)  
        setMockinterviewQuestion(jsonMockResp);
        setInterviewData(result[0])
	};
  return ( 
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* Question */}
            <QuestionSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex}/>




            {/* Vide/Audio Recordig */}
            <RecordAnswerSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} interviewData={interviewData}/>

        </div>
        <div className='flex justify-end gap-6'>
         {activeQuestionIndex>0 &&   <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
         {activeQuestionIndex!=mockInterviewQuestion?.length-1 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}

         <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
        {activeQuestionIndex==mockInterviewQuestion?.length-1 && <Button>End Interview</Button>}
         
         </Link>

        </div>
    </div>
  )
}

export default StartInterview