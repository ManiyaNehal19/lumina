"use client"
import React, { useState } from 'react'

import Image from 'next/image'
import star from '@/app/assests/c56b33cc-c856-4040-b003-c080d2183a97_removalai_preview.png'
import axios from 'axios'
import { UserData } from '..'

const AInput = ({userId}:{userId:UserData})  => {
    const [topic,settopic] = useState("");
    const generateResponse = async (e: React.FormEvent) => {
    e.preventDefault(); 
    try {
      const response = await axios.post("/api/generate", { topic });
      
      const submit =  await axios.post("/api/flashcard", {content: response.data.data, userId:userId})
      console.log(submit.data.id_flash);
      
      console.log("🔵 FRONTEND: Got response:", response.data.data);
    } catch(error) {
      console.error("🔴 FRONTEND: Error:", error);
    }
}
  return (
    <div className='w-full flex flex-col items-center justify-center'>
        <div className='flex justify-center items-center flex-col'>
            <p className='rounded-lg bg-black p-1 text-white text-sm flex justify-center items-center'><Image src={star} alt='star' height={40} width={40}/> AI Powered Learning</p>
            <h1 className='text-white text-7xl font-bold m-2 text-center'>
              Welcome To <span className='text-[#4ade80]'> Lumina</span>
            </h1>
            <p className='text-gray-400 max-w-xl text-center mt-2'>
              Generate intelligent flashcards from any topic and master your knowledge with spaced repetition.
            </p>
        </div>

        <div className='flex justify-center items-center mt-10 w-full'>
            <form action="" className='w-full flex justify-center items-center gap-2' onSubmit={generateResponse}>
                <input 
                  type="text" 
                  onChange={(e)=>settopic(e.target.value)}
                  placeholder='Enter a topic to generate flashcards....' 
                  className='bg-[#15122D] p-5 w-3/5 rounded-full text-white outline-none border border-transparent focus:border-[#4ade80] transition-all'
                />
                <button 
                  type="submit" 
                  
                  className='bg-[#4ade80] text-[#15122D] font-bold rounded-full px-8 py-5 hover:bg-[#3bc771] hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all duration-300 active:scale-95'
                >
                  Create
                </button>
            </form>
        </div>
    </div>
  )
}

export default AInput