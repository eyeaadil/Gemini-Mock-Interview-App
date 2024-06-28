"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModel";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [jobExperience, setJobExperience] = useState("");
    const [loading, setLoading] = useState(false);
	const [jsonResponse,setJsonResponse] = useState([])
	const router = useRouter();

	// get user detail
	const{user} = useUser();

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        // console.log(jobPosition, jobDesc, jobExperience);
        const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, years of experience: ${jobExperience}, Depends on this information please give me 5 interview Question with Answered in json format. Give Question And answered as field in json.`;
        
            const result = await chatSession.sendMessage(inputPrompt);
            const MockjsonRes = result.response.text().replace('```json', '').replace('```', '');
            // console.log("Question And Answer",JSON.parse(MockjsonRes));
			setJsonResponse(MockjsonRes);

            // save it into db

            if(MockjsonRes){
            const resp = await db.insert(MockInterview).values({
                mockId:uuidv4(),
                jsonMockResp:MockjsonRes,
                jobPosition:jobPosition,
                jobDesc:jobDesc,
                jobExperience:jobExperience,
                createdBy:user?.primaryEmailAddress?.emailAddress,
                createdAt:moment().format('DD-MM-YYYY')
            }).returning({mockId:MockInterview.mockId})

            // console.log("InsertedId",resp)
            if(resp){
                setOpenDialog(false)
                router.push('/dashboard/interview/'+resp[0]?.mockId)
            }
        }else{
            console.log("Data is not stored in Db")
        }
            setLoading(false)
			// now store this data into some state

			// if(MockjsonRes){


                // if(resp){
                //     setOpenDialog(false);
                //     router.push('/dashboard/interview/'+resp[0]?.mockId)
                // }

			// }else{
			// 	console.log("Data is not stored in db")
			// }

			
         
    };

    return (
        <div>
            <div
                className="p-10 w-80 border rounded-lg bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="font-bold text-lg text-center">+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Tell us more about your job Interview
                        </DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>
                                        Add Details about your job Position/Role, job Description and
                                        years of Experience
                                    </h2>
                                    <div className="mt-7 my-2">
                                        <label className="mb-5">Job Role / Job Position</label>
                                        <Input
                                            placeholder="Ex. Full Stack Developer"
                                            required
                                            value={jobPosition}
                                            onChange={(event) => setJobPosition(event.target.value)}
                                        />
                                    </div>
                                    <div className="my-3">
                                        <label className="mb-5">Job Description / Tech-Stack (In Short)</label>
                                        <Textarea
                                            placeholder="Ex. React, Angular, NodeJs, MySql etc..."
                                            value={jobDesc}
                                            onChange={(e) => setJobDesc(e.target.value)}
                                        />
                                    </div>
                                    <div className="my-2">
                                        <label className="mb-5">Years of Experience</label>
                                        <Input
                                            placeholder="Ex. 5"
                                            type="number"
                                            max="60"
                                            value={jobExperience}
                                            onChange={(e) => setJobExperience(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-5 justify-end mt-4">
                                    <Button type="button" onClick={() => setOpenDialog(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <LoaderCircle className="animate-spin" />
                                                Generating from AI
                                            </>
                                        ) : (
                                            'Start Interview'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddNewInterview;
