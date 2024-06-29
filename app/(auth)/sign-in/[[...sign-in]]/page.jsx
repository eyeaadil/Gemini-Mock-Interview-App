'use client'
import { SignIn } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";

export default function SignInPage() {
//   const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-300 flex items-center justify-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-40 p-6">
        <div className="md:w-1/2 flex flex-col items-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Sign In to MockInterviewAI</h1>
          <img 
            src="/signin-pic.png" 
            alt="Sign In Illustration" 
            className="w-3/4 md:w-[20rem] rounded-full shadow-lg mb-6"
          />
          <p className="text-lg md:text-2xl lg:text-3xl mb-6 text-center">
            Access your personalized interview practice with AI.
          </p>
          <p className="text-sm md:text-md lg:text-lg mb-4 text-center text-gray-200">
            Sign in to get started and prepare for your next job interview. Gain valuable insights and feedback to ace your interviews!
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-start">
          {/* <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"> */}
            <SignIn redirectUrl="/dashboard" />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}