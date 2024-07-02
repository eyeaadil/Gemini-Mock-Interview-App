"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
// import { User } from '@clerk/nextjs/dist/types/server'
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

const Feedback = ({ params }) => {
	const [feedbackList, setFeedbackList] = useState([]);
	// const rou = useRouter()
	const router = useRouter();
	useEffect(() => {
		GetFeedback();
	}, []);
	const GetFeedback = async () => {
		const result = await db
			.select()
			.from(UserAnswer)
			.where(eq(UserAnswer.mockIdRef, params.interviewId))
			.orderBy(UserAnswer.id);
		console.log("jjjjjjjjjjj", result);
		console.log("ADIl");
		setFeedbackList(result);
	};
	return (
		<div className="p-10">
			{feedbackList?.length == 0 ? (
				<h2 className="font-bold text-xl text-gray-500">
					No interview Feedback Record Found
				</h2>
			) : (
				<>
					<h1 className="text-3xl font-bold text-green-500">Congratulation!</h1>
					<h2 className="font-bold text-2xl">
						Here is your interview feedback
					</h2>
					<h2 className="text-primary text-lg my-3">
						your Overall Interview rating:<strong>7/10</strong>
					</h2>
					<h2 className="text-sm text-gray-500">
						Find below interview question with correct answer,your answer and
						feedback for improvement
					</h2>
					{feedbackList &&
						feedbackList.map((item, index) => (
							<Collapsible key={index} className="mt-7-">
								<CollapsibleTrigger className=" flex justify-between gap-7 p-2 bg-secondary rounded-lg my-2 text-left w-full">
									{item.question} <ChevronsUpDown className="h-5 w-5" />
								</CollapsibleTrigger>
								<CollapsibleContent>
									<div className="flex flex-col gap-2">
										<h2 className="text-red-500 p-2 border rounded-lg">
											<strong>Rating:</strong>
											{item.rating}
										</h2>
										<h2 className="p-10 border rounded-lg bg-red-50 text-sm text-red-900">
											<strong>Your Answer:</strong>
											{item.userAns}
										</h2>
										<h2 className="p-10 border rounded-lg bg-green-50 text-sm text-green-900">
											<strong>Correct Answer:</strong>
											{item.correctAns}
										</h2>
										<h2 className="p-10 border rounded-lg bg-blue-50 text-sm text-blue-900">
											<strong>Feedback:</strong>
											{item.feedback}
										</h2>
									</div>
								</CollapsibleContent>
							</Collapsible>
						))}
				</>
			)}

			{/* <Link> */}

			<div className="my-6">
				<Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
			</div>
			{/* </Link> */}
		</div>
	);
};

export default Feedback;
