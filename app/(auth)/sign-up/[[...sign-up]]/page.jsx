import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-300 flex items-center justify-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-40 p-6">
        <div className="md:w-1/2 flex flex-col items-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Welcome to MockInterviewAI</h1>
          <img 
            src="/signup-image.png" 
            alt="Sign Up Illustration" 
            className="w-3/4 md:w-[20rem] rounded-full shadow-lg mb-6"
          />
          <p className="text-lg md:text-2xl lg:text-3xl mb-6 text-center">
            Join us to practice your interview skills with the power of AI.
          </p>
          <p className="text-sm md:text-md lg:text-lg mb-4 text-center text-gray-300">
            Get real-time feedback and improve your chances of landing your dream job. Sign up today and take the first step towards your successful career!
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-start">
          {/* <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"> */}
            <SignUp signInForceRedirectUrl="/dashboard" />
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}