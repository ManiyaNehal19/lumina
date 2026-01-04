"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import star from '@/app/assests/c56b33cc-c856-4040-b003-c080d2183a97_removalai_preview.png'
import axios from 'axios'
import { UserData } from '..'
import { useRouter } from 'next/navigation'

const AInput = ({userId}:{userId:UserData})  => {
    const router = useRouter();
    const [topic, setTopic] = useState("");
    const [no_of_card, set_no_of_card] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    
    const generateResponse = async (e: React.FormEvent) => {
        e.preventDefault(); 
        
        if (!topic.trim()) {
            alert("Please enter a topic");
            return;
        }
        
        setIsLoading(true);
        
        try {
            const response = await axios.post("/api/generate", { topic, no_of_card });
            
            const submit = await axios.post("/api/flashcard", {
                content: response.data.data, 
                userId: userId, 
                topic: topic
            });
            
            console.log(submit.data.id_flash);
            console.log("🔵 FRONTEND: Got response:", response.data.data);
            router.push(`/flashcards/${submit.data.id_flash}`);

        } catch(error) {
            console.error("🔴 FRONTEND: Error:", error);
            alert("Failed to generate flashcards. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div className='w-full flex flex-col items-center rounded-lg justify-center'>
            <div className='flex justify-center items-center flex-col'>
                <p className='text-white text-sm flex justify-center items-center'>
                    <Image src={star} alt='star' height={40} width={40}/> 
                    AI Powered Learning
                </p>
                <h1 className='text-white text-7xl font-bold m-2 text-center'>
                    Welcome To <span className='text-[#4ade80]'>Lumina</span>
                </h1>
                <p className='text-gray-400 max-w-xl text-center mt-2'>
                    Generate intelligent flashcards from any topic and master your knowledge with spaced repetition.
                </p>
            </div>

            <div className='flex justify-center items-center mt-10 w-full'>
                <form 
                    className='w-full flex justify-center items-center gap-2 flex-wrap' 
                    onSubmit={generateResponse}
                >
                    <input 
                        type="text" 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder='Enter a topic to generate flashcards....' 
                        className='bg-[#15122D] p-5 w-3/5  rounded-full text-white outline-none border border-transparent focus:border-[#4ade80] transition-all'
                        disabled={isLoading}
                    />
                    
                    <select 
                        name="items" 
                        id="items" 
                        value={no_of_card} 
                        onChange={(e) => set_no_of_card(Number(e.target.value))}
                        className='bg-[#15122D] text-white p-5 rounded-full outline-none border border-transparent focus:border-[#4ade80] transition-all cursor-pointer hover:bg-[#1a1640] '
                        disabled={isLoading}
                    >
                        <option value={10}>10 Cards</option>
                        <option value={20}>20 Cards</option>
                        <option value={30}>30 Cards</option>
                    </select>
                    
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className='bg-[#4ade80] text-[#15122D] font-bold rounded-full px-8 py-5 hover:bg-[#3bc771] hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#4ade80]'
                    >
                        {isLoading ? 'Creating...' : 'Create'}
                    </button>
                </form>
            </div>
            
            <p className='text-gray-500 max-w-xl text-center mt-2'>
                Powered by AI &bull; Generate unlimited flashcards
            </p>
        </div>
    )
}

export default AInput