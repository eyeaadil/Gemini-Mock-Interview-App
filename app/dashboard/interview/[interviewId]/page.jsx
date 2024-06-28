// import React from 'react'
"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";

const Interview = ({ params }) => {
	const [interviewData, setInterviewData] = useState();

	// console.log("c sdccc nv fv fnv fnvfnv fnv fn vfn",interviewData);
	// console.log("Adilnhhhhhhhh", interviewData);
	const [webCamEnable, setWebCamEnable] = useState(false);
	useEffect(() => {
		// console.log("Adil", params);
		GetInterviewDetails();
	}, []);

	// used to get interviewDetails by MockId/InterviewId
	const GetInterviewDetails = async () => {
		const result = await db
			.select()
			.from(MockInterview)
			.where(eq(MockInterview.mockId, params.interviewId));
		// console.log("vsdsdhvbvfdvn ndf df ", result);
		setInterviewData(result[0]);
	};
	return (
		<div className=" my-10 ">
			<h2 className="font-bold text-2xl m-auto ">Let's Get Started</h2>

			<div className=" grid grid-cols-1 md:grid-cols-2 gap-10">
				<div className="flex flex-col py-7">
					<div className="flex flex-col rounded-lg gap-5 border py-7 p-5 ">
						<h2 className="">
							<strong>Job Role/Job Position: </strong>
							{interviewData ? interviewData.jobPosition : "Loading..."}
						</h2>

						<h2 className="">
							<strong>Job Description/Tech Stack: </strong>
							{interviewData ? interviewData.jobDesc : "Loading..."}
						</h2>

						<h2 className="">
							<strong>Years of Experience: </strong>
							{interviewData ? interviewData.jobExperience : "Loading..."}
						</h2>
					</div>

          <div className="p-9 border rounded-lg border-yellow-300 bg-yellow-100 mt-2">
            {/* <Lightbulb/> */}
            <h2 className="flex gap-1 items-center text-yellow-500"><Lightbulb/> <strong>Information</strong></h2>
            <h2 className="mt-3 text-yellow-600">Enable Video Web Cam and Microphone to start Your AI Generated Mock Interview.It has 5 Question which you can answer and at the last you will get the report on the basis of Your answer.NOTE:We never Record Your Video ,Web cam access you can disable at any time.
            </h2>
          </div>
				</div>

				<div className="flex flex-col">
					{webCamEnable ? (
						<Webcam
							onUserMedia={() => setWebCamEnable(true)}
							onUserMediaError={() => setWebCamEnable(false)}
							mirrored={true}
							style={{ height: 300, width: 300 }}
						/>
					) : (
						<>
							<WebcamIcon className="h-72 my-7 w-full p-10 bg-secondary rounded-lg border" />
							<Button variant="ghost" onClick={() => setWebCamEnable(true)}>
								Enable Web Cam and MicroPhone
							</Button>
						</>
					)}
				</div>
			</div>
      <div className="flex flex-col justify-end items-end">
        <Link href={"/dashboard/interview/"+params.interviewId+"/start"}>
        <Button>Start Interview</Button>
        </Link>
        
      </div>
		</div>
	);
};

export default Interview;
