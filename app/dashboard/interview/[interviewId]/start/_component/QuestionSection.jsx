import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
	// console.log("FFFFFFFFF",typeof(mockInterviewQuestion));
	console.log("yyyyyy",mockInterviewQuestion);
	const textToSpeech = (text)=>{
		if('speechSynthesis' in window){
			const speech = new SpeechSynthesisUtterance(text);
			speech.lang = 'en-US'
			speech.volume = 1
			speech.rate = 1

			// speech.lang = 'en-US';
			window.speechSynthesis.speak(speech);
		}else{
			alert("Sorry your Browser does not support text to speech ")
		}
	}
	// console.log("ADIIIIIIIILLLLLLLLLLLL", mockInterviewQuestion);
	// console.log('Type of:',typeof(mockInterviewQuestion));
	return mockInterviewQuestion && (
		<div className="p-5 border rounded-lg my-10">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
				{mockInterviewQuestion &&
					mockInterviewQuestion?.map((question, index) => (
						<div key={index}>
							<h2
								className={`p-2 bg-secondary rounded-full text-center text-xs md:text-sm cursor-pointer ${
									activeQuestionIndex == index && "bg-violet-500 text-white"
								}`}
							>
								#Question {index + 1}
							</h2>
							{/* <p>{question.Question}</p> */}
						</div>
					))}

			</div>
            <h2 className="my-5 text-md md:text-lg">{mockInterviewQuestion[activeQuestionIndex]?.question || mockInterviewQuestion[activeQuestionIndex]?.Question}</h2>
			<Volume2 className="cursor-pointer"  onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question || mockInterviewQuestion[activeQuestionIndex]?.Question)}/>
            <div className="border rounded-lg bg-blue-100 p-5 mt-20">
                <h2 className="flex gap-3 items-center text-blue-700">
                    <Lightbulb/>
                    <strong>NOTE:</strong>
                </h2>
                <h2 className="my-2 text-blue-700">Click on Record Answer when you want to answer the Question.At the end of the Interview we will give you the feedback along with answer fro each of question and your answer to compare it.</h2>
            </div>
 
		</div>
	);
};

export default QuestionSection;
