// import { useRouter } from 'next/router';
'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 flex flex-col justify-center items-center text-white">
      <header className="w-full p-5">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">MockInterviewAI</div>
          <button 
            onClick={handleSignIn} 
            className="px-6 py-2 bg-white text-indigo-500 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
          >
            Sign In
          </button>
        </nav>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center text-center">
        <h1 className="text-6xl font-bold mb-5">Ace Your Interviews with AI</h1>
        <p className="text-xl mb-10">Get personalized interview practice and feedback.</p>
        <button 
          onClick={handleSignIn} 
          className="px-10 py-4 bg-white text-indigo-500 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
        >
          Get Started
        </button>
      </main>

      <footer className="w-full p-5 text-center">
        &copy; {new Date().getFullYear()} MockInterviewAI. All rights reserved.
      </footer>
    </div>
  );
}
