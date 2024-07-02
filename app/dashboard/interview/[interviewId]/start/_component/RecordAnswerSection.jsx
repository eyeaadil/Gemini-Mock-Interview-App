"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Heading2, Mic, StopCircle } from "lucide-react";
import { chatSession } from "@/utils/GeminiAiModel";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { toast } from "sonner";
import { UserAnswer } from "@/utils/schema";
import { userAgent } from "next/server";

const RecordAnswerSection = ({
	mockInterviewQuestion,
	activeQuestionIndex,
	interviewData,
}) => {

	
	const [isClient, setIsClient] = useState(false);
	const [userAnswer, setUserAnswer] = useState("");
	const [loading, setLoading] = useState(false);

	const { user } = useUser();

	useEffect(() => {
		setIsClient(true);
	}, []);

	const {
		error,
		interimResult,
		isRecording,
		results,
    setResults,
		startSpeechToText,
		stopSpeechToText,
	} = useSpeechToText({
		continuous: true,
		useLegacyResults: false,
	});

  // console.log("Results",results);
  // console.log("interimResult",interimResult)

	useEffect(() => {
		results.map((result) =>
			setUserAnswer((prevAnswer) => prevAnswer + result?.transcript)
		);
	}, [results]);

  useEffect(()=>{
    // console.log("Dil to pagal hai ,dil deewaana hai")
    // UpdateUserAnswerInDb();
    if (isRecording && userAnswer.length>10) {
      // console.log("Assalamu Alaikum")
      UpdateUserAnswerInDb();
    }
    // if (userAnswer.length<10) {
    //   setLoading(false);
    //   toast('Error while saving your answer,Please record again')
    // }
  },[userAnswer])


  // console.log("user answer",userAnswer);

 

	if (!isClient) {
		return null; // Return null when rendering on the server side
	}

	const saveUserAnswer = async () => {
		// isRecording? stopSpeechToText : startSpeechToText

		if (isRecording) {
			// setLoading(true);
			stopSpeechToText();
			// if (userAnswer?.length < 10) {
			// 	setLoading(false);
			// 	toast("Error while saving your answer , Please record again");
			// }

      // UpdateUserAnswerInDb();
			
		} else {
			startSpeechToText();
		}
	};

	const UpdateUserAnswerInDb = async () => {
    // console.log("jab life ho out of control to shiti bajake bol ALL IS WELL")
    setLoading(true)
    const feedbackPrompt =
				"Question:" +
				mockInterviewQuestion[activeQuestionIndex]?.question +
				", User Answer:" +
				userAnswer +
				", Depends on question and user answer for given interview question " +
				" Please give us rating for answer and feedback as area of improvement if any " +
				" in just 3 t0 5 lines to improve it in JSON format with rating field and feedback field";

			const result = await chatSession.sendMessage(feedbackPrompt);
			const mockJsonResp = result.response
				.text()
				.replace("```json", "")
				.replace("```", "");

			console.log("tanzu",mockJsonResp);
			// now convert this into json
			const jsonFeedbackResp = JSON.parse(mockJsonResp);
			// console.log("tanzu", jsonFeedbackResp); //Now we need to set this inside our database

      // console.log("fddggfdgfdfdfgdfdgdjg",userAnswer);

			const resp = await db.insert(UserAnswer).values({
				mockIdRef: interviewData?.mockId,
				question: mockInterviewQuestion[activeQuestionIndex]?.Question,
				correctAns: mockInterviewQuestion[activeQuestionIndex]?.Answer,
				userAns: userAnswer,
				feedback: jsonFeedbackResp?.feedback,
				rating: jsonFeedbackResp?.rating,
				userEmail: user.primaryEmailAddress.emailAddress,
				createdAt: moment().format("DD-MM-YYYY"),
			});

			if (resp) {
				toast("User answer recorded successfully");
        setUserAnswer('')
        setResults([])
			}

			// setUserAnswer('')         //iske baad waala step me garbar hai
      setResults([])
			setLoading(false)
  };


	return (
		<div className="flex flex-col justify-center items-center">
			<div className="mt-20 flex flex-col justify-center items-center bg-black rounded-lg p-8">
				<Image
					src={"/webcam-icon.png"}
					alt="webcam-image"
					width={200}
					height={200}
					className="absolute"
				/>
				<Webcam
					mirrored={true}
					style={{
						height: 300,
						width: 400,
					}}
				/>
			</div>

			<Button
				disabled={loading}
				variant="outline"
				className="my-10"
				onClick={saveUserAnswer}
			>
				{isRecording ? (
					<h2 className="text-red-600 animate-pulse flex gap-2 items-center">
						<StopCircle /> stop Recording
					</h2>
				) : (
					<h2 className="text-primary flex gap-2 items-center">
						<Mic /> Record Answer
					</h2>
				)}
			</Button>

			{/* <Button
				onClick={() => {
					console.log(userAnswer);
				}}
			>
				User Answer
			</Button> */}

			{/* <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul> */}
		</div>
	);
};

export default RecordAnswerSection;
